/**
 * OMG VS Code Extension
 *
 * Activates the OMG Language Server for .omg.md files.
 */

import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext): void {
  // Path to the LSP server (bundled in the extension)
  const serverModule = context.asAbsolutePath(
    path.join('server', 'server.js')
  );

  // Server options - run in Node.js
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--inspect=6009'],
      },
    },
  };

  // Client options
  const clientOptions: LanguageClientOptions = {
    // Register for OMG files
    documentSelector: [
      { scheme: 'file', language: 'omg-md' },
      { scheme: 'file', language: 'omg' },
      { scheme: 'file', pattern: '**/*.omg.md' },
    ],
    synchronize: {
      // Notify server about file changes to .spectral config files
      fileEvents: workspace.createFileSystemWatcher('**/.spectral-omg.yaml'),
    },
  };

  // Create and start the client
  client = new LanguageClient(
    'omgLanguageServer',
    'OMG Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client (also starts the server)
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
