import * as vscode from 'vscode';
import * as path from 'path';
import { getPackages } from '@lerna/project';
import { Options, Workspace } from './interfaces/workspace';
import { PackageJson } from './interfaces/file';
import { Folder } from './interfaces/folder';

export class LernaWorkspace implements Workspace {
  public root: string;
  public folders: Folder[] = [];

  constructor(options: Options) {
    this.root = options.cwd;
  }

  public getRootPath() {
    return this.root;
  }

  public getType() {
    return 'lerna project';
  }

  public async initialize() {
    const config = vscode.workspace.getConfiguration('files', null);
    let excludes = config.get<Record<string, boolean>>('exclude') || {};

    const pkgs = await getPackages(this.root);
    this.folders = pkgs.map(
      (pkg): Folder => {
        const relativePath = path.relative(this.root, pkg.location);
        return {
          root: pkg.location,
          label: pkg.name,
          package: pkg,
          path: relativePath,
          picked: !excludes[relativePath],
        };
      }
    );
  }
  public update(folders: Folder[]) {
    for (const folder of this.folders) {
      const matched = folders.find((f) => f.path === folder.path);
      folder.picked = !!matched;
    }
    const selected = this.folders.filter((p) => p.picked);
    const unselected = this.folders.filter((p) => !p.picked);
    console.log(unselected);

    const config = vscode.workspace.getConfiguration('files', null);
    const excludes =
      config.get<Record<string, void | boolean>>('exclude') || {};

    for (const { path } of selected) {
      if (path && excludes.hasOwnProperty(path)) {
        excludes[path] = undefined;
      }
    }
    for (const { path } of unselected) {
      if (path) {
        excludes[path] = true;
      }
    }
    config.update('exclude', excludes);
  }
}
