/**
 * Response Validator
 *
 * Uses ajv (JSON Schema validator) to validate API responses against OpenAPI schemas.
 * This is the "wrapper around existing tools" approach - ajv is battle-tested.
 */

import AjvModule, { type ErrorObject } from 'ajv';
import addFormatsModule from 'ajv-formats';
import type { CheckResult, SchemaSpec } from './types.js';

// ajv and ajv-formats ship CommonJS. Under NodeNext module resolution the
// default import resolves to the module namespace, so reach for `.default`
// to get the real constructor / plugin function.
const Ajv = AjvModule.default;
const addFormats = addFormatsModule.default;

// Create ajv instance with OpenAPI-compatible settings
const ajv = new Ajv({
  allErrors: true,
  strict: false,
  validateFormats: true,
});

addFormats(ajv);

// Add OpenAPI-specific formats
ajv.addFormat('int32', {
  type: 'number',
  validate: (x: number) => Number.isInteger(x) && x >= -2147483648 && x <= 2147483647,
});
ajv.addFormat('int64', {
  type: 'number',
  validate: (x: number) => Number.isInteger(x),
});
ajv.addFormat('float', { type: 'number', validate: () => true });
ajv.addFormat('double', { type: 'number', validate: () => true });
ajv.addFormat('decimal', { type: 'number', validate: () => true });

/**
 * Validate a response body against a JSON Schema
 *
 * `components` is the OpenAPI `components` object. When provided it is attached
 * to the schema root so internal `#/components/schemas/...` `$ref`s resolve.
 */
export function validateResponse(
  body: unknown,
  schema: SchemaSpec,
  statusCode: number,
  components?: Record<string, unknown>
): CheckResult[] {
  const checks: CheckResult[] = [];

  // Check if we have a schema to validate against
  if (!schema || Object.keys(schema).length === 0) {
    checks.push({
      name: 'Schema exists',
      passed: true,
      message: `No schema defined for ${statusCode}, skipping body validation`,
    });
    return checks;
  }

  // Attach components so `#/components/schemas/...` $refs resolve via JSON pointer
  const rootSchema = components ? { ...schema, components } : schema;

  // Compile and validate
  try {
    const validate = ajv.compile(rootSchema);
    const valid = validate(body);

    if (valid) {
      checks.push({
        name: 'Schema validation',
        passed: true,
        message: 'Response body matches schema',
      });
    } else {
      // Convert ajv errors to CheckResults
      for (const error of validate.errors || []) {
        checks.push({
          name: 'Schema validation',
          passed: false,
          message: formatAjvError(error),
          path: error.instancePath || '/',
          expected: error.params,
          actual: getValueAtPath(body, error.instancePath),
        });
      }
    }
  } catch (err) {
    checks.push({
      name: 'Schema compilation',
      passed: false,
      message: `Failed to compile schema: ${(err as Error).message}`,
    });
  }

  return checks;
}

/**
 * Validate that a status code matches expected
 */
export function validateStatusCode(
  actual: number,
  expected: number[],
  hasDefaultResponse: boolean
): CheckResult {
  const passed = expected.includes(actual) || (hasDefaultResponse && !expected.includes(actual));

  if (passed) {
    return {
      name: 'Status code',
      passed: true,
      message: `Received expected status ${actual}`,
    };
  }

  return {
    name: 'Status code',
    passed: false,
    message: `Unexpected status code`,
    expected: expected.join(' or '),
    actual,
  };
}

/**
 * Validate required fields are present
 */
export function validateRequiredFields(body: unknown, schema: SchemaSpec): CheckResult[] {
  const checks: CheckResult[] = [];

  if (typeof body !== 'object' || body === null) {
    return checks;
  }

  const required = schema.required as string[] | undefined;
  if (!required || !Array.isArray(required)) {
    return checks;
  }

  const bodyObj = body as Record<string, unknown>;
  const missingFields = required.filter((field) => !(field in bodyObj));

  if (missingFields.length === 0) {
    checks.push({
      name: 'Required fields',
      passed: true,
      message: 'All required fields present',
    });
  } else {
    for (const field of missingFields) {
      checks.push({
        name: 'Required field',
        passed: false,
        message: `Missing required field: ${field}`,
        path: `/${field}`,
        expected: 'present',
        actual: 'missing',
      });
    }
  }

  return checks;
}

/**
 * Format an ajv error into a human-readable message
 */
function formatAjvError(error: ErrorObject): string {
  const path = error.instancePath || 'root';
  const params = error.params as Record<string, unknown>;

  switch (error.keyword) {
    case 'type':
      return `${path}: ${error.message} (expected ${params.type})`;
    case 'required':
      return `${path}: missing required property '${params.missingProperty}'`;
    case 'enum':
      return `${path}: must be one of ${JSON.stringify(params.allowedValues)}`;
    case 'minimum':
      return `${path}: must be >= ${params.limit}`;
    case 'maximum':
      return `${path}: must be <= ${params.limit}`;
    case 'minLength':
      return `${path}: must be at least ${params.limit} characters`;
    case 'maxLength':
      return `${path}: must be at most ${params.limit} characters`;
    case 'pattern':
      return `${path}: must match pattern ${params.pattern}`;
    case 'format':
      return `${path}: must be a valid ${params.format}`;
    case 'additionalProperties':
      return `${path}: unexpected property '${params.additionalProperty}'`;
    default:
      return `${path}: ${error.message || error.keyword}`;
  }
}

/**
 * Get a value from an object using a JSON Pointer path
 */
function getValueAtPath(obj: unknown, path: string): unknown {
  if (!path || path === '/') return obj;

  const parts = path.split('/').filter(Boolean);
  let current: unknown = obj;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}
