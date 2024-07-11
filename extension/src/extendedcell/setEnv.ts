import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';

export class SetEnv {

  private _notebook: NotebookPanel | null;

  constructor(nb: NotebookPanel | null) {
    this._notebook = nb;
  }

  async run(envVariables: [string, string][]) {
    try {

      let newVars = [] as string[];
      envVariables.forEach(vs => {
        const k = vs[0];
        const v = vs[1];
        newVars.push(`"${k}":"${v}"`);
      })

      let code = `
__newVars = {${newVars.join(",")}}
__content = ""
try:
    with open(".env", "r") as __fin:
        __content = __fin.readlines()
except Exception as e:
    pass
__vars = {}
for __line in __content:
    if len(__line.split("=")) == 2:
      __vars[__line.split("=")[0].strip()] = __line.split("=")[1].strip()
for __k in __newVars:
    __vars[__k] = __newVars[__k]
with open(".env", "w") as __fout:
    for __k in __vars:
        __fout.write(f"{__k}={__vars[__k]}\\n")
print("env set ok")
`;
      await this._notebook?.sessionContext.ready;

      let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
        code,
        store_history: false,
      });
      // console.log({ future });
      if (future) {
        future.onIOPub = this._onIOPub;
      }
    } catch (e) {
      console.log(e);
    }
  }

  private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
    //console.log(msg);
    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':

        // interface ContentData {
        //   data: {
        //     'text/plain': string;
        //   }
        // }
        // const content = msg.content as ContentData;
        // //console.log(content);
        // try {
        //   let contentDisplay: string = content.data["text/plain"] as string;
        //   console.log(contentDisplay);
        // } catch (e) {
        //   console.log(e);
        // }

        break;
      default:
        break;
    }
    return;
  };
}
