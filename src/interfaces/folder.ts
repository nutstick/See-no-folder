import { QuickPickItem } from 'vscode';

export interface Folder extends QuickPickItem {
  root: string;
  package: any;
  path: string;
}
