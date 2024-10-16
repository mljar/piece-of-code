import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { checkIfConda } from "./codes/utils";


var notebookPackageManager: Record<string, 'conda' | 'pip'> = {};

export abstract class BaseInspector {

  protected _notebook: NotebookPanel | null;
  protected _notebookId: string | undefined;
  
  constructor(nb: NotebookPanel | null) {
    this._notebook = nb;
    this._notebookId = this._notebook?.id;
  }

  checkPackageManager() {
    // if already checked, then skip this step
    if (this._notebookId && this._notebookId in notebookPackageManager) {
      return;
    }
    // console.log('Check package manager');
    let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
      code: checkIfConda,
      store_history: false,
    });
    if (future) {
      future.onIOPub = this._onCheckPackageManager;
    }
  }


  protected _onCheckPackageManager = (msg: KernelMessage.IIOPubMessage): void => {
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

        if (this._notebookId) {
          //                     n(N)ot a conda environment
          if (content.text.includes('ot a conda environment')) {
            notebookPackageManager[this._notebookId] = 'pip';
          } else {
            notebookPackageManager[this._notebookId] = 'conda';
          }
        }

        break;
      default:
        break;
    }
    return;
  };
}
