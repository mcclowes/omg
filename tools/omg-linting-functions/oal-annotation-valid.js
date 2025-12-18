/**
 * Validates OAL annotations and method-specific rules.
 *
 * @param {object} target - The target object (field or document)
 * @param {object} options - Function options
 * @param {string} options.rule - The specific rule to check
 */
export default function oalAnnotationValid(target, options = {}) {
  const results = [];

  if (!target || typeof target !== 'object') {
    return results;
  }

  const rule = options.rule;

  switch (rule) {
    case 'min-less-than-max': {
      const min = getAnnotationValue(target, 'min');
      const max = getAnnotationValue(target, 'max');
      if (min !== null && max !== null && min >= max) {
        results.push({
          message: `@min value (${min}) should be less than @max value (${max}).`,
        });
      }
      break;
    }

    case 'minLength-less-than-maxLength': {
      const min = getAnnotationValue(target, 'minLength');
      const max = getAnnotationValue(target, 'maxLength');
      if (min !== null && max !== null && min >= max) {
        results.push({
          message: `@minLength value (${min}) should be less than @maxLength value (${max}).`,
        });
      }
      break;
    }

    case 'minItems-less-than-maxItems': {
      const min = getAnnotationValue(target, 'minItems');
      const max = getAnnotationValue(target, 'maxItems');
      if (min !== null && max !== null && min >= max) {
        results.push({
          message: `@minItems value (${min}) should be less than @maxItems value (${max}).`,
        });
      }
      break;
    }

    case 'decimal-for-money': {
      const name = target.name || target.key || '';
      const type = target.type || '';
      const moneyFields = [
        'amount',
        'price',
        'cost',
        'total',
        'subtotal',
        'tax',
        'balance',
        'fee',
        'rate',
      ];
      const isMoneyField = moneyFields.some((f) => name.toLowerCase().includes(f));

      if (isMoneyField && type !== 'decimal' && !type.includes('decimal')) {
        results.push({
          message: `Field '${name}' appears to be monetary but uses '${type}'. Consider using 'decimal' type.`,
        });
      }
      break;
    }

    case 'get-no-body': {
      const method = target.frontMatter?.method;
      const blocks = target.resolvedBlocks || target.blocks || [];
      const hasBody = blocks.some((b) => b.type === 'oal.body');

      if (method === 'GET' && hasBody) {
        results.push({
          message: 'GET requests should not have a request body. Use query parameters instead.',
        });
      }
      break;
    }

    case 'post-put-has-body': {
      const method = target.frontMatter?.method;
      const blocks = target.resolvedBlocks || target.blocks || [];
      const hasBody = blocks.some((b) => b.type === 'oal.body');

      if ((method === 'POST' || method === 'PUT') && !hasBody) {
        results.push({
          message: `${method} requests typically need a request body. Consider adding an oal.body block.`,
        });
      }
      break;
    }

    case 'pagination-params': {
      const blocks = target.resolvedBlocks || target.blocks || [];
      const queryBlock = blocks.find((b) => b.type === 'oal.query');

      if (queryBlock && queryBlock.parsed) {
        const fields = queryBlock.parsed.fields || [];
        const hasPage = fields.some((f) => f.name === 'page' || f.key === 'page');
        const hasPageSize = fields.some((f) => f.name === 'pageSize' || f.key === 'pageSize');

        if (hasPage && !hasPageSize) {
          results.push({
            message:
              "Query has 'page' parameter but missing 'pageSize'. Add pageSize for consistent pagination.",
          });
        }
        if (!hasPage && hasPageSize) {
          results.push({
            message:
              "Query has 'pageSize' parameter but missing 'page'. Add page for consistent pagination.",
          });
        }
      }
      break;
    }

    case 'list-needs-pagination': {
      const operationId = target.frontMatter?.operationId || '';
      if (operationId.startsWith('list-')) {
        const blocks = target.resolvedBlocks || target.blocks || [];
        const queryBlock = blocks.find((b) => b.type === 'oal.query');

        if (!queryBlock) {
          results.push({
            message:
              "List endpoint should include pagination query parameters. Add an oal.query block with 'page' and 'pageSize'.",
          });
        } else if (queryBlock.parsed) {
          const fields = queryBlock.parsed.fields || [];
          const hasPage = fields.some((f) => f.name === 'page' || f.key === 'page');
          const hasPageSize = fields.some((f) => f.name === 'pageSize' || f.key === 'pageSize');

          if (!hasPage || !hasPageSize) {
            results.push({
              message: "List endpoint should include 'page' and 'pageSize' query parameters.",
            });
          }
        }
      }
      break;
    }

    default:
      break;
  }

  return results;
}

/**
 * Helper to extract annotation value from a field
 */
function getAnnotationValue(field, annotationName) {
  if (!field.annotations) return null;

  const annotation = field.annotations.find(
    (a) => a.name === annotationName || a.name === `@${annotationName}`
  );

  if (annotation && annotation.args && annotation.args.length > 0) {
    return annotation.args[0];
  }

  return null;
}
