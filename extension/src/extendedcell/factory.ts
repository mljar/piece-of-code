import { Cell, ICellFooter, ICellHeader } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import { ExtendedCellHeader } from './header';
import { ExtendedCellFooter } from './footer';

export class ExtendedCellFactory extends NotebookPanel.ContentFactory {
  constructor(options: Cell.ContentFactory.IOptions) {
    super(options);
    console.log('extended cell factory');
  }

  createCellHeader(): ICellHeader {
    console.log('create cell header');
    return new ExtendedCellHeader();
  }

  createCellFooter(): ICellFooter {
    return new ExtendedCellFooter();
  }
}
