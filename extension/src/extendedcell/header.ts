import { Cell, ICellHeader, ICellModel } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import { PanelLayout, Widget } from '@lumino/widgets';

import { Message } from '@lumino/messaging';
import { CounterWidget } from './recipes';

export class ExtendedCellHeader extends Widget implements ICellHeader {
  private a: CounterWidget | undefined;
  constructor() {
    super();
    console.log('cell header');
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      const t = document.createElement('div');
      t.textContent = 'Ola koduje2';
      const a = this.setCode.bind(this);
      this.a = new CounterWidget(a);
      this.layout.addWidget(this.a);
      this.a.hide();
    }
    console.log('this cell', this.cell, this.notebook);
  }

  setCode(src: string): void {
    const cell = this.parent as Cell<ICellModel>;
    cell.model.sharedModel.setSource(src);
  }

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
        this.a?.show();

        // this.setCode("hejka");
        const nb = this.notebook;
        const cells = nb?.model?.cells;
        // const sharedModel = nb?.model?.sharedModel;
        // sharedModel?.insertCell(0, {
        //   cell_type: "code",
        //   source: "hejka"
        // });

        if (cells) {
          // cells.get(0).sharedModel.setSource("hejka");
          for (let i = 0; i < cells?.length; i++) {
            console.log(cells.get(i).sharedModel.source)
          }
        }
      });
      //cell.displayChanged.connect(() => console.log('change'));
    }
  }

  //https://github.com/jupyterlab/extension-examples/tree/main/signals 
  //private _stateChanged = new Signal<ButtonWidget, ICount>(this);

  private get cell(): Cell<ICellModel> | null {
    console.log('parent', this.parent);
    return this.parent instanceof Cell ? this.parent : null;
  }

  private get notebook(): NotebookPanel | null {
    return this.cell?.parent?.parent instanceof NotebookPanel
      ? this.cell.parent.parent
      : null;
  }
}
