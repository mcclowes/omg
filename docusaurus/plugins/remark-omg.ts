import type { Root, Code } from 'mdast';
import type { Plugin } from 'unified';

interface MdxJsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value: string | MdxJsxAttributeValueExpression;
}

interface MdxJsxAttributeValueExpression {
  type: 'mdxJsxAttributeValueExpression';
  value: string;
  data: {
    estree: {
      type: 'Program';
      body: Array<{
        type: 'ExpressionStatement';
        expression: {
          type: 'Literal';
          value: unknown;
          raw: string;
        };
      }>;
      sourceType: 'module';
      comments: never[];
    };
  };
}

function makeLiteral(value: unknown): MdxJsxAttributeValueExpression {
  return {
    type: 'mdxJsxAttributeValueExpression',
    value: JSON.stringify(value),
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value,
              raw: JSON.stringify(value),
            },
          },
        ],
        sourceType: 'module',
        comments: [],
      },
    },
  };
}

const remarkOmg: Plugin<[], Root> = () => {
  return async (ast) => {
    const { visit } = await import('unist-util-visit');

    visit(ast, 'code', (node: Code, index, parent) => {
      if (!node.lang || !node.lang.startsWith('omg.')) return;
      if (parent === undefined || index === undefined) return;

      let blockType = node.lang;
      const source = node.value;
      const meta = node.meta || '';

      // Extract status code: omg.response.201 -> blockType=omg.response, statusCode=201
      let statusCode: number | undefined;
      const codeMatch = blockType.match(/^(omg\.(?:response|example))\.(\d{3})$/);
      if (codeMatch) {
        blockType = codeMatch[1];
        statusCode = parseInt(codeMatch[2], 10);
      }

      // Extract example name: omg.example.success -> exampleName=success
      let exampleName: string | undefined;
      if (!codeMatch) {
        const nameMatch = blockType.match(/^(omg\.example)\.(\w+)$/);
        if (nameMatch) {
          blockType = nameMatch[1];
          exampleName = nameMatch[2];
        }
      }

      // Extract @when condition from meta string
      let whenCondition: string | undefined;
      const whenMatch = meta.match(/@when\((.+?)\)/);
      if (whenMatch) {
        whenCondition = whenMatch[1];
      }

      // Build mdxJsxFlowElement attributes
      const attributes: MdxJsxAttribute[] = [
        { type: 'mdxJsxAttribute', name: 'blockType', value: blockType },
        {
          type: 'mdxJsxAttribute',
          name: 'source',
          value: makeLiteral(source),
        },
      ];

      if (statusCode !== undefined) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'statusCode',
          value: makeLiteral(statusCode),
        });
      }
      if (exampleName) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'exampleName',
          value: exampleName,
        });
      }
      if (whenCondition) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'whenCondition',
          value: whenCondition,
        });
      }

      // Replace the code node with an MDX JSX element
      (parent.children as any[])[index] = {
        type: 'mdxJsxFlowElement',
        name: 'OmgBlock',
        attributes,
        children: [],
        data: { _mdxExplicitJsx: true },
      };
    });
  };
};

export default remarkOmg;
