"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const document_parser_js_1 = require("./document-parser.js");
(0, vitest_1.describe)('parseDocument', () => {
    (0, vitest_1.describe)('@when annotation parsing', () => {
        (0, vitest_1.it)('parses @when annotation on omg.body block', () => {
            const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer
}
\`\`\`
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.blocks).toHaveLength(1);
            (0, vitest_1.expect)(doc.blocks[0].type).toBe('omg.body');
            (0, vitest_1.expect)(doc.blocks[0].whenCondition).toEqual({
                field: 'petType',
                value: 'cat',
            });
        });
        (0, vitest_1.it)('parses multiple @when annotations for different variants', () => {
            const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer
}
\`\`\`

\`\`\`omg.body @when(petType = "dog")
{
  name: string,
  barkVolume: integer
}
\`\`\`
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.blocks).toHaveLength(2);
            (0, vitest_1.expect)(doc.blocks[0].type).toBe('omg.body');
            (0, vitest_1.expect)(doc.blocks[0].whenCondition).toEqual({
                field: 'petType',
                value: 'cat',
            });
            (0, vitest_1.expect)(doc.blocks[1].type).toBe('omg.body');
            (0, vitest_1.expect)(doc.blocks[1].whenCondition).toEqual({
                field: 'petType',
                value: 'dog',
            });
        });
        (0, vitest_1.it)('handles blocks without @when annotation', () => {
            const content = `---
method: POST
path: /pets
---

# Create Pet

\`\`\`omg.body
{
  name: string
}
\`\`\`
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.blocks).toHaveLength(1);
            (0, vitest_1.expect)(doc.blocks[0].type).toBe('omg.body');
            (0, vitest_1.expect)(doc.blocks[0].whenCondition).toBeUndefined();
        });
        (0, vitest_1.it)('parses @when annotation on omg.response block', () => {
            const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.response @when(petType = "cat")
{
  id: uuid,
  type: "cat"
}
\`\`\`
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.blocks).toHaveLength(1);
            (0, vitest_1.expect)(doc.blocks[0].type).toBe('omg.response');
            (0, vitest_1.expect)(doc.blocks[0].whenCondition).toEqual({
                field: 'petType',
                value: 'cat',
            });
        });
        (0, vitest_1.it)('parses @when annotation with status code', () => {
            const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.response.201 @when(petType = "cat")
{
  id: uuid
}
\`\`\`
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.blocks).toHaveLength(1);
            (0, vitest_1.expect)(doc.blocks[0].type).toBe('omg.response');
            (0, vitest_1.expect)(doc.blocks[0].statusCode).toBe(201);
            (0, vitest_1.expect)(doc.blocks[0].whenCondition).toEqual({
                field: 'petType',
                value: 'cat',
            });
        });
        (0, vitest_1.it)('parses expandVariants from frontmatter', () => {
            const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet
`;
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            (0, vitest_1.expect)(doc.frontMatter).toBeDefined();
            (0, vitest_1.expect)(doc.frontMatter.expandVariants).toBe('petType');
        });
    });
});
//# sourceMappingURL=document-parser.test.js.map