/**
 * Request Builder
 *
 * Builds HTTP requests from OpenAPI endpoint specifications.
 * Handles path parameters, query parameters, headers, and request bodies.
 */
/**
 * Build an HTTP request from an endpoint spec
 */
export function buildRequest(endpoint, options) {
    const missingParams = [];
    // Start with base URL
    let url = options.baseUrl.replace(/\/$/, '');
    // Build path with parameter substitution
    let path = endpoint.path;
    const pathParams = endpoint.parameters.filter((p) => p.in === 'path');
    for (const param of pathParams) {
        const value = getParamValue(param, options);
        if (value === undefined && param.required) {
            missingParams.push(`path.${param.name}`);
        }
        else if (value !== undefined) {
            path = path.replace(`{${param.name}}`, encodeURIComponent(String(value)));
        }
    }
    url += path;
    // Add query parameters
    const queryParams = endpoint.parameters.filter((p) => p.in === 'query');
    const queryParts = [];
    for (const param of queryParams) {
        const value = getParamValue(param, options);
        if (value === undefined && param.required) {
            missingParams.push(`query.${param.name}`);
        }
        else if (value !== undefined) {
            queryParts.push(`${encodeURIComponent(param.name)}=${encodeURIComponent(String(value))}`);
        }
    }
    if (queryParts.length > 0) {
        url += '?' + queryParts.join('&');
    }
    // Build headers
    const headers = {
        Accept: 'application/json',
        ...options.headers,
    };
    // Add auth header
    if (options.auth) {
        switch (options.auth.type) {
            case 'bearer':
                headers['Authorization'] = `Bearer ${options.auth.value}`;
                break;
            case 'basic':
                headers['Authorization'] = `Basic ${options.auth.value}`;
                break;
            case 'header':
                headers[options.auth.headerName || 'X-API-Key'] = options.auth.value;
                break;
        }
    }
    // Add header parameters
    const headerParams = endpoint.parameters.filter((p) => p.in === 'header');
    for (const param of headerParams) {
        const value = getParamValue(param, options);
        if (value === undefined && param.required) {
            missingParams.push(`header.${param.name}`);
        }
        else if (value !== undefined) {
            headers[param.name] = String(value);
        }
    }
    // Build request body
    let body;
    if (endpoint.requestBody) {
        if (endpoint.requestBody.example) {
            body = JSON.stringify(endpoint.requestBody.example);
            headers['Content-Type'] = 'application/json';
        }
        else if (endpoint.requestBody.required) {
            missingParams.push('body');
        }
    }
    // If we have missing required params, return error
    if (missingParams.length > 0) {
        return {
            error: `Missing required parameters: ${missingParams.join(', ')}`,
            missingParams,
        };
    }
    return {
        request: {
            url,
            method: endpoint.method.toUpperCase(),
            headers,
            body,
        },
    };
}
/**
 * Get the value for a parameter from options or examples
 */
function getParamValue(param, options) {
    // First check environment variables
    if (options.env) {
        // Try exact match
        if (param.name in options.env) {
            return options.env[param.name];
        }
        // Try UPPER_SNAKE_CASE
        const upperName = toUpperSnakeCase(param.name);
        if (upperName in options.env) {
            return options.env[upperName];
        }
    }
    // Then check for example in the parameter spec
    if (param.example !== undefined) {
        return param.example;
    }
    // Check schema for example
    if (param.schema.example !== undefined) {
        return param.schema.example;
    }
    // Check schema for default
    if (param.schema.default !== undefined) {
        return param.schema.default;
    }
    // Generate a placeholder for common patterns
    return generatePlaceholder(param);
}
/**
 * Convert camelCase to UPPER_SNAKE_CASE
 */
function toUpperSnakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}
/**
 * Generate a placeholder value based on parameter schema
 */
function generatePlaceholder(param) {
    const schema = param.schema;
    const type = schema.type;
    // Check for enum - use first value
    if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
        return schema.enum[0];
    }
    // Check for format hints
    const format = schema.format;
    switch (type) {
        case 'string':
            if (format === 'uuid')
                return 'test-uuid-0000-0000-000000000000';
            if (format === 'email')
                return 'test@example.com';
            if (format === 'date')
                return '2024-01-01';
            if (format === 'date-time')
                return '2024-01-01T00:00:00Z';
            if (format === 'uri' || format === 'url')
                return 'https://example.com';
            // For IDs, try to generate something reasonable
            if (param.name.toLowerCase().includes('id'))
                return 'test-id-123';
            return undefined; // Don't guess arbitrary strings
        case 'integer':
        case 'number':
            if (schema.minimum !== undefined)
                return schema.minimum;
            if (schema.maximum !== undefined)
                return schema.maximum;
            return 1;
        case 'boolean':
            return true;
        default:
            return undefined;
    }
}
/**
 * Extract endpoint specifications from an OpenAPI document
 */
export function extractEndpoints(openapi) {
    const endpoints = [];
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
    for (const [path, pathItem] of Object.entries(openapi.paths)) {
        for (const method of methods) {
            const operation = pathItem[method];
            if (!operation)
                continue;
            const endpoint = {
                operationId: operation.operationId || `${method}-${path}`,
                method: method.toUpperCase(),
                path,
                summary: operation.summary,
                parameters: extractParameters(operation, openapi),
                requestBody: extractRequestBody(operation, openapi),
                responses: extractResponses(operation, openapi),
            };
            endpoints.push(endpoint);
        }
    }
    return endpoints;
}
function extractParameters(operation, openapi) {
    const params = operation.parameters || [];
    return params.map((p) => ({
        name: p.name,
        in: p.in,
        required: p.required ?? false,
        schema: resolveSchema(p.schema, openapi),
        example: p.example,
    }));
}
function extractRequestBody(operation, openapi) {
    const body = operation.requestBody;
    if (!body)
        return undefined;
    const content = body.content;
    if (!content)
        return undefined;
    // Prefer application/json
    const jsonContent = content['application/json'];
    if (!jsonContent)
        return undefined;
    return {
        required: body.required ?? false,
        schema: resolveSchema(jsonContent.schema, openapi),
        example: jsonContent.example,
    };
}
function extractResponses(operation, openapi) {
    const responses = operation.responses || {};
    const result = {};
    for (const [code, response] of Object.entries(responses)) {
        const content = response.content;
        const jsonContent = content?.['application/json'];
        result[code] = {
            description: response.description || '',
            schema: jsonContent?.schema
                ? resolveSchema(jsonContent.schema, openapi)
                : undefined,
        };
    }
    return result;
}
function resolveSchema(schema, openapi) {
    if (!schema)
        return {};
    // Handle $ref
    if (schema.$ref) {
        const ref = schema.$ref;
        const match = ref.match(/^#\/components\/schemas\/(.+)$/);
        if (match && openapi.components?.schemas) {
            const resolved = openapi.components.schemas[match[1]];
            if (resolved) {
                return resolveSchema(resolved, openapi);
            }
        }
        return schema;
    }
    return schema;
}
//# sourceMappingURL=request-builder.js.map