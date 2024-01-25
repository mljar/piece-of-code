import { Cell, ICellHeader } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import { ExtendedCellHeader } from './header';

export class ExtendedCellFactory extends NotebookPanel.ContentFactory {
  constructor(options: Cell.ContentFactory.IOptions) {
    super(options);
  }

  createCellHeader(): ICellHeader {
    console.log('create cell header');
    return new ExtendedCellHeader();
  }

}
