/**
 * Validates enum values in OAL schemas.
 *
 * @param {object} field - The field object from parsed OAL
 * @param {object} options - Function options
 * @param {number} options.minValues - Minimum number of enum values
 * @param {string[]} options.casing - Allowed casing styles
 */
export default function oalEnumValues(field, options = {}) {
  const results = [];

  if (!field || typeof field !== 'object') {
    return results;
  }

  // Check if field is an enum (has enum values or is a union of string literals)
  const enumValues = extractEnumValues(field);

  if (!enumValues || enumValues.length === 0) {
    return results;
  }

  // Check minimum values
  const minValues = options.minValues || 2;
  if (enumValues.length < minValues) {
    results.push({
      message: `Enum should have at least ${minValues} values. Found ${enumValues.length}.`,
    });
  }

  // Check casing consistency
  if (options.casing && options.casing.length > 0) {
    const casingPatterns = {
      PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
      camelCase: /^[a-z][a-zA-Z0-9]*$/,
      CONSTANT_CASE: /^[A-Z][A-Z0-9_]*$/,
      'kebab-case': /^[a-z][a-z0-9-]*$/,
      snake_case: /^[a-z][a-z0-9_]*$/,
    };

    for (const value of enumValues) {
      const matchesCasing = options.casing.some((casing) => {
        const pattern = casingPatterns[casing];
        return pattern && pattern.test(value);
      });

      if (!matchesCasing) {
        results.push({
          message: `Enum value '${value}' should use ${options.casing.join(' or ')} casing.`,
        });
      }
    }
  }

  // Check for duplicates
  const seen = new Set();
  for (const value of enumValues) {
    const lower = value.toLowerCase();
    if (seen.has(lower)) {
      results.push({
        message: `Enum has duplicate value '${value}' (case-insensitive).`,
      });
    }
    seen.add(lower);
  }

  return results;
}

/**
 * Extract enum values from a field definition
 */
function extractEnumValues(field) {
  // Handle explicit enum
  if (field.enum && Array.isArray(field.enum)) {
    return field.enum;
  }

  // Handle union type string: "Active" | "Archived" | "Unknown"
  const type = field.type || '';
  if (typeof type === 'string' && type.includes('|')) {
    const values = type
      .split('|')
      .map((v) => v.trim())
      .filter((v) => v.startsWith('"') && v.endsWith('"'))
      .map((v) => v.slice(1, -1)); // Remove quotes

    if (values.length > 0) {
      return values;
    }
  }

  // Handle parsed enum values
  if (field.values && Array.isArray(field.values)) {
    return field.values.map((v) => (typeof v === 'object' ? v.name || v.value : v));
  }

  return null;
}
