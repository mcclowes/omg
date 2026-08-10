import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument, resolveDocument, type ResolvedDocument } from 'omg-parser';

export function resolveTextDocument(
  text: string,
  uri: string,
  fallbackBasePath = '.'
): ResolvedDocument {
  let basePath = fallbackBasePath;
  let documentPath = uri;

  try {
    const filePath = fileURLToPath(uri);
    basePath = path.dirname(filePath);
    documentPath = path.basename(filePath);
  } catch {
    // Non-file documents use the workspace as their resolution base.
  }

  const document = parseDocument(text, documentPath);

  return resolveDocument(document, { basePath });
}
