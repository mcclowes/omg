import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OMG',
  tagline: 'OpenAPI Markdown Grammar - A human-first DSL for API specification',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.omg.gs',
  baseUrl: '/',

  organizationName: 'mcclowes',
  projectName: 'omg',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mcclowes/omg/tree/main/docusaurus/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/omg-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'OMG Logo',
        src: 'img/omg.svg',
        srcDark: 'img/omg-light.svg',
        width: 80,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Examples',
          position: 'left',
          items: [
            {
              label: 'PokéAPI',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/pokeapi',
            },
            {
              label: 'Payments API',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/payments-api',
            },
            {
              label: 'Todo API',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/todo-api',
            },
          ],
        },
        {
          href: 'https://github.com/mcclowes/omg',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Syntax Reference',
              to: '/docs/syntax',
            },
            {
              label: 'CLI Reference',
              to: '/docs/cli',
            },
          ],
        },
        {
          title: 'Examples',
          items: [
            {
              label: 'PokéAPI',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/pokeapi',
            },
            {
              label: 'Payments API',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/payments-api',
            },
            {
              label: 'Todo API',
              href: 'https://github.com/mcclowes/omg/tree/main/examples/todo-api',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mcclowes/omg',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/omg-md-cli',
            },
            {
              label: 'VS Code Extension',
              href: 'https://marketplace.visualstudio.com/items?itemName=mcclowes.omg-vscode',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OMG. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['yaml', 'markdown', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
