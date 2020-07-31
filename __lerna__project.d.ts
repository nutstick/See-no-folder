declare module '__@lerna/project' {
  interface PackageJson {}

  interface Package {}

  interface Finder {}

  class Project {
    static getPackages(cwd: string): Promise<Package[]>;
    static getPackagesSync(cwd: string): Package[];

    version: string;
    packageConfigs: string[];
    packageParentDirs: string[];
    manifest: PackageJson;
    licensePath: string;
    fileFinder: Finder;
    constructor(cwd: string);
    getPackages(): Promise<Package[]>;
    getPackagesSync(): Package[];
    getPackageLicensePaths(): string[];
    isIndependent(): boolean;
    serializeConfig(): Promise<string>;
  }

  export = Project;
}
