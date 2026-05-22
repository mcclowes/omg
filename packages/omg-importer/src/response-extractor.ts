/**
 * Response Partial Extractor
 *
 * Detects response blocks that repeat verbatim across many endpoints and lifts
 * them into `partials/responses/*.omg.md`, rewriting each endpoint to
 * reference the partial instead of restating the block inline.
 *
 * Imported specs routinely attach the same boilerplate error responses
 * (401 / 429 / 500 / 503 / default) to every operation; without extraction a
 * 135-endpoint API emits hundreds of byte-identical fenced blocks.
 */

import type { OmgDocument, OmgBlock, PartialRef } from 'omg-parser';

/**
 * Options for response-partial extraction.
 */
export interface ResponseExtractionOptions {
  /** Base directory for output file paths. */
  baseDir: string;
  /** Minimum number of endpoints sharing a response before it is extracted. */
  threshold: number;
}

/** A response block paired with the endpoint document it belongs to. */
interface ResponseOccurrence {
  endpoint: OmgDocument;
  block: OmgBlock;
}

/**
 * Extract verbatim-repeated response blocks into shared partials.
 *
 * Mutates `endpoints` in place: every extracted block is removed from the
 * endpoint and replaced with a `{{> responses/<name> }}` partial reference.
 * Returns the new partial documents keyed by their partial path.
 */
export function extractRepeatedResponses(
  endpoints: OmgDocument[],
  options: ResponseExtractionOptions
): Map<string, OmgDocument> {
  // 1. Group every response block by its structural fingerprint.
  const groups = new Map<string, ResponseOccurrence[]>();
  for (const endpoint of endpoints) {
    for (const block of endpoint.blocks) {
      if (!isResponseBlock(block)) continue;
      const fingerprint = responseFingerprint(block);
      const group = groups.get(fingerprint);
      if (group) {
        group.push({ endpoint, block });
      } else {
        groups.set(fingerprint, [{ endpoint, block }]);
      }
    }
  }

  // 2. Keep only fingerprints shared by at least `threshold` endpoints,
  //    assigning each a stable partial path. Fingerprints are processed in
  //    sorted order so naming is deterministic across runs.
  const fingerprintToPath = new Map<string, string>();
  const partials = new Map<string, OmgDocument>();
  const codeLabelUses = new Map<string, number>();

  for (const fingerprint of [...groups.keys()].sort()) {
    const occurrences = groups.get(fingerprint)!;
    if (occurrences.length < options.threshold) continue;

    const representative = occurrences[0].block;
    const codeLabel = statusCodeLabel(representative.statusCode);

    // Disambiguate when one status code has several distinct response shapes.
    const priorUses = codeLabelUses.get(codeLabel) ?? 0;
    codeLabelUses.set(codeLabel, priorUses + 1);
    const name = priorUses === 0 ? codeLabel : `${codeLabel}-${priorUses + 1}`;
    const partialPath = `responses/${name}`;
    fingerprintToPath.set(fingerprint, partialPath);

    partials.set(partialPath, {
      filePath: `${options.baseDir}/partials/${partialPath}.omg.md`,
      frontMatter: null,
      title: `${capitalize(codeLabel)} response`,
      description: `Shared ${codeLabel} response, reused by ${occurrences.length} endpoints.`,
      blocks: [structuredClone(representative)],
      partials: [],
    });
  }

  if (fingerprintToPath.size === 0) return partials;

  // 3. Rewrite endpoints: drop the extracted inline blocks and append a
  //    partial reference for each. A status code appears at most once per
  //    endpoint, so a given partial is referenced at most once.
  for (const endpoint of endpoints) {
    const newRefs: PartialRef[] = [];
    endpoint.blocks = endpoint.blocks.filter((block) => {
      if (!isResponseBlock(block)) return true;
      const partialPath = fingerprintToPath.get(responseFingerprint(block));
      if (!partialPath) return true;
      newRefs.push({ path: partialPath, line: 0 });
      return false;
    });
    newRefs.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    endpoint.partials.push(...newRefs);
  }

  return partials;
}

/** Whether a block is a response block (any status code). */
function isResponseBlock(block: OmgBlock): boolean {
  return block.type === 'omg.response';
}

/** Human-readable label for a response block's status code. */
function statusCodeLabel(statusCode: OmgBlock['statusCode']): string {
  // `undefined` is the implicit 200 of a suffixless `omg.response` block.
  if (statusCode === undefined) return '200';
  return String(statusCode);
}

function capitalize(str: string): string {
  return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * Stable structural fingerprint of a response block. Two blocks share a
 * fingerprint only when their status code, schema, and response metadata are
 * structurally identical.
 */
function responseFingerprint(block: OmgBlock): string {
  return stableStringify({
    statusCode: block.statusCode ?? 200,
    parsed: block.parsed ?? null,
    parsedResponse: block.parsedResponse ?? null,
  });
}

/** JSON stringify with recursively sorted object keys and `undefined` elided. */
function stableStringify(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return '[' + value.map((item) => stableStringify(item)).join(',') + ']';
  }
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .sort();
  return (
    '{' + keys.map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`).join(',') + '}'
  );
}
