/**
 * Validates that OAL documents have required response definitions.
 *
 * @param {object} document - The parsed OAL document
 * @param {object} options - Function options
 * @param {boolean} options.requireSuccess - Require a 2xx success response
 * @param {boolean} options.checkExamples - Check for example blocks
 */
export default function oalResponseRequired(document, options = {}) {
  const results = [];

  if (!document || typeof document !== 'object') {
    return results;
  }

  const blocks = document.resolvedBlocks || document.blocks || [];

  // Check for any response block
  const responseBlocks = blocks.filter((b) => b.type && b.type.startsWith('oal.response'));

  if (responseBlocks.length === 0) {
    results.push({
      message: 'No response block defined. Add an oal.response block.',
    });
    return results;
  }

  // Check for success response (2xx)
  if (options.requireSuccess) {
    const successResponses = responseBlocks.filter((b) => {
      // oal.response (default is 200)
      if (b.type === 'oal.response') return true;
      // oal.response.200, oal.response.201, etc.
      const statusMatch = b.type.match(/oal\.response\.(\d+)/);
      if (statusMatch) {
        const status = parseInt(statusMatch[1], 10);
        return status >= 200 && status < 300;
      }
      return false;
    });

    if (successResponses.length === 0) {
      results.push({
        message: 'No success response (2xx) defined. Add oal.response.200 or oal.response.201.',
      });
    }
  }

  // Check for examples
  if (options.checkExamples) {
    const exampleBlocks = blocks.filter((b) => b.type && b.type.startsWith('oal.example'));

    if (exampleBlocks.length === 0) {
      results.push({
        message: 'No example block defined. Consider adding an oal.example block.',
      });
    }
  }

  return results;
}
