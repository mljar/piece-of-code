import { Cell, ICellFooter, ICellModel } from '@jupyterlab/cells';
import { PanelLayout, Widget } from '@lumino/widgets';

import { Message } from '@lumino/messaging';

export class ExtendedCellFooter extends Widget implements ICellFooter {
  private a: Widget | undefined;
  constructor() {
    super();
    console.log('cell footer');
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      const t = document.createElement('div');
      t.textContent = 'Ola koduje2';
      this.a = new Widget({ node: t });
      this.layout.addWidget(this.a);
      this.a.hide();
    }
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
}
