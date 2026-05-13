import { build } from 'esbuild';

await build({
  platform: 'node',
  target: 'node18',
  format: 'esm',
  bundle: true,
  external: [
    'js-yaml',
    'omg-parser',
    'vscode-languageserver',
    'vscode-languageserver-textdocument',
  ],
  entryPoints: ['src/server.ts'],
  outfile: 'dist/server.js',
  logLevel: 'info',
});
