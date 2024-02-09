import React, { useEffect, useState } from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import { SelectRecipe } from '@mljar/recipes';
import { Cell, ICellModel } from '@jupyterlab/cells';

interface Props {
  cell: Cell<ICellModel>;
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
}

const SelectRecipeComponent = ({
  cell,
  setCode,
  setPackages,
  runCell
}: Props): JSX.Element => {
  const [previousCode, setPreviousCode] = useState('');

  useEffect(() => {
    console.log('cell changed');
    setPreviousCode('');
  }, [cell]);

  cell.model.contentChanged.connect(() => {
    console.log('change', cell.model.sharedModel.getSource());
    setPreviousCode(cell.model.sharedModel.getSource());
  }, cell);

  return (
    <div>
      <SelectRecipe
        previousCode={previousCode}
        previousErroValue=""
        previousErrorName=""
        setCode={setCode}
        setPackages={setPackages}
        runCell={runCell}
        executionSteps={[]}
      />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  private _setCodeCallback: (src: string) => void;
  private _setPackagesCallback: (packages: string[]) => void;
  private _runCellCallback: () => void;
  private _cell: Cell<ICellModel>;

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

  public setPreviousCode(src: string) {
    console.log(src);
    console.log(src === '');
  }

  render(): JSX.Element {
    console.log('render');
    return (
      <SelectRecipeComponent
        cell={this._cell}
        setCode={this._setCodeCallback}
        setPackages={this._setPackagesCallback}
        runCell={this._runCellCallback}
      />
    );
  }
}
