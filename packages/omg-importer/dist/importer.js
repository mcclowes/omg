/**
 * OpenAPI to OMG Importer
 *
 * Converts OpenAPI 3.x specifications to OMG document structure.
 */
import { isReferenceObject } from './types.js';
import { convertSchema, createConversionContext, } from './schema-converter.js';
/**
 * Import an OpenAPI specification to OMG format
 */
export function importOpenApi(spec, options = {}) {
    const warnings = [];
    const ctx = createConversionContext(spec.components?.schemas || {}, {
        inlineRefs: options.inlineRefs ?? false,
    });
    // Create root API document
    const api = createApiDocument(spec, options);
    // Convert endpoints
    const endpoints = convertEndpoints(spec, ctx, warnings, options);
    // Convert named types
    const types = convertNamedTypes(spec, ctx, options);
    return {
        api,
        endpoints,
        types,
        warnings,
    };
}
/**
 * Create the root API document
 */
function createApiDocument(spec, options) {
    const frontMatter = {
        name: spec.info.title,
        version: spec.info.version,
    };
    // Add base URL from servers
    if (spec.servers && spec.servers.length > 0) {
        frontMatter.baseUrl = spec.servers[0].url;
    }
    // Add contact info
    if (spec.info.contact) {
        frontMatter.contact = {
            name: spec.info.contact.name,
            email: spec.info.contact.email,
            url: spec.info.contact.url,
        };
    }
    const baseDir = options.baseDir || '.';
    return {
        filePath: `${baseDir}/api.omg.md`,
        frontMatter,
        title: spec.info.title,
        description: spec.info.description || '',
        blocks: [],
        partials: [],
    };
}
/**
 * Convert all endpoints from OpenAPI paths
 */
function convertEndpoints(spec, ctx, warnings, options) {
    const endpoints = [];
    const paths = spec.paths || {};
    for (const [path, pathItem] of Object.entries(paths)) {
        if (!pathItem)
            continue;
        // Handle path-level parameters
        const pathParams = resolveParameters(pathItem.parameters || [], spec, warnings);
        // Process each HTTP method
        const methods = [];
        if (pathItem.get)
            methods.push({ method: 'GET', operation: pathItem.get });
        if (pathItem.post)
            methods.push({ method: 'POST', operation: pathItem.post });
        if (pathItem.put)
            methods.push({ method: 'PUT', operation: pathItem.put });
        if (pathItem.patch)
            methods.push({ method: 'PATCH', operation: pathItem.patch });
        if (pathItem.delete)
            methods.push({ method: 'DELETE', operation: pathItem.delete });
        if (pathItem.head)
            methods.push({ method: 'HEAD', operation: pathItem.head });
        if (pathItem.options)
            methods.push({ method: 'OPTIONS', operation: pathItem.options });
        for (const { method, operation } of methods) {
            const doc = convertOperation(path, method, operation, pathParams, spec, ctx, warnings, options);
            endpoints.push(doc);
        }
    }
    return endpoints;
}
/**
 * Resolve parameter references
 */
function resolveParameters(params, spec, warnings) {
    return params
        .map((param) => {
        if (isReferenceObject(param)) {
            const resolved = resolveParameterRef(param.$ref, spec);
            if (!resolved) {
                warnings.push({
                    message: `Could not resolve parameter reference: ${param.$ref}`,
                });
                return null;
            }
            return resolved;
        }
        return param;
    })
        .filter((p) => p !== null);
}
/**
 * Resolve a parameter reference
 */
function resolveParameterRef(ref, spec) {
    const match = ref.match(/^#\/components\/parameters\/(.+)$/);
    if (!match)
        return null;
    const name = match[1];
    const param = spec.components?.parameters?.[name];
    if (!param)
        return null;
    if (isReferenceObject(param)) {
        // Recursive resolution not supported for simplicity
        return null;
    }
    return param;
}
/**
 * Convert a single operation to an OmgDocument
 */
function convertOperation(path, method, operation, pathLevelParams, spec, ctx, warnings, options) {
    // Generate operationId if not present
    const operationId = operation.operationId || generateOperationId(method, path);
    const baseDir = options.baseDir || '.';
    // Build front matter
    const frontMatter = {
        method,
        path,
        operationId,
    };
    if (operation.tags && operation.tags.length > 0) {
        frontMatter.tags = operation.tags;
    }
    if (operation.deprecated) {
        frontMatter.deprecated = true;
    }
    if (operation.summary) {
        frontMatter.summary = operation.summary;
    }
    // Handle x-follows extension
    if (operation['x-follows'] && operation['x-follows'].length > 0) {
        frontMatter.follows = operation['x-follows'];
    }
    // Handle webhooks extensions
    if (operation['x-webhooks-resulting'] || operation['x-webhooks-listen']) {
        frontMatter.webhooks = {};
        if (operation['x-webhooks-resulting']) {
            frontMatter.webhooks.resulting = operation['x-webhooks-resulting'];
        }
        if (operation['x-webhooks-listen']) {
            frontMatter.webhooks.listen = operation['x-webhooks-listen'];
        }
    }
    // Collect blocks
    const blocks = [];
    // Merge path-level and operation-level parameters
    const allParams = [
        ...pathLevelParams,
        ...resolveParameters(operation.parameters || [], spec, warnings),
    ];
    // Separate parameters by location
    const pathParams = allParams.filter((p) => p.in === 'path');
    const queryParams = allParams.filter((p) => p.in === 'query');
    const headerParams = allParams.filter((p) => p.in === 'header');
    // Convert path parameters
    if (pathParams.length > 0) {
        const schema = parametersToSchema(pathParams, ctx);
        blocks.push({
            type: 'omg.path',
            content: '', // Will be generated
            parsed: schema,
            line: 0,
        });
    }
    // Convert query parameters
    if (queryParams.length > 0) {
        const schema = parametersToSchema(queryParams, ctx);
        blocks.push({
            type: 'omg.query',
            content: '',
            parsed: schema,
            line: 0,
        });
    }
    // Convert header parameters
    if (headerParams.length > 0) {
        const schema = parametersToSchema(headerParams, ctx);
        blocks.push({
            type: 'omg.headers',
            content: '',
            parsed: schema,
            line: 0,
        });
    }
    // Convert request body
    if (operation.requestBody) {
        const bodySchema = convertRequestBody(operation.requestBody, spec, ctx, warnings);
        if (bodySchema) {
            blocks.push({
                type: 'omg.body',
                content: '',
                parsed: bodySchema,
                line: 0,
            });
        }
    }
    // Convert responses
    if (operation.responses) {
        for (const [statusCode, response] of Object.entries(operation.responses)) {
            const responseSchema = convertResponse(response, spec, ctx, warnings);
            const code = parseInt(statusCode, 10);
            if (!isNaN(code)) {
                const blockType = code === 200 ? 'omg.response' : 'omg.response';
                blocks.push({
                    type: blockType,
                    statusCode: code === 200 ? undefined : code,
                    content: '',
                    parsed: responseSchema || undefined,
                    line: 0,
                });
            }
        }
    }
    // Build file path
    const safePath = path.replace(/[{}]/g, '').replace(/\//g, '-').replace(/^-/, '');
    const fileName = `${method.toLowerCase()}${safePath || '-root'}.omg.md`;
    return {
        filePath: `${baseDir}/endpoints/${fileName}`,
        frontMatter,
        title: operation.summary || `${method} ${path}`,
        description: operation.description || '',
        blocks,
        partials: [],
    };
}
/**
 * Convert parameters to an object schema
 */
function parametersToSchema(params, ctx) {
    const properties = {};
    for (const param of params) {
        let paramSchema;
        if (param.schema) {
            paramSchema = convertSchema(param.schema, ctx);
        }
        else {
            // Default to string if no schema
            paramSchema = {
                kind: 'primitive',
                type: 'string',
                annotations: [],
            };
        }
        // Mark as optional if not required
        if (!param.required) {
            paramSchema.optional = true;
        }
        // Add description
        if (param.description) {
            paramSchema.description = param.description;
        }
        properties[param.name] = paramSchema;
    }
    return {
        kind: 'object',
        properties,
        annotations: [],
    };
}
/**
 * Convert request body to schema
 */
function convertRequestBody(body, spec, ctx, warnings) {
    // Resolve reference if needed
    if (isReferenceObject(body)) {
        const resolved = resolveRequestBodyRef(body.$ref, spec);
        if (!resolved) {
            warnings.push({
                message: `Could not resolve request body reference: ${body.$ref}`,
            });
            return null;
        }
        body = resolved;
    }
    // Get JSON content schema
    const jsonContent = body.content['application/json'];
    if (!jsonContent?.schema) {
        // Try other content types
        const anyContent = Object.values(body.content)[0];
        if (!anyContent?.schema) {
            return null;
        }
        return convertSchema(anyContent.schema, ctx);
    }
    return convertSchema(jsonContent.schema, ctx);
}
/**
 * Resolve request body reference
 */
function resolveRequestBodyRef(ref, spec) {
    const match = ref.match(/^#\/components\/requestBodies\/(.+)$/);
    if (!match)
        return null;
    const name = match[1];
    const body = spec.components?.requestBodies?.[name];
    if (!body)
        return null;
    if (isReferenceObject(body))
        return null;
    return body;
}
/**
 * Convert response to schema
 */
function convertResponse(response, spec, ctx, warnings) {
    // Resolve reference if needed
    if (isReferenceObject(response)) {
        const resolved = resolveResponseRef(response.$ref, spec);
        if (!resolved) {
            warnings.push({
                message: `Could not resolve response reference: ${response.$ref}`,
            });
            return null;
        }
        response = resolved;
    }
    // No content (e.g., 204 No Content)
    if (!response.content) {
        return null;
    }
    // Get JSON content schema
    const jsonContent = response.content['application/json'];
    if (!jsonContent?.schema) {
        // Try other content types
        const anyContent = Object.values(response.content)[0];
        if (!anyContent?.schema) {
            return null;
        }
        return convertSchema(anyContent.schema, ctx);
    }
    return convertSchema(jsonContent.schema, ctx);
}
/**
 * Resolve response reference
 */
function resolveResponseRef(ref, spec) {
    const match = ref.match(/^#\/components\/responses\/(.+)$/);
    if (!match)
        return null;
    const name = match[1];
    const response = spec.components?.responses?.[name];
    if (!response)
        return null;
    if (isReferenceObject(response))
        return null;
    return response;
}
/**
 * Convert named types from components/schemas
 */
function convertNamedTypes(spec, ctx, options) {
    const types = new Map();
    const schemas = spec.components?.schemas || {};
    const baseDir = options.baseDir || '.';
    for (const [name, schemaOrRef] of Object.entries(schemas)) {
        // Skip references (they point to other schemas)
        if (isReferenceObject(schemaOrRef))
            continue;
        const schema = convertSchema(schemaOrRef, ctx);
        // Create a document for this type
        const doc = {
            filePath: `${baseDir}/types/${toKebabCase(name)}.omg.md`,
            frontMatter: null,
            title: name,
            description: schemaOrRef.description || '',
            blocks: [
                {
                    type: 'omg.type',
                    content: '', // Will be generated
                    parsed: schema,
                    line: 0,
                },
            ],
            partials: [],
        };
        types.set(name, { schema, document: doc });
    }
    return types;
}
/**
 * Generate an operation ID from method and path
 */
function generateOperationId(method, path) {
    // Convert path to kebab-case
    const pathPart = path
        .replace(/\{([^}]+)\}/g, 'by-$1') // {id} -> by-id
        .replace(/\//g, '-')
        .replace(/^-/, '')
        .replace(/-$/, '')
        .toLowerCase();
    return `${method.toLowerCase()}-${pathPart || 'root'}`;
}
/**
 * Convert a string to kebab-case
 */
function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}
//# sourceMappingURL=importer.js.map