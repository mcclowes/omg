/**
 * Validates property naming casing conventions in OAL schemas.
 *
 * @param {object} field - The field object from parsed OAL
 * @param {object} options - Function options
 * @param {string} options.casing - Expected casing (camelCase, snake_case, PascalCase)
 */
export default function oalPropertyCasing(field, options = {}) {
  const results = [];

  if (!field || typeof field !== 'object') {
    return results;
  }

  const name = field.name || field.key;
  if (!name || typeof name !== 'string') {
    return results;
  }

  // Skip special fields
  if (name.startsWith('_') || name.startsWith('$')) {
    return results;
  }

  const casing = options.casing || 'camelCase';

  const patterns = {
    camelCase: /^[a-z][a-zA-Z0-9]*$/,
    snake_case: /^[a-z][a-z0-9_]*$/,
    PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
    'kebab-case': /^[a-z][a-z0-9-]*$/,
  };

  const pattern = patterns[casing];
  if (pattern && !pattern.test(name)) {
    results.push({
      message: `Property '${name}' should be ${casing}.`,
      path: ['name'],
    });
  }

  return results;
}
