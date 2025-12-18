/**
 * Validates that types used in OAL are valid.
 *
 * @param {string} type - The type string
 * @param {object} options - Function options
 * @param {string[]} options.additionalTypes - Additional valid type names
 */
export default function oalTypeValid(type, options = {}) {
  const results = [];

  if (!type || typeof type !== 'string') {
    return results;
  }

  // Built-in OAL primitive types
  const primitiveTypes = [
    'string',
    'integer',
    'int',
    'number',
    'decimal',
    'boolean',
    'bool',
    'date',
    'datetime',
    'uuid',
    'uri',
    'email',
    'binary',
    'any',
    'null',
    'void',
  ];

  // Built-in format types (shorthand)
  const formatTypes = ['date-time', 'date', 'time', 'email', 'uri', 'uuid', 'binary'];

  // Additional types from options
  const additionalTypes = options.additionalTypes || [];

  // All valid types
  const allValidTypes = new Set([...primitiveTypes, ...formatTypes, ...additionalTypes]);

  // Parse the type string
  const typeToCheck = normalizeType(type);

  // If it's a union type, check each part
  if (type.includes('|')) {
    const parts = type.split('|').map((p) => p.trim());
    for (const part of parts) {
      // String literals in unions are valid (e.g., "Active" | "Archived")
      if (part.startsWith('"') && part.endsWith('"')) {
        continue;
      }
      // null is valid in unions
      if (part === 'null') {
        continue;
      }
      // Check if the base type is valid
      const basePart = normalizeType(part);
      if (!isValidType(basePart, allValidTypes)) {
        results.push({
          message: `Unknown type '${basePart}' in union. Valid types: ${primitiveTypes.join(', ')}.`,
        });
      }
    }
    return results;
  }

  // Check single type
  if (!isValidType(typeToCheck, allValidTypes)) {
    // Allow custom types (PascalCase indicates a custom type reference)
    if (/^[A-Z][a-zA-Z0-9]*$/.test(typeToCheck)) {
      // This looks like a custom type reference, which is valid
      return results;
    }

    // Allow array notation
    if (typeToCheck.endsWith('[]')) {
      return results;
    }

    // Allow object notation
    if (typeToCheck.startsWith('{') || typeToCheck.startsWith('[{')) {
      return results;
    }

    results.push({
      message: `Unknown type '${typeToCheck}'. Valid types: ${primitiveTypes.join(', ')}.`,
    });
  }

  return results;
}

/**
 * Normalize a type string for comparison
 */
function normalizeType(type) {
  // Remove array notation
  let normalized = type.replace(/\[\]$/, '');

  // Remove optional marker
  normalized = normalized.replace(/\?$/, '');

  // Remove annotations
  normalized = normalized.replace(/@\w+\([^)]*\)/g, '').trim();

  // Handle nullable
  normalized = normalized.replace(/\s*\|\s*null\s*$/, '');

  return normalized.trim();
}

/**
 * Check if a type is valid
 */
function isValidType(type, validTypes) {
  // Direct match
  if (validTypes.has(type)) {
    return true;
  }

  // Case-insensitive match
  const lowerType = type.toLowerCase();
  for (const valid of validTypes) {
    if (valid.toLowerCase() === lowerType) {
      return true;
    }
  }

  return false;
}
