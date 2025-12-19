"use strict";
/**
 * Mock Server
 *
 * Creates an Express HTTP server with mock endpoints based on ParsedApi
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockServer = createMockServer;
exports.startMockServer = startMockServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mock_generator_js_1 = require("./mock-generator.js");
/**
 * Create a mock server from a ParsedApi
 */
function createMockServer(api, options = {}) {
    const { port = 3000, basePath = '', cors: enableCors = true, seed, delay = 0, logging = true, handlers = {}, } = options;
    const app = (0, express_1.default)();
    const mockGenerator = (0, mock_generator_js_1.createMockGenerator)(api, seed);
    const routes = [];
    // Middleware
    app.use(express_1.default.json());
    if (enableCors) {
        app.use((0, cors_1.default)());
    }
    // Request logging
    if (logging) {
        app.use((req, _res, next) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }
    // Delay middleware
    if (delay > 0) {
        app.use((_req, _res, next) => {
            setTimeout(next, delay);
        });
    }
    // Root endpoint with API info
    app.get(basePath || '/', (_req, res) => {
        res.json({
            name: api.name,
            version: api.version,
            description: api.description,
            baseUrl: api.baseUrl,
            endpoints: routes.map((r) => ({
                method: r.method,
                path: r.path,
                operationId: r.operationId,
            })),
        });
    });
    // Register all endpoints
    for (const endpoint of api.endpoints) {
        const routePath = basePath + convertPath(endpoint.path);
        const method = endpoint.method.toLowerCase();
        // Check for custom handler
        if (handlers[endpoint.operationId]) {
            app[method](routePath, handlers[endpoint.operationId]);
        }
        else {
            // Create default mock handler
            const handler = createRouteHandler(endpoint, mockGenerator, api.types);
            app[method](routePath, handler);
        }
        routes.push({
            method: endpoint.method,
            path: routePath,
            operationId: endpoint.operationId,
            description: endpoint.summary || endpoint.description,
        });
    }
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `No endpoint found for ${req.method} ${req.path}`,
            availableEndpoints: routes.map((r) => `${r.method} ${r.path}`),
        });
    });
    // Error handler
    app.use((err, _req, res, _next) => {
        console.error('Server error:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message,
        });
    });
    // Server instance
    let server = null;
    return {
        app,
        routes,
        url: `http://localhost:${port}${basePath}`,
        async start() {
            return new Promise((resolve, reject) => {
                try {
                    server = app.listen(port, () => {
                        console.log(`\nMock server started:`);
                        console.log(`  URL: http://localhost:${port}${basePath}`);
                        console.log(`  API: ${api.name} v${api.version}`);
                        console.log(`  Endpoints: ${routes.length}`);
                        console.log('\nAvailable routes:');
                        for (const route of routes) {
                            console.log(`  ${route.method.padEnd(7)} ${route.path}`);
                        }
                        console.log('');
                        resolve();
                    });
                    server.on('error', reject);
                }
                catch (err) {
                    reject(err);
                }
            });
        },
        async stop() {
            return new Promise((resolve, reject) => {
                if (server) {
                    server.close((err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        },
    };
}
/**
 * Convert OpenAPI path params to Express format
 * /users/{id} -> /users/:id
 */
function convertPath(openApiPath) {
    return openApiPath.replace(/\{(\w+)\}/g, ':$1');
}
/**
 * Create a route handler for an endpoint
 */
function createRouteHandler(endpoint, mockGenerator, types) {
    return (req, res) => {
        // Validate request body if expected
        if (endpoint.requestBody && endpoint.method !== 'GET') {
            if (!req.body || Object.keys(req.body).length === 0) {
                // Don't require body, just note it's missing
            }
        }
        // Determine response status code
        const responseCodes = Object.keys(endpoint.responses)
            .map(Number)
            .sort((a, b) => a - b);
        // Default to first success code (2xx) or 200
        let statusCode = responseCodes.find((c) => c >= 200 && c < 300) || responseCodes[0] || 200;
        // For POST, prefer 201 if available
        if (endpoint.method === 'POST' && endpoint.responses[201]) {
            statusCode = 201;
        }
        // For DELETE, prefer 204 if available
        if (endpoint.method === 'DELETE' && endpoint.responses[204]) {
            res.status(204).send();
            return;
        }
        // Get response schema
        const responseInfo = endpoint.responses[statusCode];
        if (!responseInfo || !responseInfo.schema) {
            // No response schema defined, return empty object
            res.status(statusCode).json({});
            return;
        }
        // Generate mock response
        let mockResponse = mockGenerator.generate(responseInfo.schema);
        // Inject path parameters into response if they exist
        if (req.params && typeof mockResponse === 'object' && mockResponse !== null) {
            mockResponse = injectPathParams(mockResponse, req.params);
        }
        res.status(statusCode).json(mockResponse);
    };
}
/**
 * Inject path parameters into response object
 * If response has a field matching a path param, use the actual param value
 */
function injectPathParams(response, params) {
    const result = { ...response };
    for (const [key, value] of Object.entries(params)) {
        // Check common variations
        if (key in result) {
            result[key] = value;
        }
        // Also check for "id" field matching "{resourceId}" param
        if (key.endsWith('Id') && 'id' in result) {
            result['id'] = value;
        }
    }
    return result;
}
/**
 * Create and start a mock server
 */
async function startMockServer(api, options = {}) {
    const server = createMockServer(api, options);
    await server.start();
    return server;
}
//# sourceMappingURL=server.js.map