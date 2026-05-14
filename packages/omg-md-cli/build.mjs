import { build } from 'esbuild';

const external = [
  'commander',
  'chalk',
  'chokidar',
  'yaml',
  'js-yaml',
  'vague-lang',
  'express',
  'cors',
  'omg-parser',
  'omg-compiler',
];

const common = {
  platform: 'node',
  target: 'node18',
  format: 'esm',
  bundle: true,
  external,
  logLevel: 'info',
};

await build({
  ...common,
  entryPoints: ['src/cli.ts'],
  outfile: 'dist/cli.js',
});

await build({
  ...common,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
});
