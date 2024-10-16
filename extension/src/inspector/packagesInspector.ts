import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { installPackageConda, installPackagePip, checkPackageCode } from "./codes/utils";
import { BaseInspector } from "./baseInspector";


var checkedPackages: Record<string, Record<string, string>> = {};

var notebookPackageManager: Record<string, 'conda' | 'pip'> = {};

export class PackagesInspector extends BaseInspector {

  private _setInstalledPackages: (pkgs: Record<string, string>) => void;
  private _setInstallationLog: (installLog: string) => void;

  constructor(nb: NotebookPanel | null,
    setInstalledPackages: (pkgs: Record<string, string>) => void,
    setInstallationLog: (installLog: string) => void) {
    super(nb);
    this._setInstalledPackages = setInstalledPackages;
    this._setInstallationLog = setInstallationLog;
  }

  checkPackage(pkgInstallName: string, pkgImportName: string): void {

    this.checkPackageManager();

    if (this._notebookId) {
      if (this._notebookId in checkedPackages && pkgImportName in checkedPackages[this._notebookId]) {
        // const version = checkedPackages[this._notebookId][pkg];
        this._setInstalledPackages(checkedPackages[this._notebookId]);
      } else {
        let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
          code: checkPackageCode(pkgInstallName, pkgImportName),
          store_history: false,
        });
        if (future) {
          future.onIOPub = this._onCheckPackage;
        }
      }
    }

  }

  private _onCheckPackage = (msg: KernelMessage.IIOPubMessage): void => {

    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'stream':
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':
        interface ContentData {
          text: string;
        }
        const content = msg.content as ContentData;

        interface IPackage {
          package: string;
          version: string;
        }
        try {
          const p: IPackage = JSON.parse(content.text);
          if (this._notebookId) {
            if (!(this._notebookId in checkedPackages)) {
              checkedPackages[this._notebookId] = { [p.package]: p.version }
            } else {
              checkedPackages[this._notebookId][p.package] = p.version;
            }
            this._setInstalledPackages(checkedPackages[this._notebookId]);
          }
        } catch (e) {
          console.log(e);
        }

        break;
      default:
        break;
    }
    return;
  };


  installPackage(installationName: string, importName: string) {
    let packageManager: 'conda' | 'pip' = 'conda';
    if (this._notebookId && this._notebookId in notebookPackageManager) {
      packageManager = notebookPackageManager[this._notebookId];
    }

    this._installPackagePackageManager(installationName, importName, packageManager);
  }

  private _installPackagePackageManager(installationName: string, importName: string, packageManager: 'conda' | 'pip') {
    // console.log('Install', importName, 'with', packageManager);
    if (this._notebookId) {
      if (!(this._notebookId in checkedPackages)) {
        checkedPackages[this._notebookId] = { [importName]: 'install' }
      } else {
        checkedPackages[this._notebookId][importName] = 'install';
      }
      this._setInstalledPackages(checkedPackages[this._notebookId]);
    }

    let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
      code: packageManager === 'conda' ? installPackageConda(installationName) : installPackagePip(installationName),
      store_history: false,
    });
    if (future) {
      // will be needed to collect logs from installation
      future.onIOPub = this._onInstallPackage;
      future.done.then(() => {
        if (this._notebookId && this._notebookId in checkedPackages) {
          // delete all packages, we need to re-check all packages again
          // there might be dependencies
          delete checkedPackages[this._notebookId]; //[importName];
          this.checkPackage(installationName, importName);
          this._setInstallationLog("");
        }
      })
    }
  }


  private _onInstallPackage = (msg: KernelMessage.IIOPubMessage): void => {
    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'stream':
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':
        interface ContentData {
          name: string;
          text: string;
        }
        const content = msg.content as ContentData;
        this._setInstallationLog(content.text);
        break;
      default:
        break;
    }
    return;
  };
}
