import { describe, it, expect } from 'vitest';
import { parseDocument } from './document-parser.js';

describe('parseDocument', () => {
  describe('@when annotation parsing', () => {
    it('parses @when annotation on omg.body block', () => {
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

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });

    it('parses multiple @when annotations for different variants', () => {
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

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(2);

      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });

      expect(doc.blocks[1].type).toBe('omg.body');
      expect(doc.blocks[1].whenCondition).toEqual({
        field: 'petType',
        value: 'dog',
      });
    });

    it('handles blocks without @when annotation', () => {
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

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toBeUndefined();
    });

    it('parses @when annotation on omg.response block', () => {
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

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });

    it('parses @when annotation with status code', () => {
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

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].statusCode).toBe(201);
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });

    it('parses expandVariants from frontmatter', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.frontMatter).toBeDefined();
      expect((doc.frontMatter as any).expandVariants).toBe('petType');
    });
  });
});
