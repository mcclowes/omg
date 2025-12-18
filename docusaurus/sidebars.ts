import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Syntax',
      items: [
        'syntax/index',
        'syntax/frontmatter',
        'syntax/code-blocks',
        'syntax/types',
        'syntax/annotations',
        'syntax/partials',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'cli/index',
        'cli/build',
        'cli/parse',
        'cli/lint',
        'cli/init',
      ],
    },
    'examples',
  ],
};

export default sidebars;
