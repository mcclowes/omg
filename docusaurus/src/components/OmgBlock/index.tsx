import React from 'react';
import styles from './styles.module.css';

interface OmgBlockProps {
  blockType: string;
  source: string;
  statusCode?: number;
  exampleName?: string;
  whenCondition?: string;
}

interface ParsedField {
  name: string;
  type: string;
  required: boolean;
  annotations: string[];
  description: string;
}

interface ParsedReturn {
  statusCode: number;
  type: string;
  condition?: string;
  description?: string;
}

// --- Labels & helpers ---

const BLOCK_LABELS: Record<string, string> = {
  'omg.path': 'Path Parameters',
  'omg.query': 'Query Parameters',
  'omg.headers': 'Headers',
  'omg.body': 'Request Body',
  'omg.response': 'Response',
  'omg.returns': 'Returns',
  'omg.example': 'Example',
  'omg.type': 'Type',
  'omg.errors': 'Error Responses',
  'omg.config': 'Configuration',
};

function getLabel(
  blockType: string,
  source: string,
  statusCode?: number,
  exampleName?: string
): string {
  let label = BLOCK_LABELS[blockType] || blockType;

  if (blockType === 'omg.response') {
    label = `Response \u00b7 ${statusCode ?? 200}`;
  } else if (blockType === 'omg.type') {
    const match = source.match(/^type\s+(\w+)/);
    if (match) label = `Type \u00b7 ${match[1]}`;
  } else if (blockType === 'omg.example') {
    if (exampleName) label = `Example \u00b7 ${exampleName}`;
    else if (statusCode) label = `Example \u00b7 ${statusCode}`;
  }

  return label;
}

function getStatusClass(code: number): string {
  if (code < 300) return styles.statusSuccess;
  if (code < 400) return styles.statusRedirect;
  if (code < 500) return styles.statusClientError;
  return styles.statusServerError;
}

// --- Lightweight parsers ---

function parseFields(source: string): ParsedField[] | null {
  const trimmed = source.trim();
  if (!trimmed.startsWith('{')) return null;

  // Find matching closing brace at depth 0
  let depth = 0;
  let end = -1;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '{') depth++;
    if (trimmed[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return null;

  const inner = trimmed.slice(1, end);
  const fields: ParsedField[] = [];

  // Walk character-by-character, splitting on newlines only at brace depth 0
  let braceDepth = 0;
  let currentLine = '';

  for (const ch of inner) {
    if (ch === '{') braceDepth++;
    if (ch === '}') braceDepth--;
    if (ch === '\n' && braceDepth === 0) {
      processFieldLine(currentLine, fields);
      currentLine = '';
    } else {
      currentLine += ch;
    }
  }
  if (currentLine.trim()) processFieldLine(currentLine, fields);

  return fields.length > 0 ? fields : null;
}

function processFieldLine(line: string, fields: ParsedField[]): void {
  const stripped = line.trim();
  if (!stripped || stripped.startsWith('//')) return;

  // Extract inline comment (// ...) not inside a string
  let description = '';
  let content = stripped;
  let inStr = false;
  let strChar = '';

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inStr) {
      if (ch === strChar && content[i - 1] !== '\\') inStr = false;
    } else if (ch === '"' || ch === "'") {
      inStr = true;
      strChar = ch;
    } else if (ch === '/' && content[i + 1] === '/') {
      description = content.slice(i + 2).trim();
      content = content.slice(0, i).trim();
      break;
    }
  }

  // Remove trailing comma
  content = content.replace(/,\s*$/, '').trim();
  if (!content) return;

  // Find first colon not inside braces/brackets
  let colonIdx = -1;
  let d = 0;
  let bk = 0;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') d++;
    if (content[i] === '}') d--;
    if (content[i] === '[') bk++;
    if (content[i] === ']') bk--;
    if (content[i] === ':' && d === 0 && bk === 0) {
      colonIdx = i;
      break;
    }
  }
  if (colonIdx === -1) return;

  let name = content.slice(0, colonIdx).trim();
  let rest = content.slice(colonIdx + 1).trim();

  // Optional marker on name
  let required = true;
  if (name.endsWith('?')) {
    name = name.slice(0, -1).trim();
    required = false;
  }

  // Extract annotations (@min(1), @format("email"), etc.)
  const annotations: string[] = [];
  const annotRe = /@\w+(?:\([^)]*\))?/g;
  let m: RegExpExecArray | null;
  while ((m = annotRe.exec(rest)) !== null) {
    annotations.push(m[0]);
  }
  let type = rest.replace(annotRe, '').trim();

  // Check for default value (= ...)
  const eqMatch = type.match(/\s*=\s*(.+)$/);
  if (eqMatch) {
    type = type.slice(0, eqMatch.index).trim();
    required = false;
  }

  // Optional marker on type
  if (type.endsWith('?')) {
    type = type.slice(0, -1).trim();
    required = false;
  }

  // Clean up whitespace
  type = type.replace(/\s+/g, ' ').trim();

  fields.push({ name, type, required, annotations, description });
}

function parseReturns(source: string): ParsedReturn[] {
  const returns: ParsedReturn[] = [];
  const lines = source.split('\n');
  let current: ParsedReturn | null = null;

  for (const line of lines) {
    const stripped = line.trim();
    if (!stripped) continue;

    const statusMatch = stripped.match(/^(\d{3}):\s*(.+)$/);
    if (statusMatch) {
      if (current) returns.push(current);
      current = {
        statusCode: parseInt(statusMatch[1], 10),
        type: statusMatch[2].trim(),
      };
      continue;
    }

    if (!current) continue;

    const whenMatch = stripped.match(/^when\s+(.+)$/);
    if (whenMatch) {
      current.condition = whenMatch[1];
      continue;
    }

    const descMatch = stripped.match(/^"(.+)"$/);
    if (descMatch) {
      current.description = descMatch[1];
    }
  }

  if (current) returns.push(current);
  return returns;
}

// --- Sub-components ---

function FieldsTable({ fields }: { fields: ParsedField[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th></th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field) => (
          <tr key={field.name}>
            <td className={styles.fieldName}>
              <code>{field.name}</code>
            </td>
            <td className={styles.fieldType}>
              <code>{field.type}</code>
              {field.annotations.length > 0 && (
                <span className={styles.annotations}>
                  {field.annotations.map((a, i) => (
                    <code key={i} className={styles.annotation}>
                      {a}
                    </code>
                  ))}
                </span>
              )}
            </td>
            <td className={styles.fieldRequired}>
              {field.required ? (
                <span className={styles.requiredBadge}>required</span>
              ) : (
                <span className={styles.optionalBadge}>optional</span>
              )}
            </td>
            <td className={styles.fieldDescription}>{field.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ReturnsList({ returns }: { returns: ParsedReturn[] }) {
  return (
    <div className={styles.returnsList}>
      {returns.map((r) => (
        <div key={r.statusCode} className={styles.returnEntry}>
          <span className={`${styles.statusCode} ${getStatusClass(r.statusCode)}`}>
            {r.statusCode}
          </span>
          <div className={styles.returnContent}>
            <code className={styles.returnType}>{r.type}</code>
            {r.condition && (
              <div className={styles.condition}>
                <span className={styles.conditionKeyword}>when</span> {r.condition}
              </div>
            )}
            {r.description && <div className={styles.returnDescription}>{r.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SourceView({ source }: { source: string }) {
  return (
    <pre className={styles.sourceBlock}>
      <code>{source}</code>
    </pre>
  );
}

// --- Main component ---

export default function OmgBlock({
  blockType,
  source,
  statusCode,
  exampleName,
  whenCondition,
}: OmgBlockProps): React.ReactElement {
  const label = getLabel(blockType, source, statusCode, exampleName);

  // Parse based on block type
  const schemaBlockTypes = ['omg.path', 'omg.query', 'omg.headers', 'omg.body', 'omg.response'];

  let fields: ParsedField[] | null = null;
  let returns: ParsedReturn[] | null = null;

  if (schemaBlockTypes.includes(blockType)) {
    fields = parseFields(source);
  } else if (blockType === 'omg.type') {
    const bodyMatch = source.match(/^type\s+\w+\s*(\{[\s\S]*\})\s*$/);
    if (bodyMatch) fields = parseFields(bodyMatch[1]);
  } else if (blockType === 'omg.returns') {
    returns = parseReturns(source);
  }

  const hasStructuredView = fields || (returns && returns.length > 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {whenCondition && <span className={styles.whenBadge}>@when({whenCondition})</span>}
      </div>

      <div className={styles.body}>
        {fields ? (
          <FieldsTable fields={fields} />
        ) : returns && returns.length > 0 ? (
          <ReturnsList returns={returns} />
        ) : (
          <SourceView source={source} />
        )}
      </div>

      {hasStructuredView && (
        <details className={styles.sourceDetails}>
          <summary className={styles.sourceSummary}>View source</summary>
          <pre className={styles.sourceBlock}>
            <code>{source}</code>
          </pre>
        </details>
      )}
    </div>
  );
}
