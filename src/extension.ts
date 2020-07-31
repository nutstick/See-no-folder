import * as vscode from 'vscode';
// import { ViewPane } from './views/view-pane';
import { LernaWorkspace } from './lerna-workspace';
import { Folder } from './interfaces/Folder';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const cwd = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (cwd) {
    const workspace = new LernaWorkspace({ cwd });
    // const pane = new ViewPane('see-no-folder.pane.items');

    vscode.commands.executeCommand('setContext', 'see-no-folder:enabled', true);

    workspace.initialize().then(() => {
      vscode.window.showInformationMessage(
        `See no folder: identified ${workspace.getType()} project`
      );
    });

    const exclude = vscode.commands.registerCommand(
      'see-no-folder.select',
      () => {
        vscode.window
          .showQuickPick<Folder>(
            workspace.folders
              .map((p) => {
                return {
                  ...p,
                  label: `📦 ${p.label}`,
                  description: `at ${p.path}`,
                  root: p.root,
                };
              })
              .sort((a, b) => a.root.localeCompare(b.root)),
            {
              canPickMany: true,
              placeHolder: 'Focus on a folders',
            }
          )
          .then((selected) => {
            if (selected) {
              workspace.update(selected);
            }
          });
      }
    );

    context.subscriptions.push(exclude);
  }
}

export function deactivate() {}
