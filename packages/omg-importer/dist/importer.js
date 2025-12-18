"use strict";
/**
 * OpenAPI to OMG Importer
 *
 * Converts OpenAPI 3.x specifications to OMG format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.importOpenApi = importOpenApi;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("yaml"));
const schema_converter_js_1 = require("./schema-converter.js");
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
/**
 * Import an OpenAPI spec and generate OMG files
 */
function importOpenApi(specPath, options) {
    const result = {
        apiFile: '',
        endpointFiles: [],
        partialFiles: [],
        warnings: [],
    };
    // Read and parse the OpenAPI spec
    const specContent = fs.readFileSync(specPath, 'utf-8');
    const spec = parseSpec(specContent, specPath);
    // Validate it's OpenAPI 3.x
    if (!spec.openapi || !spec.openapi.startsWith('3.')) {
        throw new Error(`Unsupported OpenAPI version: ${spec.openapi}. Only OpenAPI 3.x is supported.`);
    }
    // Create output directory structure
    const outputDir = path.resolve(options.outputDir);
    const endpointsDir = path.join(outputDir, 'endpoints');
    const partialsDir = path.join(outputDir, 'partials');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(endpointsDir, { recursive: true });
    if (options.generatePartials) {
        fs.mkdirSync(path.join(partialsDir, 'types'), { recursive: true });
        fs.mkdirSync(path.join(partialsDir, 'responses'), { recursive: true });
    }
    // Generate API root file
    result.apiFile = generateApiRoot(spec, outputDir);
    // Generate partials for components/schemas if requested
    if (options.generatePartials && spec.components?.schemas) {
        const partials = generateSchemaPartials(spec.components.schemas, partialsDir, options);
        result.partialFiles.push(...partials);
    }
    // Generate endpoint files
    if (spec.paths) {
        for (const [pathUrl, pathItem] of Object.entries(spec.paths)) {
            if (!pathItem)
                continue;
            // Get path-level parameters
            const pathParams = pathItem.parameters || [];
            for (const method of HTTP_METHODS) {
                const operation = pathItem[method];
                if (!operation)
                    continue;
                try {
                    const endpointFile = generateEndpoint(method.toUpperCase(), pathUrl, operation, pathParams, endpointsDir, spec, options);
                    result.endpointFiles.push(endpointFile);
                }
                catch (error) {
                    result.warnings.push(`Failed to generate ${method.toUpperCase()} ${pathUrl}: ${error.message}`);
                }
            }
        }
    }
    return result;
}
/**
 * Parse spec content (YAML or JSON)
 */
function parseSpec(content, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.json') {
        return JSON.parse(content);
    }
    return yaml.parse(content);
}
/**
 * Generate the API root file (api.omg.md)
 */
function generateApiRoot(spec, outputDir) {
    const lines = [];
    // Front matter
    lines.push('---');
    lines.push(`name: ${spec.info.title}`);
    lines.push(`version: ${spec.info.version}`);
    // Base URL from servers
    if (spec.servers && spec.servers.length > 0) {
        lines.push(`baseUrl: ${spec.servers[0].url}`);
    }
    // Contact info
    if (spec.info.contact) {
        lines.push('contact:');
        if (spec.info.contact.name) {
            lines.push(`  name: ${spec.info.contact.name}`);
        }
        if (spec.info.contact.email) {
            lines.push(`  email: ${spec.info.contact.email}`);
        }
        if (spec.info.contact.url) {
            lines.push(`  url: ${spec.info.contact.url}`);
        }
    }
    lines.push('---');
    lines.push('');
    // Title and description
    lines.push(`# ${spec.info.title}`);
    lines.push('');
    if (spec.info.description) {
        lines.push(spec.info.description);
        lines.push('');
    }
    // Tags section
    if (spec.tags && spec.tags.length > 0) {
        lines.push('## Tags');
        lines.push('');
        for (const tag of spec.tags) {
            lines.push(`- **${tag.name}**${tag.description ? ` - ${tag.description}` : ''}`);
        }
        lines.push('');
    }
    const filePath = path.join(outputDir, 'api.omg.md');
    fs.writeFileSync(filePath, lines.join('\n'));
    return filePath;
}
/**
 * Generate an endpoint file
 */
function generateEndpoint(method, pathUrl, operation, pathLevelParams, endpointsDir, spec, options) {
    const lines = [];
    // Generate operationId if not present
    const operationId = operation.operationId || generateOperationId(method, pathUrl);
    // Front matter
    lines.push('---');
    lines.push(`method: ${method}`);
    lines.push(`path: ${pathUrl}`);
    lines.push(`operationId: ${operationId}`);
    if (operation.tags && operation.tags.length > 0) {
        lines.push(`tags: [${operation.tags.join(', ')}]`);
    }
    if (operation.deprecated) {
        lines.push('deprecated: true');
    }
    lines.push('---');
    lines.push('');
    // Title
    const title = operation.summary || operationId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    lines.push(`# ${title}`);
    lines.push('');
    // Description
    if (operation.description) {
        lines.push(operation.description);
        lines.push('');
    }
    // Merge path-level and operation-level parameters
    const allParams = [...pathLevelParams, ...(operation.parameters || [])];
    // Resolve $ref parameters
    const resolvedParams = allParams.map((p) => resolveParameter(p, spec));
    // Group parameters by location
    const pathParams = resolvedParams.filter((p) => p.in === 'path');
    const queryParams = resolvedParams.filter((p) => p.in === 'query');
    const headerParams = resolvedParams.filter((p) => p.in === 'header');
    // Path parameters block
    if (pathParams.length > 0) {
        lines.push('```omg.path');
        lines.push((0, schema_converter_js_1.parametersToOmg)(pathParams, {
            components: spec.components,
            inlineRefs: options.inlineRefs,
        }));
        lines.push('```');
        lines.push('');
    }
    // Query parameters block
    if (queryParams.length > 0) {
        lines.push('```omg.query');
        lines.push((0, schema_converter_js_1.parametersToOmg)(queryParams, {
            components: spec.components,
            inlineRefs: options.inlineRefs,
        }));
        lines.push('```');
        lines.push('');
    }
    // Header parameters block
    if (headerParams.length > 0) {
        lines.push('```omg.headers');
        lines.push((0, schema_converter_js_1.parametersToOmg)(headerParams, {
            components: spec.components,
            inlineRefs: options.inlineRefs,
        }));
        lines.push('```');
        lines.push('');
    }
    // Request body
    if (operation.requestBody) {
        const bodySchema = getRequestBodySchema(operation.requestBody, spec);
        if (bodySchema) {
            lines.push('```omg.body');
            lines.push((0, schema_converter_js_1.schemaToOmg)(bodySchema, {
                components: spec.components,
                inlineRefs: options.inlineRefs,
            }));
            lines.push('```');
            lines.push('');
        }
    }
    // Responses
    if (operation.responses) {
        for (const [statusCode, response] of Object.entries(operation.responses)) {
            const resolvedResponse = resolveResponse(response, spec);
            const responseSchema = getResponseSchema(resolvedResponse);
            // Determine block type
            const blockType = statusCode === '200' || statusCode === 'default'
                ? 'omg.response'
                : `omg.response.${statusCode}`;
            if (responseSchema) {
                lines.push(`\`\`\`${blockType}`);
                lines.push((0, schema_converter_js_1.schemaToOmg)(responseSchema, {
                    components: spec.components,
                    inlineRefs: options.inlineRefs,
                }));
                lines.push('```');
            }
            else if (resolvedResponse.description && statusCode !== 'default') {
                // Empty response with just description
                lines.push(`\`\`\`${blockType}`);
                lines.push(`// ${resolvedResponse.description}`);
                lines.push('{}');
                lines.push('```');
            }
            lines.push('');
        }
    }
    // Generate example if available and requested
    if (options.includeExamples) {
        const example = extractExample(operation, spec);
        if (example) {
            lines.push('```omg.example');
            lines.push(JSON.stringify(example, null, 2));
            lines.push('```');
            lines.push('');
        }
    }
    // Write file
    const fileName = `${sanitizeFileName(operationId)}.omg.md`;
    const filePath = path.join(endpointsDir, fileName);
    fs.writeFileSync(filePath, lines.join('\n'));
    return filePath;
}
/**
 * Generate schema partials from components/schemas
 */
function generateSchemaPartials(schemas, partialsDir, options) {
    const files = [];
    for (const [name, schema] of Object.entries(schemas)) {
        const lines = [];
        lines.push(`# ${name}`);
        lines.push('');
        lines.push('```omg.type');
        lines.push(`type ${name} = ${(0, schema_converter_js_1.schemaToOmg)(schema, { inlineRefs: options.inlineRefs })}`);
        lines.push('```');
        lines.push('');
        const fileName = `${sanitizeFileName(name)}.omg.md`;
        const filePath = path.join(partialsDir, 'types', fileName);
        fs.writeFileSync(filePath, lines.join('\n'));
        files.push(filePath);
    }
    return files;
}
/**
 * Resolve a parameter reference
 */
function resolveParameter(param, spec) {
    if ('$ref' in param && param.$ref) {
        const refPath = param.$ref.replace('#/components/parameters/', '');
        const resolved = spec.components?.parameters?.[refPath];
        if (resolved) {
            return resolved;
        }
        throw new Error(`Could not resolve parameter reference: ${param.$ref}`);
    }
    return param;
}
/**
 * Resolve a response reference
 */
function resolveResponse(response, spec) {
    if (response.$ref) {
        const refPath = response.$ref.replace('#/components/responses/', '');
        const resolved = spec.components?.responses?.[refPath];
        if (resolved) {
            return resolved;
        }
        throw new Error(`Could not resolve response reference: ${response.$ref}`);
    }
    return response;
}
/**
 * Get schema from request body
 */
function getRequestBodySchema(requestBody, spec) {
    let body = requestBody;
    // Resolve $ref if present
    if (requestBody.$ref) {
        const refPath = requestBody.$ref.replace('#/components/requestBodies/', '');
        const resolved = spec.components?.requestBodies?.[refPath];
        if (resolved) {
            body = resolved;
        }
    }
    // Get schema from content (prefer application/json)
    const content = body.content;
    if (!content)
        return null;
    const jsonContent = content['application/json'];
    if (jsonContent?.schema) {
        return jsonContent.schema;
    }
    // Try other content types
    const firstContent = Object.values(content)[0];
    return firstContent?.schema || null;
}
/**
 * Get schema from response
 */
function getResponseSchema(response) {
    if (!response.content)
        return null;
    const jsonContent = response.content['application/json'];
    if (jsonContent?.schema) {
        return jsonContent.schema;
    }
    // Try other content types
    const firstContent = Object.values(response.content)[0];
    return firstContent?.schema || null;
}
/**
 * Extract example from operation
 */
function extractExample(operation, _spec) {
    // Try to get example from 200 response
    const successResponse = operation.responses?.['200'] || operation.responses?.['201'];
    if (!successResponse)
        return null;
    const content = successResponse.content;
    if (!content)
        return null;
    const jsonContent = content['application/json'];
    if (jsonContent?.example) {
        return jsonContent.example;
    }
    if (jsonContent?.schema?.example) {
        return jsonContent.schema.example;
    }
    return null;
}
/**
 * Generate an operationId from method and path
 */
function generateOperationId(method, pathUrl) {
    // Convert path to operation ID
    // e.g., GET /users/{id} -> get-user
    // e.g., POST /users -> create-user
    // e.g., GET /users -> list-users
    const pathParts = pathUrl
        .split('/')
        .filter((p) => p && !p.startsWith('{'))
        .map((p) => p.replace(/s$/, '')); // Remove trailing 's' for singularization
    const lastPart = pathParts[pathParts.length - 1] || 'resource';
    const hasPathParam = pathUrl.includes('{');
    let prefix;
    switch (method.toLowerCase()) {
        case 'get':
            prefix = hasPathParam ? 'get' : 'list';
            break;
        case 'post':
            prefix = 'create';
            break;
        case 'put':
        case 'patch':
            prefix = 'update';
            break;
        case 'delete':
            prefix = 'delete';
            break;
        default:
            prefix = method.toLowerCase();
    }
    // Add 's' back for list operations
    const resourceName = prefix === 'list' ? `${lastPart}s` : lastPart;
    return `${prefix}-${resourceName}`;
}
/**
 * Sanitize a string for use as a file name
 */
function sanitizeFileName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
//# sourceMappingURL=importer.js.map