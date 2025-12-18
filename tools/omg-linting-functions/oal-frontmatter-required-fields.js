/**
 * Validates that required fields are present in OAL front matter.
 *
 * @param {object} frontMatter - The front matter object from parsed OAL
 * @param {object} options - Function options
 * @param {string[]} options.required - List of required field names
 */
export default function oalFrontmatterRequiredFields(frontMatter, options = {}) {
  const results = [];

  if (!frontMatter || typeof frontMatter !== 'object') {
    return [
      {
        message: 'Front matter is missing or invalid.',
      },
    ];
  }

  const required = options.required || ['method', 'path', 'operationId'];

  for (const field of required) {
    if (!frontMatter[field]) {
      results.push({
        message: `Missing required field '${field}' in front matter.`,
        path: ['frontMatter', field],
      });
    }
  }

  return results;
}
