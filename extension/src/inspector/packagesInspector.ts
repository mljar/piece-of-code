import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { checkPackageCode } from "./codes/utils";
import { BaseInspector } from "./baseInspector";


var checkedPackages: Record<string, Record<string, string>> = {};

export class PackagesInspector extends BaseInspector {

  private _setAvailablePackages: (pkgs: Record<string, string>) => void;


  constructor(nb: NotebookPanel | null,
    setAvailablePackages: (pkgs: Record<string, string>) => void) {
    super(nb);
    this._setAvailablePackages = setAvailablePackages;
  }

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
}
