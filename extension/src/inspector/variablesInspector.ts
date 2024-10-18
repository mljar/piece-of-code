import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { IVariable } from "@mljar/recipes";

import { codeInitInspector } from "./codes/init";
import { getVars } from "./codes/utils";
import { BaseInspector } from "./baseInspector";

var notebooksInitialized: string[] = [];

export class VariablesInspector extends BaseInspector {

  private _setVariablesStatus: (status: "loading" | "loaded" | "error" | "unknown") => void;
  private _setVariables: (variables: IVariable[]) => void;

  constructor(nb: NotebookPanel | null,
    setVariablesStatus: (status: "loading" | "loaded" | "error" | "unknown") => void,
    setVariables: (variables: IVariable[]) => void) {
    super(nb);
    this._setVariablesStatus = setVariablesStatus;
    this._setVariables = setVariables;
  }

  async getVariables() {
    try {
      this.checkPackageManager();
      this._setVariablesStatus("loading");
      this._setVariables([]);

      let code = '';
      if (this._notebookId === undefined) {
        code += codeInitInspector + '\n\n';
      }
      if (this._notebookId && !notebooksInitialized.includes(this._notebookId)) {
        code += codeInitInspector + '\n\n';
      }
      code += getVars;
      await this._notebook?.sessionContext.ready;

      let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
        code,
        store_history: false,
      });
      if (future) {
        future.onIOPub = this._onIOPub;
        future.done.then(() => {
          this._setVariablesStatus("loaded");
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':

        interface ContentData {
          data: {
            'text/plain': string;
          }
        }
        const content = msg.content as ContentData;
        try {
          let contentDisplay: string = content.data["text/plain"] as string;
          contentDisplay = contentDisplay.slice(1, -1);
          contentDisplay = contentDisplay
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'");

          const variables: IVariable[] = JSON.parse(contentDisplay);
          console.log(variables);

          this._setVariables(variables);
          this._setVariablesStatus("loaded");
          if (this._notebookId && !notebooksInitialized.includes(this._notebookId)) {
            notebooksInitialized.push(this._notebookId);
          }
        } catch (e) {
          console.log(e);
          this._setVariables([]);
          this._setVariablesStatus("error");
        }

        break;
      default:
        break;
    }
    return;
  };
}
