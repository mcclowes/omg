import { describe, it, expect } from 'vitest';
import { parseDocument } from './document-parser.js';

describe('parseDocument', () => {
  describe('partial parsing', () => {
    it('parses Handlebars-style partial references', () => {
      const content = `---
method: GET
path: /test
---

# Test

{{> params/company }}
{{> responses/errors }}
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('parses OMG-style @ partial references', () => {
      const content = `---
method: GET
path: /test
---

# Test

@params/company
@responses/errors
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('parses mixed partial syntaxes in the same document', () => {
      const content = `---
method: GET
path: /test
---

# Test

{{> params/company }}
@responses/errors
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('tracks correct line numbers for @ partials', () => {
      const content = `---
method: GET
path: /test
---

# Test

Some description.

@params/company
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(1);
      expect(doc.partials[0].path).toBe('params/company');
      // Line number is relative to the markdown content after frontmatter extraction
      expect(doc.partials[0].line).toBe(6);
    });

    it('excludes @ partial references from description', () => {
      const content = `---
method: GET
path: /test
---

# Test

This is the description.

@params/company
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.description).toBe('This is the description.');
      expect(doc.partials).toHaveLength(1);
    });

    it('handles @ partials with underscores and hyphens', () => {
      const content = `---
method: GET
path: /test
---

# Test

@common_params/user-id
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(1);
      expect(doc.partials[0].path).toBe('common_params/user-id');
    });
  });

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
