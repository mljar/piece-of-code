import React from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import { SelectRecipe } from '@mljar/recipes';

interface Props {
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
}

const SelectRecipeComponent = ({
  setCode,
  setPackages,
  runCell
}: Props): JSX.Element => {
  return (
    <div>
      <SelectRecipe
        setCode={setCode}
        setPackages={setPackages}
        runCell={runCell}
      />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  private _setCodeCallback: (src: string) => void;
  private _setPackagesCallback: (packages: string[]) => void;
  private _runCellCallback: () => void;

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

  render(): JSX.Element {
    return (
      <SelectRecipeComponent
        setCode={this._setCodeCallback}
        setPackages={this._setPackagesCallback}
        runCell={this._runCellCallback}
      />
    );
  }
}
