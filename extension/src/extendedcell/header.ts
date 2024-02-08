import { Cell, ICellHeader, ICellModel } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';

import { PanelLayout, Widget } from '@lumino/widgets';

import { CommandRegistry } from '@lumino/commands';
// import { KernelMessage } from '@jupyterlab/services';
import { Message } from '@lumino/messaging';
import { SelectRecipeWidget } from './recipes';
import { getAlwaysOpen } from '../flags';

// import { NotebookActions } from '@jupyterlab/notebook';

export class RecipeWidgetsRegistry {
  private static _instance: RecipeWidgetsRegistry;
  private _widgets: Record<string, SelectRecipeWidget> = {};
  private _lastSelectedCellId: string = "";
  private _commands: CommandRegistry | undefined;

  private constructor() { }

  public static getInstance(): RecipeWidgetsRegistry {
    if (!RecipeWidgetsRegistry._instance) {
      RecipeWidgetsRegistry._instance = new RecipeWidgetsRegistry();
    }
    return RecipeWidgetsRegistry._instance;
  }

  public setCommandRegistry(commands: CommandRegistry) {
    this._commands = commands;
  }

  public runCell() {
    if (this._commands) {
      // const promise = this._commands.execute('notebook:run-cell-and-insert-below');
      // promise.finally(() => {
      //   console.log('run and insert');

      // })
      if (this._commands) {
        const promise2 = this._commands.execute('@mljar/pieceofcode:runfirstcell');
        promise2.finally(() => {
          console.log('promise2');
          // if (this._commands) {
          //   const promise = this._commands.execute('notebook:run-cell');
          //   promise.finally(() => {
          //     console.log('run and insert');

          //   })
          // }
        });
      }
    }
  }

  public addWidget(cellId: string, widget: SelectRecipeWidget) {
    this._widgets[cellId] = widget;
  }

  public removeWidget(cellId: string) {
    delete this._widgets[cellId];
  }

  public hideAll() {
    Object.values(this._widgets).forEach(w => w.hide());
  }

  public setSelectedCellId(cellId: string) {
    this._lastSelectedCellId = cellId;
  }

  public showLastSelectedCellId() {
    if (this._lastSelectedCellId in this._widgets) {
      this._widgets[this._lastSelectedCellId].show();
    }
  }

}

// export const run = 'notebook:run-cell';

// export const runAndAdvance = 'notebook:run-cell-and-select-next';

// export const runAndInsert = 'notebook:run-cell-and-insert-below';

export class ExtendedCellHeader extends Widget implements ICellHeader {
  private selectRecipe: SelectRecipeWidget | undefined;
  private _cellId: string | undefined;
  private _packages: string[] = [];

  constructor() {
    super();
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      this.removeClass('lm-Widget');
      this.removeClass('jp-Cell-header');
      this.addClass('recipe-panel-layout');
      this.selectRecipe = new SelectRecipeWidget(this.setCode.bind(this), this.setPackages.bind(this), this.runCell.bind(this));
      this.layout.addWidget(this.selectRecipe);
      this.selectRecipe.hide();
    }
  }
  dispose(): void {
    if (this._cellId) {
      RecipeWidgetsRegistry.getInstance().removeWidget(this._cellId);
    }
    super.dispose();
  }

  setCode(src: string): void {
    const cell = this.parent as Cell<ICellModel>;
    cell.model.sharedModel.setSource(src);
  }

  setPackages(packages: string[]): void {
    this._packages = packages;
  }

  runCell(): void {

    RecipeWidgetsRegistry.getInstance().runCell();
  }

  supplementPackages() {
    if(!this._packages) {
      return;
    }
    const nb = this.notebook;
    if (nb) {
      const cells = nb?.model?.cells;
      if (cells) {
        cells.get(0).sharedModel.setSource("hejka");
      }
    }
  }


  // private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
  //   const msgType = msg.header.msg_type;
  //   // console.log(msg);
  //   switch (msgType) {
  //     case 'execute_result':
  //     case 'display_data':
  //     case 'update_display_data':

  //       // console.log(msg.content);

  //       break;
  //     default:
  //       break;
  //   }
  //   return;
  // };

  protected onAfterAttach(msg: Message): void {
    const cell = this.parent as Cell<ICellModel>;
    //console.log('get cell', cell);
    if (cell) {
      //console.log('try add focus');
      // cell.inputArea?.node.addEventListener('focusout', () => {
      //   console.log('focusin is here2', cell);
      //   this.a?.hide();
      // });
      this._cellId = cell.model.id;
      if (this.selectRecipe) {
        RecipeWidgetsRegistry.getInstance().addWidget(this._cellId, this.selectRecipe);
      }
      cell.inputArea?.node.addEventListener('focusin', () => {

        if (this._cellId) {
          RecipeWidgetsRegistry.getInstance().setSelectedCellId(this._cellId);
        }

        RecipeWidgetsRegistry.getInstance().hideAll();
        this._packages = [];

        if (getAlwaysOpen()) {
          this.selectRecipe?.show();
        }

        // this.setCode("hejka");
        const nb = this.notebook;


        // let future = nb?.sessionContext.session?.kernel?.requestExecute({
        //   code: "2+2",
        //   store_history: false,
        // });
        // if (future) {
        //   future.onIOPub = this._onIOPub;
        // }


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
            //console.log(cells.get(i).id);
            //console.log(cells.get(i).sharedModel.getMetadata());
            //let m = cells.get(i).sharedModel.getMetadata();
            //m['showPoC'] = true;
            //cells.get(i).sharedModel.setMetadata(m);
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
