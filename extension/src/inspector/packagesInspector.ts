import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { checkPackageCode, installPackageConda, installPackagePip } from "./codes/utils";
import { BaseInspector } from "./baseInspector";


var checkedPackages: Record<string, Record<string, string>> = {};

export class PackagesInspector extends BaseInspector {

  private _setAvailablePackages: (pkgs: Record<string, string>) => void;
  private _setInstallationLog: (installLog: string) => void;

  constructor(nb: NotebookPanel | null,
    setAvailablePackages: (pkgs: Record<string, string>) => void,
    setInstallationLog: (installLog: string) => void) {
    super(nb);
    this._setAvailablePackages = setAvailablePackages;
    this._setInstallationLog = setInstallationLog;
  }

  /*
  Check package is available
  */

  checkPackage(pkgInstallName: string, pkgImportName: string): void {

    this.checkPackageManager();

    if (this._notebookId) {
      if (this._notebookId in checkedPackages && pkgImportName in checkedPackages[this._notebookId]) {
        this._setAvailablePackages(checkedPackages[this._notebookId]);
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
            this._setAvailablePackages(checkedPackages[this._notebookId]);
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

  /*
  Installer
  */
  installPackage(installationName: string, importName: string) {
    // console.log('Install', importName, 'with', packageManager);

    let packageManager = this.getPackageManager();

    if (this._notebookId) {
      if (!(this._notebookId in checkedPackages)) {
        checkedPackages[this._notebookId] = { [importName]: 'install' }
      } else {
        checkedPackages[this._notebookId][importName] = 'install';
      }
      console.log("set installed package");
      console.log("set installed package");
      console.log("set installed package");
      this._setAvailablePackages(checkedPackages[this._notebookId]);
      // this._setInstalledPackages(checkedPackages[this._notebookId]);
    }
    console.log("what package manager?");
    console.log(packageManager);
    const code = packageManager === 'conda' ? installPackageConda(installationName) : installPackagePip(installationName);
    console.log("code", code);
    let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
      code,
      store_history: false,
    });

    console.log("future", future);

    if (future) {
      console.log("here");
      // will be needed to collect logs from installation
      future.onIOPub = this._onInstallPackage.bind(this);
      future.done.then(() => {
        console.log("future done!");
        if (this._notebookId && this._notebookId in checkedPackages) {
          // delete all packages, we need to re-check all packages again
          // there might be installed additional dependencies during this install
          delete checkedPackages[this._notebookId];

          this.checkPackage(installationName, importName);

          this._setInstallationLog("");
        }
      });
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
        console.log(content);
        this._setInstallationLog(content.text);
        break;
      default:
        break;
    }
    return;
  };



}
