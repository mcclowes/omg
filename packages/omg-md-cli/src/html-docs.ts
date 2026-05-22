/**
 * HTML Documentation Renderer
 *
 * Renders a compiled OpenAPI 3.1 spec as a single, self-contained, static
 * HTML page — no external scripts, stylesheets, or network access required.
 * Endpoints are grouped by tag; the Markdown prose carried in `description`
 * fields is preserved alongside the endpoint signatures, parameters, and
 * schemas.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Minimal structural view of the parts of an OpenAPI spec we render. */
interface DocSpec {
  info?: { title?: string; version?: string; description?: string };
  servers?: Array<{ url?: string; description?: string }>;
  tags?: Array<{ name?: string; description?: string }>;
  paths?: Record<string, Record<string, any>>;
  components?: { schemas?: Record<string, any> };
}

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

/**
 * Render a compiled OpenAPI spec to a complete, self-contained HTML document.
 */
export function renderHtmlDocs(spec: DocSpec): string {
  const title = spec.info?.title || 'API';
  const version = spec.info?.version || '';
  const operations = collectOperations(spec);
  const groups = groupByTag(operations, spec.tags);
  const componentSchemas = spec.components?.schemas || {};

  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<title>${escapeHtml(title)}</title>`,
    `<style>${STYLES}</style>`,
    '</head>',
    '<body>',
    renderSidebar(title, groups, componentSchemas),
    '<main>',
    renderHeader(title, version, spec.info?.description, spec.servers),
    groups.map((g) => renderGroup(g)).join('\n'),
    renderComponents(componentSchemas),
    '</main>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

interface Operation {
  method: string;
  path: string;
  op: any;
  id: string;
  tag: string;
}

interface TagGroup {
  name: string;
  description?: string;
  operations: Operation[];
}

function collectOperations(spec: DocSpec): Operation[] {
  const result: Operation[] = [];
  for (const [path, item] of Object.entries(spec.paths || {})) {
    if (!item || typeof item !== 'object') continue;
    for (const method of HTTP_METHODS) {
      const op = (item as any)[method];
      if (!op) continue;
      const tag = Array.isArray(op.tags) && op.tags.length > 0 ? String(op.tags[0]) : 'Endpoints';
      result.push({
        method,
        path,
        op,
        id: slug(`${method}-${path}`),
        tag,
      });
    }
  }
  return result;
}

function groupByTag(operations: Operation[], tags: DocSpec['tags']): TagGroup[] {
  const byName = new Map<string, TagGroup>();
  // Seed declared tags first so their order and descriptions are preserved.
  for (const tag of tags || []) {
    if (tag.name)
      byName.set(tag.name, { name: tag.name, description: tag.description, operations: [] });
  }
  for (const op of operations) {
    let group = byName.get(op.tag);
    if (!group) {
      group = { name: op.tag, operations: [] };
      byName.set(op.tag, group);
    }
    group.operations.push(op);
  }
  // Drop declared-but-unused tags so the page only lists real sections.
  return [...byName.values()].filter((g) => g.operations.length > 0);
}

function renderHeader(
  title: string,
  version: string,
  description: string | undefined,
  servers: DocSpec['servers']
): string {
  const parts = [
    `<h1>${escapeHtml(title)}${version ? ` <span class="version">${escapeHtml(version)}</span>` : ''}</h1>`,
  ];
  if (description) parts.push(`<div class="prose">${renderMarkdown(description)}</div>`);
  if (servers && servers.length > 0) {
    parts.push('<div class="servers"><strong>Servers</strong><ul>');
    for (const s of servers) {
      const desc = s.description ? ` — ${escapeHtml(s.description)}` : '';
      parts.push(`<li><code>${escapeHtml(s.url || '')}</code>${desc}</li>`);
    }
    parts.push('</ul></div>');
  }
  return `<header>${parts.join('\n')}</header>`;
}

function renderSidebar(
  title: string,
  groups: TagGroup[],
  componentSchemas: Record<string, any>
): string {
  const parts = [`<nav><div class="nav-title">${escapeHtml(title)}</div>`];
  for (const group of groups) {
    parts.push(`<div class="nav-group">${escapeHtml(group.name)}</div><ul>`);
    for (const op of group.operations) {
      const label = op.op.summary || `${op.method.toUpperCase()} ${op.path}`;
      parts.push(
        `<li><a href="#${op.id}"><span class="m m-${op.method}">${op.method.toUpperCase()}</span> ${escapeHtml(
          label
        )}</a></li>`
      );
    }
    parts.push('</ul>');
  }
  const schemaNames = Object.keys(componentSchemas);
  if (schemaNames.length > 0) {
    parts.push('<div class="nav-group">Schemas</div><ul>');
    for (const name of schemaNames) {
      parts.push(`<li><a href="#schema-${slug(name)}">${escapeHtml(name)}</a></li>`);
    }
    parts.push('</ul>');
  }
  parts.push('</nav>');
  return parts.join('\n');
}

function renderGroup(group: TagGroup): string {
  const parts = [`<section class="tag-group"><h2>${escapeHtml(group.name)}</h2>`];
  if (group.description)
    parts.push(`<div class="prose">${renderMarkdown(group.description)}</div>`);
  for (const op of group.operations) parts.push(renderOperation(op));
  parts.push('</section>');
  return parts.join('\n');
}

function renderOperation(op: Operation): string {
  const o = op.op;
  const parts = [`<article class="endpoint" id="${op.id}">`];
  parts.push(
    `<div class="endpoint-head"><span class="m m-${op.method}">${op.method.toUpperCase()}</span>` +
      `<code class="path">${escapeHtml(op.path)}</code>` +
      (o.deprecated ? '<span class="deprecated">deprecated</span>' : '') +
      '</div>'
  );
  if (o.summary) parts.push(`<h3>${escapeHtml(o.summary)}</h3>`);
  if (o.description) parts.push(`<div class="prose">${renderMarkdown(o.description)}</div>`);

  // Parameters
  const params = Array.isArray(o.parameters) ? o.parameters : [];
  for (const where of ['path', 'query', 'header']) {
    const subset = params.filter((p: any) => p && p.in === where);
    if (subset.length === 0) continue;
    parts.push(`<h4>${capitalize(where)} parameters</h4>`);
    parts.push(
      '<table class="params"><thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody>'
    );
    for (const p of subset) {
      parts.push(
        `<tr><td><code>${escapeHtml(p.name || '')}</code></td>` +
          `<td>${typeSummary(p.schema)}</td>` +
          `<td>${p.required ? 'yes' : 'no'}</td>` +
          `<td>${p.description ? renderMarkdown(String(p.description)) : ''}</td></tr>`
      );
    }
    parts.push('</tbody></table>');
  }

  // Request body
  const reqSchema = bodySchema(o.requestBody);
  if (reqSchema) {
    parts.push('<h4>Request body</h4>');
    parts.push(renderSchema(reqSchema, 0));
  }

  // Responses
  const responses = o.responses && typeof o.responses === 'object' ? o.responses : {};
  const codes = Object.keys(responses);
  if (codes.length > 0) {
    parts.push('<h4>Responses</h4>');
    for (const code of codes) {
      const resp = responses[code] || {};
      parts.push(
        `<div class="response"><span class="status status-${statusClass(code)}">${escapeHtml(code)}</span>` +
          `<span class="status-desc">${escapeHtml(resp.description || '')}</span></div>`
      );
      const rs = bodySchema(resp);
      if (rs) parts.push(renderSchema(rs, 0));
    }
  }

  parts.push('</article>');
  return parts.join('\n');
}

function renderComponents(schemas: Record<string, any>): string {
  const names = Object.keys(schemas);
  if (names.length === 0) return '';
  const parts = ['<section class="tag-group"><h2>Schemas</h2>'];
  for (const name of names) {
    parts.push(`<article class="endpoint" id="schema-${slug(name)}"><h3>${escapeHtml(name)}</h3>`);
    const s = schemas[name];
    if (s && s.description)
      parts.push(`<div class="prose">${renderMarkdown(String(s.description))}</div>`);
    parts.push(renderSchema(s, 0));
    parts.push('</article>');
  }
  parts.push('</section>');
  return parts.join('\n');
}

/** Extract the first media type's schema from a requestBody/response object. */
function bodySchema(holder: any): any {
  if (!holder || typeof holder !== 'object' || !holder.content) return null;
  const first = Object.values(holder.content)[0] as any;
  return first && first.schema ? first.schema : null;
}

/** Render a schema as a nested, readable tree. */
function renderSchema(schema: any, depth: number): string {
  if (!schema || typeof schema !== 'object' || depth > 12) {
    return '<div class="schema">any</div>';
  }

  if (schema.$ref) {
    const name = refName(schema.$ref);
    return `<div class="schema"><a href="#schema-${slug(name)}" class="ref">${escapeHtml(name)}</a></div>`;
  }

  if (Array.isArray(schema.oneOf) || Array.isArray(schema.anyOf)) {
    const variants = schema.oneOf || schema.anyOf;
    const inner = variants.map((v: any) => `<li>${renderSchema(v, depth + 1)}</li>`).join('');
    return `<div class="schema"><span class="kw">one of</span><ul class="schema-list">${inner}</ul></div>`;
  }

  if (Array.isArray(schema.allOf)) {
    const inner = schema.allOf.map((v: any) => `<li>${renderSchema(v, depth + 1)}</li>`).join('');
    return `<div class="schema"><span class="kw">all of</span><ul class="schema-list">${inner}</ul></div>`;
  }

  if (schema.type === 'object' || schema.properties) {
    const props = schema.properties || {};
    const required: string[] = Array.isArray(schema.required) ? schema.required : [];
    const names = Object.keys(props);
    if (names.length === 0) return '<div class="schema">object</div>';
    const rows = names
      .map((name) => {
        const p = props[name];
        const req = required.includes(name) ? '<span class="req">*</span>' : '';
        const desc =
          p && p.description
            ? `<div class="field-desc">${renderMarkdown(String(p.description))}</div>`
            : '';
        return (
          `<li><code class="field">${escapeHtml(name)}</code>${req} ` +
          `<span class="field-type">${typeSummary(p)}</span>${desc}` +
          renderNested(p, depth + 1) +
          '</li>'
        );
      })
      .join('');
    return `<div class="schema"><ul class="schema-fields">${rows}</ul></div>`;
  }

  if (schema.type === 'array') {
    return `<div class="schema"><span class="kw">array of</span> ${renderSchema(schema.items || {}, depth + 1)}</div>`;
  }

  return `<div class="schema">${typeSummary(schema)}</div>`;
}

/** Render the nested structure of a property only when it adds detail. */
function renderNested(schema: any, depth: number): string {
  if (!schema || typeof schema !== 'object' || schema.$ref) return '';
  if (schema.type === 'object' || schema.properties) return renderSchema(schema, depth);
  if (
    schema.type === 'array' &&
    schema.items &&
    (schema.items.properties || schema.items.type === 'object')
  ) {
    return `<div class="nested"><span class="kw">array of</span>${renderSchema(schema.items, depth)}</div>`;
  }
  if (Array.isArray(schema.oneOf) || Array.isArray(schema.anyOf) || Array.isArray(schema.allOf)) {
    return renderSchema(schema, depth);
  }
  return '';
}

/** A compact one-line type label for a schema. */
function typeSummary(schema: any): string {
  if (!schema || typeof schema !== 'object') return 'any';
  if (schema.$ref) {
    const name = refName(schema.$ref);
    return `<a href="#schema-${slug(name)}" class="ref">${escapeHtml(name)}</a>`;
  }
  if (Array.isArray(schema.enum)) {
    return schema.enum
      .map((v: unknown) => `<code>${escapeHtml(JSON.stringify(v))}</code>`)
      .join(' | ');
  }
  if (Array.isArray(schema.oneOf) || Array.isArray(schema.anyOf)) return 'one of';
  if (Array.isArray(schema.allOf)) return 'all of';
  if (schema.type === 'array') return `${typeSummary(schema.items || {})}[]`;
  let label = schema.type ? String(schema.type) : 'object';
  if (schema.format) label += ` (${escapeHtml(String(schema.format))})`;
  if (schema.nullable) label += ' | null';
  return `<span class="prim">${escapeHtml(label)}</span>`;
}

function refName(ref: string): string {
  const parts = String(ref).split('/');
  return parts[parts.length - 1] || ref;
}

function statusClass(code: string): string {
  const n = parseInt(code, 10);
  if (Number.isNaN(n)) return 'default';
  if (n < 300) return '2xx';
  if (n < 400) return '3xx';
  if (n < 500) return '4xx';
  return '5xx';
}

/** Escape text for safe HTML output. */
function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render a small, safe subset of Markdown to HTML: headings, paragraphs,
 * inline code, bold, and links. All text is HTML-escaped first, so the output
 * is always safe. Rich Markdown (tables, nested lists, …) is out of scope.
 */
function renderMarkdown(md: string): string {
  const paragraphs = String(md)
    .trim()
    .split(/\n\s*\n/)
    .filter((p) => p.length > 0);
  return paragraphs
    .map((para) => {
      // A standalone `#`-prefixed line is a heading. Description prose sits
      // under an <h3>, so offset the level to keep the outline sane.
      const heading = para.match(/^(#{1,6})\s+(.+)$/);
      if (heading && !para.includes('\n')) {
        const level = Math.min(heading[1].length + 3, 6);
        return `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
      }
      return `<p>${inlineMarkdown(para).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

/** Escape, then apply inline Markdown: `code`, **bold**, [link](url). */
function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

function capitalize(s: string): string {
  return s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Turn arbitrary text into a stable URL-fragment slug. */
function slug(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const STYLES = `
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.55; color: #1a1a2e; background: #fff; }
code, .path, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
nav { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; overflow-y: auto;
  background: #f5f6f8; border-right: 1px solid #e2e4e9; padding: 16px 0; }
nav .nav-title { font-weight: 700; font-size: 15px; padding: 4px 20px 12px; }
nav .nav-group { font-size: 11px; text-transform: uppercase; letter-spacing: .06em;
  color: #6b7280; padding: 14px 20px 4px; font-weight: 600; }
nav ul { list-style: none; margin: 0; padding: 0; }
nav li a { display: block; padding: 4px 20px; font-size: 13px; color: #374151;
  text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
nav li a:hover { background: #e8eaee; }
main { margin-left: 280px; padding: 32px 48px; max-width: 920px; }
h1 { margin: 0 0 8px; font-size: 30px; }
h2 { margin: 48px 0 12px; font-size: 22px; border-bottom: 2px solid #e2e4e9; padding-bottom: 6px; }
h3 { margin: 16px 0 8px; font-size: 17px; }
h4 { margin: 18px 0 6px; font-size: 13px; text-transform: uppercase;
  letter-spacing: .05em; color: #6b7280; }
.version { font-size: 14px; color: #6b7280; font-weight: 400; }
.prose p { margin: 8px 0; }
.servers ul { margin: 4px 0; padding-left: 20px; }
.endpoint { border: 1px solid #e2e4e9; border-radius: 8px; padding: 16px 20px; margin: 16px 0; }
.endpoint-head { display: flex; align-items: center; gap: 10px; }
.path { font-size: 14px; font-weight: 600; }
.m { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 4px;
  color: #fff; letter-spacing: .03em; }
.m-get { background: #2563eb; } .m-post { background: #16a34a; }
.m-put { background: #d97706; } .m-patch { background: #ca8a04; }
.m-delete { background: #dc2626; } .m-head, .m-options { background: #6b7280; }
.deprecated { font-size: 11px; background: #fee2e2; color: #b91c1c;
  padding: 2px 7px; border-radius: 4px; font-weight: 600; }
table.params { width: 100%; border-collapse: collapse; font-size: 13px; margin: 4px 0; }
table.params th { text-align: left; border-bottom: 1px solid #e2e4e9; padding: 6px 8px; color: #6b7280; }
table.params td { border-bottom: 1px solid #f0f1f3; padding: 6px 8px; vertical-align: top; }
.schema { font-size: 13px; margin: 6px 0; }
.schema-fields, .schema-list { list-style: none; margin: 4px 0; padding-left: 16px;
  border-left: 2px solid #eceef1; }
.schema-fields li { margin: 4px 0; }
.field { font-weight: 600; }
.req { color: #dc2626; font-weight: 700; margin-left: 1px; }
.field-type, .prim { color: #7c3aed; }
.field-desc { color: #6b7280; font-size: 12px; }
.kw { color: #6b7280; font-style: italic; }
.ref { color: #2563eb; text-decoration: none; }
.ref:hover { text-decoration: underline; }
.response { display: flex; align-items: center; gap: 8px; margin: 8px 0 2px; }
.status { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 4px; color: #fff; }
.status-2xx { background: #16a34a; } .status-3xx { background: #0891b2; }
.status-4xx { background: #d97706; } .status-5xx, .status-default { background: #dc2626; }
.status-desc { font-size: 13px; color: #374151; }
.nested { margin-left: 4px; }
@media (max-width: 720px) {
  nav { display: none; }
  main { margin-left: 0; padding: 20px; }
}
`;
