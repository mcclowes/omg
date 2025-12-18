/**
 * Validates operationId format and conventions.
 *
 * @param {string} operationId - The operationId value
 * @param {object} options - Function options
 * @param {string} options.pattern - Regex pattern to match
 * @param {boolean} options.requireVerb - Whether to require a verb prefix
 */
export default function oalOperationidFormat(operationId, options = {}) {
  const results = [];

  if (!operationId || typeof operationId !== 'string') {
    return results;
  }

  // Check kebab-case pattern
  const kebabCasePattern = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
  if (!kebabCasePattern.test(operationId)) {
    results.push({
      message: `operationId '${operationId}' should be kebab-case (e.g., 'list-accounts', 'create-invoice').`,
    });
  }

  // Check for verb prefix if required
  if (options.requireVerb !== false) {
    const verbPrefixes = [
      'list',
      'get',
      'create',
      'update',
      'delete',
      'patch',
      'search',
      'sync',
      'push',
      'pull',
      'upload',
      'download',
      'validate',
      'check',
      'refresh',
      'cancel',
      'archive',
      'restore',
      'export',
      'import',
    ];

    const hasVerbPrefix = verbPrefixes.some(
      (verb) => operationId === verb || operationId.startsWith(`${verb}-`)
    );

    if (!hasVerbPrefix) {
      results.push({
        message: `operationId '${operationId}' should start with a verb (${verbPrefixes.slice(0, 5).join(', ')}, etc.).`,
      });
    }
  }

  return results;
}
