import React from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import { SelectRecipe } from '@mljar/recipes';

interface Props {
  previousCode: string;
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
}

const SelectRecipeComponent = ({
  previousCode,
  setCode,
  setPackages,
  runCell
}: Props): JSX.Element => {
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
  private _previousCode: string = '';

  constructor(
    setCode: (src: string) => void,
    setPackages: (packages: string[]) => void,
    runCell: () => void
  ) {
    super();
    this.addClass('jp-react-widget');
    this._setCodeCallback = setCode;
    this._setPackagesCallback = setPackages;
    this._runCellCallback = runCell;
  }

  public setPreviousCode(src: string) {
    console.log(src);
    console.log(src === '');

    this._previousCode = src;
  }

  render(): JSX.Element {
    console.log('render');
    return (
      <SelectRecipeComponent
        previousCode={this._previousCode}
        setCode={this._setCodeCallback}
        setPackages={this._setPackagesCallback}
        runCell={this._runCellCallback}
      />
    );
  }
}
