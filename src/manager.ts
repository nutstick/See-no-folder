import * as vscode from 'vscode';
import * as path from 'path';
import { Folder } from './interfaces/folder';
import { Workspace } from './interfaces/workspace';
import { LernaWorkspace } from './lerna-workspace';

export class FolderManger {
  public workspace?: Workspace;

  constructor() {
    const cwd = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (cwd) {
      this.workspace = new LernaWorkspace({ cwd });
    }
  }

  public async initialize() {
    if (this.workspace) {
      await this.workspace.initialize();
      return this.workspace;
    }
  }

  public getFolders(): vscode.QuickPickItem[] {
    return [];
    // const { workspace } = this;
    // if (workspace) {
    //   const folders = workspace.getFolders();
    //   // const rootPkg = workspace.getPackageForRoot(workspace.root);
    //   return [
    //     // {
    //     //   label: `${getFolderEmoji(workspace.root, workspace.root)}${
    //     //     rootPkg || 'root'
    //     //   }`,
    //     //   description: `${
    //     //     workspace.type[0].toUpperCase() + workspace.type.slice(1)
    //     //   } Workspace Root`,
    //     //   root: Uri.file(workspace.root),
    //     //   isRoot: true,
    //     // },
    //     ...folders
    //       .map((p) => {
    //         return {
    //           label: `📦 ${p.label}`,
    //           description: `at ${path.relative(
    //             workspace.getRootPath(),
    //             p.root
    //           )}`,
    //           root: p.root,
    //         };
    //       })
    //       .sort((a, b) => a.root.localeCompare(b.root)),
    //   ];
    // }
    // return [];
  }

  // private extractExcluded(configPath: string): string[] {
  //   if (!!configPath) {
  //     const appSettings = readJsonSync(`${workspace.rootPath}\\${configPath}`);
  //     return appSettings.exclude || [];
  //   }
  //   return [];
  // }

  // private extractIncluded(configPath: string): string[] {
  //   if (!!configPath) {
  //     const appSettings = readJsonSync(`${workspace.rootPath}\\${configPath}`);
  //     return appSettings.include || [];
  //   }
  //   return [];
  // }

  // private extractAppConfigPath(ngConfig: any): string {
  //   return ngConfig.architect.build
  //     ? ngConfig.architect.build.options.tsConfig
  //     : undefined;
  // }

  // private extractTestConfigPath(ngConfig: any): string {
  //   return ngConfig.architect.test
  //     ? ngConfig.architect.test.options.tsConfig
  //     : undefined;
  // }

  // private extractDependencies(ngConfig: any): string[] {
  //   const assets =
  //     ngConfig.architect.build &&
  //     ngConfig.architect.build.options &&
  //     ngConfig.architect.build.options.assets
  //       ? ngConfig.architect.build.options.assets
  //       : [];
  //   const styles =
  //     ngConfig.architect.build &&
  //     ngConfig.architect.build.options &&
  //     ngConfig.architect.build.options.styles
  //       ? ngConfig.architect.build.options.styles
  //       : [];
  //   const scripts =
  //     ngConfig.architect.build &&
  //     ngConfig.architect.build.options &&
  //     ngConfig.architect.build.options.scripts
  //       ? ngConfig.architect.build.options.scripts
  //       : [];
  //   const tsConfig =
  //     ngConfig.architect.build && ngConfig.architect.build.options
  //       ? [ngConfig.architect.build.options.tsConfig]
  //       : [];

  //   return [...tsConfig, ...assets, ...styles, ...scripts];
  // }
}
