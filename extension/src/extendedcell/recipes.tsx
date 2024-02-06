import React from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import { SelectRecipe } from '@mljar/recipes';

interface Props {
  setCode: (src: string) => void;
}

const SelectRecipeComponent = ({ setCode }: Props): JSX.Element => {
  
  const setPackages = (packages: string[]) => {
    console.log(packages);
  };
  return (
    <div>
      <SelectRecipe setCode={setCode} setPackages={setPackages} />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  setCodeCallback: (src: string) => void;
  constructor(setCode: (src: string) => void) {
    super();
    this.addClass('jp-react-widget');
    this.setCodeCallback = setCode;
  }

  render(): JSX.Element {
    return <SelectRecipeComponent setCode={this.setCodeCallback} />;
  }
}
