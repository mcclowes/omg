/**
 * Tests for the HTML documentation renderer.
 */

import { describe, it, expect } from 'vitest';
import { renderHtmlDocs } from '../src/html-docs.js';

const sampleSpec = {
  info: { title: 'Sample API', version: '2.1.0', description: 'A **sample** API.' },
  servers: [{ url: 'https://api.example.com', description: 'Production' }],
  tags: [{ name: 'Todos', description: 'Manage todos' }],
  paths: {
    '/todos': {
      get: {
        operationId: 'list-todos',
        summary: 'List todos',
        tags: ['Todos'],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' }, done: { type: 'boolean' } },
                  required: ['id'],
                },
              },
            },
          },
        },
      },
      post: {
        operationId: 'create-todo',
        summary: 'Create todo',
        tags: ['Todos'],
        requestBody: {
          content: {
            'application/json': {
              schema: { type: 'object', properties: { title: { type: 'string' } } },
            },
          },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
  },
  components: {
    schemas: {
      Todo: { type: 'object', properties: { id: { type: 'string' } } },
    },
  },
};

describe('renderHtmlDocs', () => {
  it('produces a complete, self-contained HTML document', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(html).toContain('<title>Sample API</title>');
    // Self-contained: inline styles, no external scripts or stylesheets.
    expect(html).toContain('<style>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('http://cdn');
  });

  it('renders each operation with its method and path', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html).toContain('m-get');
    expect(html).toContain('m-post');
    expect(html).toContain('/todos');
    expect(html).toContain('List todos');
    expect(html).toContain('Create todo');
  });

  it('groups endpoints under their tag', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html).toContain('<h2>Todos</h2>');
    expect(html).toContain('Manage todos');
  });

  it('renders schema properties and the required marker', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html).toContain('id');
    expect(html).toContain('done');
    expect(html).toContain('class="req"');
  });

  it('renders the components/schemas section', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html).toContain('id="schema-todo"');
    expect(html).toContain('>Todo<');
  });

  it('renders inline Markdown in descriptions', () => {
    const html = renderHtmlDocs(sampleSpec);
    expect(html).toContain('<strong>sample</strong>');
  });

  it('escapes HTML in spec content to prevent injection', () => {
    const html = renderHtmlDocs({
      info: { title: '<script>alert(1)</script>', version: '1.0' },
      paths: {},
    });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('omits a tag section that has no operations', () => {
    const html = renderHtmlDocs({
      info: { title: 'X', version: '1.0' },
      tags: [{ name: 'Unused', description: 'nothing here' }],
      paths: {},
    });
    expect(html).not.toContain('<h2>Unused</h2>');
  });
});
