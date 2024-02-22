import React from 'react';

import { IVariable, SelectRecipe } from '@mljar/recipes';
import { Cell, ICellModel } from '@jupyterlab/cells';

import { ReactWidget, UseSignal } from '@jupyterlab/ui-components';

import { Signal } from '@lumino/signaling';

export enum ExecutionStatus {
  Wait = 'Wait',
  Success = 'Success',
  Error = 'Error',
  Warning = 'Warning'
}

interface Props {
  previousCode: string;
  previousErrorName: string;
  previousErrorValue: string;
  previousExecutionCount: number;
  cell: Cell<ICellModel>;
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
  executionSteps: [string, ExecutionStatus][];
  deleteCell: () => void;
  addCell: () => void;
  variablesStatus: 'loading' | 'loaded' | 'error' | 'unknown';
  variables: IVariable[];
}

const SelectRecipeComponent = ({
  previousCode,
  previousErrorName,
  previousErrorValue,
  previousExecutionCount,
  cell,
  setCode,
  setPackages,
  runCell,
  executionSteps,
  deleteCell,
  addCell,
  variablesStatus,
  variables
}: Props): JSX.Element => {
  // useEffect(() => {
  //   console.log('cell changed');
  // }, [cell]);

  // cell.model.contentChanged.connect(() => {
  //   setPreviousCode(cell.model.sharedModel.getSource());
  // }, cell);

  return (
    <div>
      <SelectRecipe
        previousCode={previousCode}
        previousErroValue={previousErrorName}
        previousErrorName={previousErrorValue}
        previousExecutionCount={previousExecutionCount}
        setCode={setCode}
        setPackages={setPackages}
        runCell={runCell}
        executionSteps={executionSteps}
        deleteCell={deleteCell}
        addCell={addCell}
        variablesStatus={variablesStatus}
        variables={variables}
      />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  private _setCodeCallback: (src: string) => void;
  private _setPackagesCallback: (packages: string[]) => void;
  private _runCellCallback: () => void;
  private _deleteCell: () => void;
  private _addCell: () => void;
  private _cell: Cell<ICellModel>;
  private _signal = new Signal<this, void>(this);
  private _previousCode: string = '';
  private _previousErrorName: string = '';
  private _previousErrorValue: string = '';
  private _previousExecutionCount: number = 0;
  private _executionSteps: [string, ExecutionStatus][] = [];
  private _variablesStatus: 'loading' | 'loaded' | 'error' | 'unknown' =
    'unknown';
  private _variables: IVariable[] = [];

  constructor(
    cell: Cell<ICellModel>,
    setCode: (src: string) => void,
    setPackages: (packages: string[]) => void,
    runCell: () => void,
    deleteCell: () => void,
    addCell: () => void,
    executionCount: number
  ) {
    super();
    this.addClass('jp-react-widget');
    this._cell = cell;
    this._setCodeCallback = setCode;
    this._setPackagesCallback = setPackages;
    this._runCellCallback = runCell;
    this._deleteCell = deleteCell;
    this._addCell = addCell;
    this._previousExecutionCount = executionCount;
  }

  public setExecutionSteps(steps: [string, ExecutionStatus][]) {
    this._executionSteps = steps;
    this.updateWidget();
  }

  public setPreviousCode(src: string) {
    this._previousCode = src;
  }

  public setPreviousExecutionCount(cnt: number) {
    this._previousExecutionCount = cnt;
  }

  public setPreviousError(name: string, value: string) {
    this._previousErrorName = name;
    this._previousErrorValue = value;
  }

  public updateWidget() {
    this._signal.emit();
  }

  public setVariablesStatus(
    status: 'loading' | 'loaded' | 'error' | 'unknown'
  ) {
    this._variablesStatus = status;
  }

  public setVariables(variables: IVariable[]) {
    this._variables = variables;
    this.updateWidget();
  }

  render(): JSX.Element {
    return (
      <UseSignal signal={this._signal}>
        {() => {
          return (
            <SelectRecipeComponent
              previousCode={this._previousCode}
              previousErrorName={this._previousErrorName}
              previousErrorValue={this._previousErrorValue}
              previousExecutionCount={this._previousExecutionCount}
              cell={this._cell}
              setCode={this._setCodeCallback}
              setPackages={this._setPackagesCallback}
              runCell={this._runCellCallback}
              executionSteps={this._executionSteps}
              deleteCell={this._deleteCell}
              addCell={this._addCell}
              variablesStatus={this._variablesStatus}
              variables={this._variables}
            />
          );
        }}
      </UseSignal>
    );
  }
}
