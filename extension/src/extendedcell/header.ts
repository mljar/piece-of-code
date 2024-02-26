import { Cell, ICellHeader, ICellModel } from '@jupyterlab/cells';
import { NotebookPanel } from '@jupyterlab/notebook';
import * as nbformat from '@jupyterlab/nbformat';
import { PanelLayout, Widget } from '@lumino/widgets';

import { CommandRegistry } from '@lumino/commands';
import { Message } from '@lumino/messaging';
import { SelectRecipeWidget } from './recipes';
import { getAlwaysOpen } from '../flags';
import { ExecutionStatus } from '@mljar/recipes';
import { VariableInspector } from './variableinspector';

// import { NotebookActions } from '@jupyterlab/notebook';
// import { nbformat } from '@jupyterlab/coreutils';

export class RecipeWidgetsRegistry {
  private static _instance: RecipeWidgetsRegistry;
  private _widgets: Record<string, SelectRecipeWidget> = {};
  private _lastSelectedCellId: string = '';
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

  public deleteCell() {
    if (this._commands) {
      this._commands.execute(
        'notebook:delete-cell'
      );
    }
  }

  public addCell() {
    if (this._commands) {
      const promise = this._commands.execute(
        'notebook:insert-cell-below'
      );
      promise.then(() => {
        this._commands?.execute(
          'notebook:enter-edit-mode'
        );
      });
    }
  }

  public addCellAbove() {
    if (this._commands) {
      const promise = this._commands.execute(
        'notebook:insert-cell-above'
      );
      promise.then(() => {
        this._commands?.execute(
          'notebook:enter-edit-mode'
        );
      });
    }
  }

  public runCell(addStep: (label: string, status: ExecutionStatus) => void, checkOutput: () => string) {
    if (this._commands) {
      addStep('Run code', ExecutionStatus.Wait);
      const promise = this._commands.execute(
        '@mljar/pieceofcode:runcurrentcell'
      );
      promise.then(() => {
        checkOutput();
      });
    }
  }
  public runFirstCell(): Promise<any> | undefined {
    if (this._commands) {
      const promise = this._commands.execute(
        '@mljar/pieceofcode:runfirstcell'
      );
      return promise;
    }
    return undefined;
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
  private _executionSteps: [string, ExecutionStatus][] = [];
  private _variableInspector: VariableInspector | undefined;

  constructor() {
    super();
    this.layout = new PanelLayout();
    if (this.layout instanceof PanelLayout) {
      this.removeClass('lm-Widget');
      this.removeClass('jp-Cell-header');
      this.addClass('recipe-panel-layout');
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

  clearExecutionSteps() {
    this._executionSteps = [];
    this.selectRecipe?.setExecutionSteps(this._executionSteps);
  }

  addExecutionStep(label: string, status: ExecutionStatus) {
    let found = false;
    this._executionSteps = this._executionSteps.map((step) => {
      if (step[0] == label) {
        found = true;
        return [step[0], status];
      }
      return [step[0], step[1]];
    });
    if (!found) {
      this._executionSteps.push([label, status]);
    }
    this.selectRecipe?.setExecutionSteps(this._executionSteps);
  }

  runCell(): void {

    this.selectRecipe?.setPreviousError('', '');

    this.clearExecutionSteps();

    this.insertCellAtTop();

    this.supplementPackages();

    if (this._packages.length) {
      //
      // import packages and run code
      //
      this.addExecutionStep('Import packages', ExecutionStatus.Wait)
      const promise = RecipeWidgetsRegistry.getInstance().runFirstCell();
      promise?.then(() => {
        const errorName = this.checkFirstCellOutput();
        console.log('check first cell', errorName);
        if (errorName === '') {
          // no error with package import let's run code
          RecipeWidgetsRegistry.getInstance().runCell(this.addExecutionStep.bind(this), this.checkOutput.bind(this));
        } else {
          this.addExecutionStep('Code not executed', ExecutionStatus.Warning)
        }
      });
      // clear packages
      this._packages = [];
    } else {
      //
      // just run current cell
      //
      RecipeWidgetsRegistry.getInstance().runCell(this.addExecutionStep.bind(this), this.checkOutput.bind(this));
    }




  }

  checkOutput(): string {
    if (this.cell) {
      return this.checkCellOutput(this.cell.model.sharedModel.toJSON(), 'Run code');
    }
    return '';
  }

  checkFirstCellOutput(): string {
    const nb = this.notebook;
    if (nb) {
      const cells = nb?.model?.cells;
      if (cells) {
        return this.checkCellOutput(cells.get(0).sharedModel.toJSON(), 'Import packages');
      }
    }
    return '';
  }

  checkCellOutput(output: nbformat.IBaseCell, stepName: string): string {
    if (output) {
      const [errorName, errorValue] = this.getErrorNameAndValue(output);
      this.selectRecipe?.setPreviousError(errorName, errorValue);
      this.selectRecipe?.updateWidget();
      if (errorName === '') {
        setTimeout(() => this.addExecutionStep(stepName, ExecutionStatus.Success), 500);
      } else {
        setTimeout(() => this.addExecutionStep(stepName, ExecutionStatus.Error), 500);
      }
      return errorName;
    }
    return '';
  }

  deleteCell(): void {
    RecipeWidgetsRegistry.getInstance().deleteCell();
  }

  addCell(): void {
    RecipeWidgetsRegistry.getInstance().addCell();
  }

  insertCellAtTop() {
    // insert cell at the top of the notebook
    // if there is only one cell in the notebook
    if (!this._packages) {
      return;
    }
    const nb = this.notebook;
    if (nb) {
      const cells = nb?.model?.cells;
      if (cells) {
        if (cells.length == 1) {
          nb?.model?.sharedModel.insertCell(0, { cell_type: 'code', source: '' })
        }
      }
    }
  }

  supplementPackages() {
    if (!this._packages) {
      return;
    }
    const nb = this.notebook;
    if (nb) {
      const cells = nb?.model?.cells;
      if (cells) {
        let firstCellSrc = cells.get(0).sharedModel.getSource();
        this._packages.forEach((packageImport) => {
          const packageImported = firstCellSrc.includes(packageImport);
          if (!packageImported) {
            if (firstCellSrc.length > 0) {
              firstCellSrc += '\n'
            }
            firstCellSrc += `${packageImport}`;
          }
        });
        cells.get(0).sharedModel.setSource(firstCellSrc);
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

  protected getErrorNameAndValue(output: nbformat.IBaseCell): [string, string] {
    // const output: nbformat.IBaseCell = cell.model.sharedModel.toJSON();
    if (output) {
      if (output.cell_type === 'code') {
        let outputs = output.outputs as any[];
        //console.log(outputs);
        if (outputs !== null && outputs !== undefined) {
          //let s = outputs?.toString();
          //console.log('string', s);
          if (outputs.length) {
            const { output_type, ename, evalue } = outputs[0];
            //console.log(outputs[0], output_type, ename, evalue);
            if (output_type === 'error') {
              return [ename, evalue];
            }
          }
        }
      }
    }
    return ['', ''];
  }

  protected getExecutionCount(cell: Cell<ICellModel>): number {
    const output = cell.model.sharedModel.toJSON();
    if (output) {
      if (output.cell_type === 'code') {
        const execution_count = output.execution_count as number | null;
        if (execution_count) {
          return execution_count;
        }
      }
    }
    return 0;
  }

  protected onAfterAttach(msg: Message): void {
    const cell = this.parent as Cell<ICellModel>;
    //console.log('get cell', cell);
    if (cell) {

      if (this.selectRecipe === undefined) {
        const executionCount = this.getExecutionCount(cell);
        this.selectRecipe = new SelectRecipeWidget(
          cell,
          this.setCode.bind(this),
          this.setPackages.bind(this),
          this.runCell.bind(this),
          this.deleteCell.bind(this),
          this.addCell.bind(this),
          executionCount,

        );
        this.selectRecipe.hide();
        if (this.layout instanceof PanelLayout) {
          this.layout?.addWidget(this.selectRecipe);
        }
      }

      if (this._variableInspector === undefined && this.selectRecipe !== undefined) {
        this._variableInspector = new VariableInspector(this.notebook,
          this.selectRecipe.setVariablesStatus.bind(this.selectRecipe),
          this.selectRecipe.setVariables.bind(this.selectRecipe),
          this.selectRecipe.setCheckedPackages.bind(this.selectRecipe)
        );

        this.selectRecipe.setCheckPackage(this._variableInspector.checkPackage.bind(this._variableInspector));
        this.selectRecipe.setInstallPackage(this._variableInspector.installPackage.bind(this._variableInspector));

        this.selectRecipe.updateWidget();
      }

      //console.log('try add focus');
      // cell.inputArea?.node.addEventListener('focusout', () => {
      //   console.log('focusin is here2', cell);
      //   this.a?.hide();
      // });
      this._cellId = cell.model.id;
      if (this.selectRecipe) {
        RecipeWidgetsRegistry.getInstance().addWidget(
          this._cellId,
          this.selectRecipe
        );
      }
      cell.inputArea?.node.addEventListener('focusin', () => {

        if (this._cellId) {
          RecipeWidgetsRegistry.getInstance().setSelectedCellId(this._cellId);
        }

        RecipeWidgetsRegistry.getInstance().hideAll();
        this._packages = [];

        if (getAlwaysOpen()) {
          this.selectRecipe?.setPreviousCode(
            cell.model.sharedModel.getSource()
          );
          const [errorName, errorValue] = this.getErrorNameAndValue(cell.model.sharedModel.toJSON());
          this.selectRecipe?.setPreviousError(errorName, errorValue);
          const executionCount = this.getExecutionCount(cell);
          this.selectRecipe?.setPreviousExecutionCount(executionCount);
          this.selectRecipe?.updateWidget();
          //this.selectRecipe?.update();
          this._variableInspector?.getVariables();

          this.selectRecipe?.show();
        }

        // console.log(cell.model.sharedModel.toJSON());

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
