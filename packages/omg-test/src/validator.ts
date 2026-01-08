/**
 * Response Validator
 *
 * Validates API responses against OMG/OpenAPI schemas using ajv
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { OmgSchema, OmgType, OmgAnnotation, ParsedApi } from 'omg-parser';
import type { ValidationResult, ValidationError } from './types.js';

// Type for ajv error objects
interface AjvErrorObject {
  keyword: string;
  instancePath: string;
  schemaPath: string;
  params: Record<string, unknown>;
  message?: string;
  data?: unknown;
}

/**
 * Create a validator for an API specification
 */
export function createValidator(api: ParsedApi) {
  // Create ajv instance with OpenAPI 3.1 compatible settings
  const AjvClass = Ajv.default || Ajv;
  const ajv = new AjvClass({
    allErrors: true,
    strict: false,
    validateFormats: true,
    coerceTypes: false,
  });

  // Add standard formats (date, date-time, email, uri, etc.)
  const addFormatsFunc = addFormats.default || addFormats;
  addFormatsFunc(ajv);

  // Add custom formats
  ajv.addFormat('uuid', {
    type: 'string',
    validate: (x: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x),
  });

  ajv.addFormat('decimal', {
    type: 'number',
    validate: () => true, // Any number is valid for decimal
  });

  // Pre-compile schemas for all types in the API
  const typeSchemas = new Map<string, ReturnType<typeof ajv.compile>>();

  for (const [name, schema] of Object.entries(api.types)) {
    const jsonSchema = omgSchemaToJsonSchema(schema, api.types);
    try {
      typeSchemas.set(name, ajv.compile(jsonSchema));
    } catch (error) {
      // Schema compilation error - will be caught at validation time
      console.warn(`Warning: Failed to compile schema for type "${name}": ${error}`);
    }
  }

  return {
    /**
     * Validate a response body against a schema
     */
    validate(body: unknown, schema: OmgSchema | null): ValidationResult {
      if (!schema) {
        // No schema to validate against - any response is valid
        return { valid: true, errors: [] };
      }

      const jsonSchema = omgSchemaToJsonSchema(schema, api.types);

      try {
        const validate = ajv.compile(jsonSchema);
        const valid = validate(body);

        if (valid) {
          return { valid: true, errors: [] };
        }

        return {
          valid: false,
          errors: convertAjvErrors(validate.errors || []),
        };
      } catch (error) {
        return {
          valid: false,
          errors: [
            {
              path: '',
              message: `Schema compilation error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },

    /**
     * Validate response status code
     */
    validateStatusCode(actual: number, expected: number[]): ValidationResult {
      if (expected.includes(actual)) {
        return { valid: true, errors: [] };
      }

      // Check for wildcards (e.g., 2xx matching 200-299)
      for (const exp of expected) {
        if (exp >= 200 && exp < 300 && actual >= 200 && actual < 300) {
          return { valid: true, errors: [] };
        }
      }

      return {
        valid: false,
        errors: [
          {
            path: 'statusCode',
            message: `Expected status code to be one of [${expected.join(', ')}], got ${actual}`,
            expected,
            actual,
          },
        ],
      };
    },

    /**
     * Get the compiled schema for a named type
     */
    getTypeSchema(name: string) {
      return typeSchemas.get(name);
    },
  };
}

/**
 * Convert OMG schema to JSON Schema for ajv
 */
function omgSchemaToJsonSchema(
  schema: OmgSchema,
  types: Record<string, OmgSchema>
): Record<string, unknown> {
  return convertType(schema, types);
}

/**
 * Convert an OMG type to JSON Schema
 */
function convertType(type: OmgType, types: Record<string, OmgSchema>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  // Handle nullable
  if (type.nullable) {
    result.nullable = true;
  }

  // Handle description
  if (type.description) {
    result.description = type.description;
  }

  // Apply annotations
  if (type.annotations) {
    applyAnnotations(result, type.annotations);
  }

  switch (type.kind) {
    case 'primitive':
      return convertPrimitive(type, result);

    case 'object':
      return convertObject(type, types, result);

    case 'array':
      return convertArray(type, types, result);

    case 'enum':
      return convertEnum(type, result);

    case 'union':
      return convertUnion(type, types, result);

    case 'intersection':
      return convertIntersection(type, types, result);

    case 'reference':
      return convertReference(type, types, result);

    default:
      return result;
  }
}

/**
 * Convert primitive type to JSON Schema
 */
function convertPrimitive(
  type: OmgType & { kind: 'primitive' },
  result: Record<string, unknown>
): Record<string, unknown> {
  switch (type.type) {
    case 'string':
      result.type = 'string';
      break;
    case 'number':
      result.type = 'number';
      break;
    case 'integer':
      result.type = 'integer';
      break;
    case 'boolean':
      result.type = 'boolean';
      break;
    case 'decimal':
      result.type = 'number';
      result.format = 'decimal';
      break;
    case 'date':
      result.type = 'string';
      result.format = 'date';
      break;
    case 'datetime':
      result.type = 'string';
      result.format = 'date-time';
      break;
    case 'uuid':
      result.type = 'string';
      result.format = 'uuid';
      break;
    case 'any':
      // No type constraint - any value is valid
      break;
  }

  return result;
}

/**
 * Convert object type to JSON Schema
 */
function convertObject(
  type: OmgType & { kind: 'object' },
  types: Record<string, OmgSchema>,
  result: Record<string, unknown>
): Record<string, unknown> {
  result.type = 'object';
  result.properties = {};

  const required: string[] = [];

  for (const [name, propType] of Object.entries(type.properties)) {
    (result.properties as Record<string, unknown>)[name] = convertType(propType, types);

    if (!propType.optional) {
      required.push(name);
    }
  }

  if (required.length > 0) {
    result.required = required;
  }

  // Allow additional properties by default (OpenAPI 3.1 behavior)
  result.additionalProperties = true;

  return result;
}

/**
 * Convert array type to JSON Schema
 */
function convertArray(
  type: OmgType & { kind: 'array' },
  types: Record<string, OmgSchema>,
  result: Record<string, unknown>
): Record<string, unknown> {
  result.type = 'array';
  result.items = convertType(type.items, types);
  return result;
}

/**
 * Convert enum type to JSON Schema
 */
function convertEnum(
  type: OmgType & { kind: 'enum' },
  result: Record<string, unknown>
): Record<string, unknown> {
  const firstValue = type.values[0];
  if (typeof firstValue === 'string') {
    result.type = 'string';
  } else if (typeof firstValue === 'number') {
    result.type = Number.isInteger(firstValue) ? 'integer' : 'number';
  } else if (typeof firstValue === 'boolean') {
    result.type = 'boolean';
  }

  result.enum = type.values;
  return result;
}

/**
 * Convert union type to JSON Schema (oneOf)
 */
function convertUnion(
  type: OmgType & { kind: 'union' },
  types: Record<string, OmgSchema>,
  result: Record<string, unknown>
): Record<string, unknown> {
  result.oneOf = type.types.map((t) => convertType(t, types));
  return result;
}

/**
 * Convert intersection type to JSON Schema (allOf)
 */
function convertIntersection(
  type: OmgType & { kind: 'intersection' },
  types: Record<string, OmgSchema>,
  result: Record<string, unknown>
): Record<string, unknown> {
  result.allOf = type.types.map((t) => convertType(t, types));
  return result;
}

/**
 * Convert reference type to JSON Schema
 * Since we're validating inline, we resolve the reference
 */
function convertReference(
  type: OmgType & { kind: 'reference' },
  types: Record<string, OmgSchema>,
  result: Record<string, unknown>
): Record<string, unknown> {
  const referenced = types[type.name];
  if (referenced) {
    // Inline the referenced type
    return convertType(referenced, types);
  }

  // Unknown reference - allow any value
  return result;
}

/**
 * Apply OMG annotations to JSON Schema
 */
function applyAnnotations(schema: Record<string, unknown>, annotations: OmgAnnotation[]): void {
  for (const annotation of annotations) {
    switch (annotation.name) {
      case 'min':
        schema.minimum = annotation.args[0];
        break;
      case 'max':
        schema.maximum = annotation.args[0];
        break;
      case 'minLength':
        schema.minLength = annotation.args[0];
        break;
      case 'maxLength':
        schema.maxLength = annotation.args[0];
        break;
      case 'minItems':
        schema.minItems = annotation.args[0];
        break;
      case 'maxItems':
        schema.maxItems = annotation.args[0];
        break;
      case 'pattern':
        schema.pattern = annotation.args[0];
        break;
      case 'format':
        schema.format = annotation.args[0];
        break;
      case 'default':
        schema.default = annotation.args[0];
        break;
    }
  }
}

/**
 * Convert ajv errors to our ValidationError format
 */
function convertAjvErrors(errors: AjvErrorObject[]): ValidationError[] {
  return errors.map((error) => ({
    path: error.instancePath || '/',
    message: formatAjvError(error),
    keyword: error.keyword,
    expected: error.params,
    actual: error.data,
  }));
}

/**
 * Format an ajv error into a human-readable message
 */
function formatAjvError(error: AjvErrorObject): string {
  const path = error.instancePath || 'root';

  switch (error.keyword) {
    case 'type':
      return `${path}: Expected ${error.params.type}, got ${typeof error.data}`;

    case 'required':
      return `${path}: Missing required property "${error.params.missingProperty}"`;

    case 'additionalProperties':
      return `${path}: Unexpected property "${error.params.additionalProperty}"`;

    case 'enum':
      return `${path}: Value must be one of [${(error.params.allowedValues as unknown[]).join(', ')}]`;

    case 'minimum':
      return `${path}: Value must be >= ${error.params.limit}`;

    case 'maximum':
      return `${path}: Value must be <= ${error.params.limit}`;

    case 'minLength':
      return `${path}: String must be at least ${error.params.limit} characters`;

    case 'maxLength':
      return `${path}: String must be at most ${error.params.limit} characters`;

    case 'minItems':
      return `${path}: Array must have at least ${error.params.limit} items`;

    case 'maxItems':
      return `${path}: Array must have at most ${error.params.limit} items`;

    case 'pattern':
      return `${path}: String does not match pattern "${error.params.pattern}"`;

    case 'format':
      return `${path}: Invalid format, expected ${error.params.format}`;

    case 'oneOf':
      return `${path}: Value does not match any of the expected schemas`;

    case 'allOf':
      return `${path}: Value does not match all required schemas`;

    default:
      return `${path}: ${error.message || 'Validation failed'}`;
  }
}
