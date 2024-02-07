import { Cell, ICellHeader, ICellModel } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import { PanelLayout, Widget } from '@lumino/widgets';

import { KernelMessage } from '@jupyterlab/services';
import { Message } from '@lumino/messaging';
import { SelectRecipeWidget } from './recipes';

const hideAllSelectRecipeWidgets = (): void => {
  const elements = document.querySelectorAll(
    `jp-react-widget`
  );
  elements.forEach((e: Element) => {
    e.classList.add('lm-mod-hidden');
  });
};


export class ExtendedCellHeader extends Widget implements ICellHeader {
  private selectRecipe: SelectRecipeWidget | undefined;
  constructor() {
    super();
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      this.removeClass('lm-Widget');
      this.removeClass('jp-Cell-header');
      this.addClass('recipe-panel-layout');
      this.selectRecipe = new SelectRecipeWidget(this.setCode.bind(this));
      this.layout.addWidget(this.selectRecipe);
      this.selectRecipe.hide();
    }
  }

  setCode(src: string): void {
    const cell = this.parent as Cell<ICellModel>;
    cell.model.sharedModel.setSource(src);
  }

  private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
    const msgType = msg.header.msg_type;
    // console.log(msg);
    switch (msgType) {
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':

        // console.log(msg.content);

        break;
      default:
        break;
    }
    return;
  };

  protected onAfterAttach(msg: Message): void {
    const cell = this.parent as Cell<ICellModel>;
    //console.log('get cell', cell);
    if (cell) {
      //console.log('try add focus');
      // cell.inputArea?.node.addEventListener('focusout', () => {
      //   console.log('focusin is here2', cell);
      //   this.a?.hide();
      // });

      cell.inputArea?.node.addEventListener('focusin', () => {
        //console.log('focusin is here2', cell);
        hideAllSelectRecipeWidgets();
        this.selectRecipe?.show();

        // this.setCode("hejka");
        const nb = this.notebook;


        let future = nb?.sessionContext.session?.kernel?.requestExecute({
          code: "2+2",
          store_history: false,
        });
        if (future) {
          future.onIOPub = this._onIOPub;
        }


        //nb?.sessionContext.

        const cells = nb?.model?.cells;
        // const sharedModel = nb?.model?.sharedModel;
        // sharedModel?.insertCell(0, {
        //   cell_type: "code",
        //   source: "hejka"
        // });

        if (cells) {
          // cells.get(0).sharedModel.setSource("hejka");
          for (let i = 0; i < cells?.length; i++) {
            // console.log(cells.get(i).sharedModel.source)
            console.log(cells.get(i).id);
            console.log(cells.get(i).sharedModel.getMetadata());
            let m = cells.get(i).sharedModel.getMetadata();
            m['showPoC'] = true;
            cells.get(i).sharedModel.setMetadata(m);
          }
        }
      });
      //cell.displayChanged.connect(() => console.log('change'));
    }
  }

  //https://github.com/jupyterlab/extension-examples/tree/main/signals 
  //private _stateChanged = new Signal<ButtonWidget, ICount>(this);

  private get cell(): Cell<ICellModel> | null {
    // console.log('parent', this.parent);
    return this.parent instanceof Cell ? this.parent : null;
  }

  private get notebook(): NotebookPanel | null {
    return this.cell?.parent?.parent instanceof NotebookPanel
      ? this.cell.parent.parent
      : null;
  }
}
