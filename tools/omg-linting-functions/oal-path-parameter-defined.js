/**
 * Validates path parameters in OAL paths.
 *
 * @param {string} path - The API path
 * @param {object} options - Function options
 * @param {string} options.casing - Expected casing for parameters (camelCase, snake_case, etc.)
 */
export default function oalPathParameterDefined(path, options = {}) {
  const results = [];

  if (!path || typeof path !== 'string') {
    return results;
  }

  // Extract path parameters
  const paramRegex = /\{([^}]+)\}/g;
  let match;

  while ((match = paramRegex.exec(path)) !== null) {
    const param = match[1];

    // Check casing
    if (options.casing === 'camelCase') {
      const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
      if (!camelCasePattern.test(param)) {
        results.push({
          message: `Path parameter '{${param}}' should be camelCase (e.g., 'companyId', 'accountId').`,
        });
      }
    } else if (options.casing === 'snake_case') {
      const snakeCasePattern = /^[a-z][a-z0-9_]*$/;
      if (!snakeCasePattern.test(param)) {
        results.push({
          message: `Path parameter '{${param}}' should be snake_case.`,
        });
      }
    }

    // Check for common naming conventions
    if (param.toLowerCase().endsWith('id') && !param.endsWith('Id') && options.casing === 'camelCase') {
      results.push({
        message: `Path parameter '{${param}}' should use 'Id' suffix (e.g., '${param.slice(0, -2)}Id').`,
      });
    }
  }

  return results;
}
