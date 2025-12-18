"use strict";
/**
 * Tests for OpenAPI to OMG importer
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
const vitest_1 = require("vitest");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const importer_js_1 = require("./importer.js");
const schema_converter_js_1 = require("./schema-converter.js");
(0, vitest_1.describe)('schemaToOmg', () => {
    (0, vitest_1.it)('converts primitive types', () => {
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'string' })).toBe('string');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'integer' })).toBe('integer');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'number' })).toBe('number');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'boolean' })).toBe('boolean');
    });
    (0, vitest_1.it)('converts string formats to OMG types', () => {
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'string', format: 'date' })).toBe('date');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'string', format: 'date-time' })).toBe('datetime');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'string', format: 'uuid' })).toBe('uuid');
    });
    (0, vitest_1.it)('converts arrays', () => {
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'array', items: { type: 'string' } })).toBe('string[]');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ type: 'array', items: { type: 'integer' } })).toBe('integer[]');
    });
    (0, vitest_1.it)('converts enums', () => {
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ enum: ['active', 'inactive', 'pending'] })).toBe('"active" | "inactive" | "pending"');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ enum: [1, 2, 3] })).toBe('1 | 2 | 3');
    });
    (0, vitest_1.it)('converts simple objects', () => {
        const schema = {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
            },
            required: ['id'],
        };
        const result = (0, schema_converter_js_1.schemaToOmg)(schema);
        (0, vitest_1.expect)(result).toContain('id: string');
        (0, vitest_1.expect)(result).toContain('name?: string');
    });
    (0, vitest_1.it)('converts objects with descriptions as comments', () => {
        const schema = {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Unique identifier' },
            },
            required: ['id'],
        };
        const result = (0, schema_converter_js_1.schemaToOmg)(schema);
        (0, vitest_1.expect)(result).toContain('// Unique identifier');
    });
    (0, vitest_1.it)('converts $ref references', () => {
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ $ref: '#/components/schemas/User' })).toBe('User');
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)({ $ref: '#/components/schemas/Account' })).toBe('Account');
    });
    (0, vitest_1.it)('handles allOf (intersection)', () => {
        const schema = {
            allOf: [{ $ref: '#/components/schemas/Base' }, { $ref: '#/components/schemas/Extended' }],
        };
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)(schema)).toBe('Base & Extended');
    });
    (0, vitest_1.it)('handles oneOf (union)', () => {
        const schema = {
            oneOf: [{ type: 'string' }, { type: 'integer' }],
        };
        (0, vitest_1.expect)((0, schema_converter_js_1.schemaToOmg)(schema)).toBe('string | integer');
    });
    (0, vitest_1.it)('adds annotations for constraints', () => {
        const schema = {
            type: 'object',
            properties: {
                count: { type: 'integer', minimum: 0, maximum: 100 },
                name: { type: 'string', minLength: 1, maxLength: 50 },
            },
            required: ['count', 'name'],
        };
        const result = (0, schema_converter_js_1.schemaToOmg)(schema);
        (0, vitest_1.expect)(result).toContain('@min(0)');
        (0, vitest_1.expect)(result).toContain('@max(100)');
        (0, vitest_1.expect)(result).toContain('@minLength(1)');
        (0, vitest_1.expect)(result).toContain('@maxLength(50)');
    });
});
(0, vitest_1.describe)('parametersToOmg', () => {
    (0, vitest_1.it)('converts parameters to OMG block content', () => {
        const params = [
            { name: 'id', schema: { type: 'string' }, required: true, description: 'Resource ID' },
            { name: 'limit', schema: { type: 'integer' }, required: false },
        ];
        const result = (0, schema_converter_js_1.parametersToOmg)(params);
        (0, vitest_1.expect)(result).toContain('id: string');
        (0, vitest_1.expect)(result).toContain('// Resource ID');
        (0, vitest_1.expect)(result).toContain('limit?: integer');
    });
});
(0, vitest_1.describe)('importOpenApi', () => {
    let tempDir;
    (0, vitest_1.beforeEach)(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'omg-import-test-'));
    });
    (0, vitest_1.afterEach)(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });
    (0, vitest_1.it)('imports a simple OpenAPI spec', () => {
        const spec = {
            openapi: '3.0.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
                description: 'A test API',
            },
            servers: [{ url: 'https://api.example.com' }],
            paths: {
                '/users': {
                    get: {
                        operationId: 'list-users',
                        summary: 'List all users',
                        tags: ['Users'],
                        responses: {
                            '200': {
                                description: 'Success',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string' },
                                                    name: { type: 'string' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir });
        // Check result structure
        (0, vitest_1.expect)(result.apiFile).toBe(path.join(outputDir, 'api.omg.md'));
        (0, vitest_1.expect)(result.endpointFiles).toHaveLength(1);
        (0, vitest_1.expect)(result.warnings).toHaveLength(0);
        // Check API file was created
        (0, vitest_1.expect)(fs.existsSync(result.apiFile)).toBe(true);
        const apiContent = fs.readFileSync(result.apiFile, 'utf-8');
        (0, vitest_1.expect)(apiContent).toContain('name: Test API');
        (0, vitest_1.expect)(apiContent).toContain('version: 1.0.0');
        (0, vitest_1.expect)(apiContent).toContain('baseUrl: https://api.example.com');
        // Check endpoint file was created
        (0, vitest_1.expect)(fs.existsSync(result.endpointFiles[0])).toBe(true);
        const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
        (0, vitest_1.expect)(endpointContent).toContain('method: GET');
        (0, vitest_1.expect)(endpointContent).toContain('path: /users');
        (0, vitest_1.expect)(endpointContent).toContain('operationId: list-users');
        (0, vitest_1.expect)(endpointContent).toContain('omg.response');
    });
    (0, vitest_1.it)('handles path parameters', () => {
        const spec = {
            openapi: '3.0.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {
                '/users/{id}': {
                    get: {
                        operationId: 'get-user',
                        parameters: [
                            {
                                name: 'id',
                                in: 'path',
                                required: true,
                                schema: { type: 'string', format: 'uuid' },
                                description: 'User ID',
                            },
                        ],
                        responses: {
                            '200': { description: 'Success' },
                        },
                    },
                },
            },
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir });
        const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
        (0, vitest_1.expect)(endpointContent).toContain('omg.path');
        (0, vitest_1.expect)(endpointContent).toContain('id: uuid');
        (0, vitest_1.expect)(endpointContent).toContain('// User ID');
    });
    (0, vitest_1.it)('handles query parameters', () => {
        const spec = {
            openapi: '3.0.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {
                '/users': {
                    get: {
                        operationId: 'list-users',
                        parameters: [
                            { name: 'limit', in: 'query', schema: { type: 'integer' } },
                            { name: 'offset', in: 'query', schema: { type: 'integer' } },
                        ],
                        responses: { '200': { description: 'Success' } },
                    },
                },
            },
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir });
        const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
        (0, vitest_1.expect)(endpointContent).toContain('omg.query');
        (0, vitest_1.expect)(endpointContent).toContain('limit?: integer');
        (0, vitest_1.expect)(endpointContent).toContain('offset?: integer');
    });
    (0, vitest_1.it)('handles request body', () => {
        const spec = {
            openapi: '3.0.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {
                '/users': {
                    post: {
                        operationId: 'create-user',
                        requestBody: {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            email: { type: 'string', format: 'email' },
                                        },
                                        required: ['name', 'email'],
                                    },
                                },
                            },
                        },
                        responses: { '201': { description: 'Created' } },
                    },
                },
            },
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir });
        const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
        (0, vitest_1.expect)(endpointContent).toContain('omg.body');
        (0, vitest_1.expect)(endpointContent).toContain('name: string');
        (0, vitest_1.expect)(endpointContent).toContain('email: string');
    });
    (0, vitest_1.it)('generates partials for schemas when requested', () => {
        const spec = {
            openapi: '3.0.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {},
            components: {
                schemas: {
                    User: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                        },
                    },
                },
            },
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir, generatePartials: true });
        (0, vitest_1.expect)(result.partialFiles).toHaveLength(1);
        (0, vitest_1.expect)(fs.existsSync(result.partialFiles[0])).toBe(true);
        const partialContent = fs.readFileSync(result.partialFiles[0], 'utf-8');
        (0, vitest_1.expect)(partialContent).toContain('omg.type');
        (0, vitest_1.expect)(partialContent).toContain('type User');
    });
    (0, vitest_1.it)('rejects non-OpenAPI 3.x specs', () => {
        const spec = {
            swagger: '2.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {},
        };
        const specPath = path.join(tempDir, 'spec.json');
        fs.writeFileSync(specPath, JSON.stringify(spec));
        const outputDir = path.join(tempDir, 'output');
        (0, vitest_1.expect)(() => (0, importer_js_1.importOpenApi)(specPath, { outputDir })).toThrow('Unsupported OpenAPI version');
    });
    (0, vitest_1.it)('handles YAML specs', () => {
        const yamlSpec = `openapi: '3.0.0'
info:
  title: Test API
  version: '1.0.0'
paths:
  /health:
    get:
      operationId: health-check
      responses:
        '200':
          description: OK
`;
        const specPath = path.join(tempDir, 'spec.yaml');
        fs.writeFileSync(specPath, yamlSpec);
        const outputDir = path.join(tempDir, 'output');
        const result = (0, importer_js_1.importOpenApi)(specPath, { outputDir });
        (0, vitest_1.expect)(result.endpointFiles).toHaveLength(1);
        const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
        (0, vitest_1.expect)(endpointContent).toContain('operationId: health-check');
    });
});
//# sourceMappingURL=importer.test.js.map