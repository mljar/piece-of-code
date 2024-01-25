import { Cell, ICellHeader, ICellModel } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import { PanelLayout, Widget } from '@lumino/widgets';

import { Message } from '@lumino/messaging';

export class ExtendedCellHeader extends Widget implements ICellHeader {
  private a: Widget | undefined;
  constructor() {
    super();
    console.log('cell header');
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      const t = document.createElement('div');
      t.textContent = 'Ola koduje2';
      this.a = new Widget({ node: t });
      this.layout.addWidget(this.a);
      this.a.hide();
    }
    console.log('this cell', this.cell, this.notebook);
  }
  
  protected onAfterAttach(msg: Message): void {
    const cell = this.parent as Cell<ICellModel>;
    console.log('get cell', cell);
    if (cell) {
      console.log('try add focus');
      cell.inputArea?.node.addEventListener('focusout', () => {
        console.log('focusin is here2', cell);
        this.a?.hide();
      });
      cell.inputArea?.node.addEventListener('focusin', () => {
        console.log('focusin is here2', cell);
        this.a?.show();
      });
      //cell.displayChanged.connect(() => console.log('change'));
    }
  }
  
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
