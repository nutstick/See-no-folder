import { Folder } from './Folder';

export interface Options {
  cwd: string;
}

export interface Workspace {
  getRootPath(): string;
  getType(): string;
  initialize(): Promise<unknown>;
  update(folder: Folder[]): void;
}
