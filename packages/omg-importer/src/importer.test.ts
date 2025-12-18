/**
 * Tests for OpenAPI to OMG importer
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { importOpenApi } from './importer.js';
import { schemaToOmg, parametersToOmg } from './schema-converter.js';

describe('schemaToOmg', () => {
  it('converts primitive types', () => {
    expect(schemaToOmg({ type: 'string' })).toBe('string');
    expect(schemaToOmg({ type: 'integer' })).toBe('integer');
    expect(schemaToOmg({ type: 'number' })).toBe('number');
    expect(schemaToOmg({ type: 'boolean' })).toBe('boolean');
  });

  it('converts string formats to OMG types', () => {
    expect(schemaToOmg({ type: 'string', format: 'date' })).toBe('date');
    expect(schemaToOmg({ type: 'string', format: 'date-time' })).toBe('datetime');
    expect(schemaToOmg({ type: 'string', format: 'uuid' })).toBe('uuid');
  });

  it('converts arrays', () => {
    expect(schemaToOmg({ type: 'array', items: { type: 'string' } })).toBe('string[]');
    expect(schemaToOmg({ type: 'array', items: { type: 'integer' } })).toBe('integer[]');
  });

  it('converts enums', () => {
    expect(schemaToOmg({ enum: ['active', 'inactive', 'pending'] })).toBe(
      '"active" | "inactive" | "pending"'
    );
    expect(schemaToOmg({ enum: [1, 2, 3] })).toBe('1 | 2 | 3');
  });

  it('converts simple objects', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['id'],
    };
    const result = schemaToOmg(schema);
    expect(result).toContain('id: string');
    expect(result).toContain('name?: string');
  });

  it('converts objects with descriptions as comments', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier' },
      },
      required: ['id'],
    };
    const result = schemaToOmg(schema);
    expect(result).toContain('// Unique identifier');
  });

  it('converts $ref references', () => {
    expect(schemaToOmg({ $ref: '#/components/schemas/User' })).toBe('User');
    expect(schemaToOmg({ $ref: '#/components/schemas/Account' })).toBe('Account');
  });

  it('handles allOf (intersection)', () => {
    const schema = {
      allOf: [{ $ref: '#/components/schemas/Base' }, { $ref: '#/components/schemas/Extended' }],
    };
    expect(schemaToOmg(schema)).toBe('Base & Extended');
  });

  it('handles oneOf (union)', () => {
    const schema = {
      oneOf: [{ type: 'string' }, { type: 'integer' }],
    };
    expect(schemaToOmg(schema)).toBe('string | integer');
  });

  it('adds annotations for constraints', () => {
    const schema = {
      type: 'object',
      properties: {
        count: { type: 'integer', minimum: 0, maximum: 100 },
        name: { type: 'string', minLength: 1, maxLength: 50 },
      },
      required: ['count', 'name'],
    };
    const result = schemaToOmg(schema);
    expect(result).toContain('@min(0)');
    expect(result).toContain('@max(100)');
    expect(result).toContain('@minLength(1)');
    expect(result).toContain('@maxLength(50)');
  });
});

describe('parametersToOmg', () => {
  it('converts parameters to OMG block content', () => {
    const params = [
      { name: 'id', schema: { type: 'string' }, required: true, description: 'Resource ID' },
      { name: 'limit', schema: { type: 'integer' }, required: false },
    ];
    const result = parametersToOmg(params);
    expect(result).toContain('id: string');
    expect(result).toContain('// Resource ID');
    expect(result).toContain('limit?: integer');
  });
});

describe('importOpenApi', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'omg-import-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('imports a simple OpenAPI spec', () => {
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
    const result = importOpenApi(specPath, { outputDir });

    // Check result structure
    expect(result.apiFile).toBe(path.join(outputDir, 'api.omg.md'));
    expect(result.endpointFiles).toHaveLength(1);
    expect(result.warnings).toHaveLength(0);

    // Check API file was created
    expect(fs.existsSync(result.apiFile)).toBe(true);
    const apiContent = fs.readFileSync(result.apiFile, 'utf-8');
    expect(apiContent).toContain('name: Test API');
    expect(apiContent).toContain('version: 1.0.0');
    expect(apiContent).toContain('baseUrl: https://api.example.com');

    // Check endpoint file was created
    expect(fs.existsSync(result.endpointFiles[0])).toBe(true);
    const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
    expect(endpointContent).toContain('method: GET');
    expect(endpointContent).toContain('path: /users');
    expect(endpointContent).toContain('operationId: list-users');
    expect(endpointContent).toContain('omg.response');
  });

  it('handles path parameters', () => {
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
    const result = importOpenApi(specPath, { outputDir });

    const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
    expect(endpointContent).toContain('omg.path');
    expect(endpointContent).toContain('id: uuid');
    expect(endpointContent).toContain('// User ID');
  });

  it('handles query parameters', () => {
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
    const result = importOpenApi(specPath, { outputDir });

    const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
    expect(endpointContent).toContain('omg.query');
    expect(endpointContent).toContain('limit?: integer');
    expect(endpointContent).toContain('offset?: integer');
  });

  it('handles request body', () => {
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
    const result = importOpenApi(specPath, { outputDir });

    const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
    expect(endpointContent).toContain('omg.body');
    expect(endpointContent).toContain('name: string');
    expect(endpointContent).toContain('email: string');
  });

  it('generates partials for schemas when requested', () => {
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
    const result = importOpenApi(specPath, { outputDir, generatePartials: true });

    expect(result.partialFiles).toHaveLength(1);
    expect(fs.existsSync(result.partialFiles[0])).toBe(true);
    const partialContent = fs.readFileSync(result.partialFiles[0], 'utf-8');
    expect(partialContent).toContain('omg.type');
    expect(partialContent).toContain('type User');
  });

  it('rejects non-OpenAPI 3.x specs', () => {
    const spec = {
      swagger: '2.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {},
    };

    const specPath = path.join(tempDir, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));

    const outputDir = path.join(tempDir, 'output');
    expect(() => importOpenApi(specPath, { outputDir })).toThrow('Unsupported OpenAPI version');
  });

  it('handles YAML specs', () => {
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
    const result = importOpenApi(specPath, { outputDir });

    expect(result.endpointFiles).toHaveLength(1);
    const endpointContent = fs.readFileSync(result.endpointFiles[0], 'utf-8');
    expect(endpointContent).toContain('operationId: health-check');
  });
});
