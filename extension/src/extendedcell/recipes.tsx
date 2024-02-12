import React from 'react';

import { SelectRecipe } from '@mljar/recipes';
import { Cell, ICellModel } from '@jupyterlab/cells';

import { ReactWidget, UseSignal } from '@jupyterlab/ui-components';

import { Signal } from '@lumino/signaling';
//import { ExecutionStatus } from '@mljar/recipes';

export enum ExecutionStatus {
  Wait = "Wait",
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
}

interface Props {
  previousCode: string;
  previousErrorName: string;
  previousErrorValue: string;
  cell: Cell<ICellModel>;
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
  executionSteps: [string, ExecutionStatus][];
}

const SelectRecipeComponent = ({
  previousCode,
  previousErrorName,
  previousErrorValue,
  cell,
  setCode,
  setPackages,
  runCell,
  executionSteps,
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
        setCode={setCode}
        setPackages={setPackages}
        runCell={runCell}
        executionSteps={executionSteps}
      />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  private _setCodeCallback: (src: string) => void;
  private _setPackagesCallback: (packages: string[]) => void;
  private _runCellCallback: () => void;
  private _cell: Cell<ICellModel>;
  private _signal = new Signal<this, void>(this);
  private _previousCode: string = '';
  private _previousErrorName: string = '';
  private _previousErrorValue: string = '';
  private _executionSteps: [string, ExecutionStatus][] = [['Reac CSV', ExecutionStatus.Success]];

  constructor(
    cell: Cell<ICellModel>,
    setCode: (src: string) => void,
    setPackages: (packages: string[]) => void,
    runCell: () => void
  ) {
    super();
    this.addClass('jp-react-widget');
    this._cell = cell;
    this._setCodeCallback = setCode;
    this._setPackagesCallback = setPackages;
    this._runCellCallback = runCell;
  }

  public setExecutionSteps(steps: [string, ExecutionStatus][]) {
    this._executionSteps = steps;
  }

  public setPreviousCode(src: string) {
    this._previousCode = src;
  }

  public setPreviousError(name: string, value: string) {
    this._previousErrorName = name;
    this._previousErrorValue = value;
  }

  public updateWidget() {
    this._signal.emit();
  }

  render(): JSX.Element {
    console.log('render');
    return (
      <UseSignal signal={this._signal}>
        {() => {
          console.log('-render');
          return (
            <SelectRecipeComponent
              previousCode={this._previousCode}
              previousErrorName={this._previousErrorName}
              previousErrorValue={this._previousErrorValue}
              cell={this._cell}
              setCode={this._setCodeCallback}
              setPackages={this._setPackagesCallback}
              runCell={this._runCellCallback}
              executionSteps={this._executionSteps}
            />
          );
        }}
      </UseSignal>
    );
  }
}
