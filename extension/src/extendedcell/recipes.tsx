import React from 'react';

import { VDomModel, VDomRenderer } from '@jupyterlab/ui-components';

import { MyComponent, readCSVRecipe } from '@mljar/recipes';

export namespace RecipesModel {
  export class Model extends VDomModel {
    constructor() {
      super();
    }
  }
}

export interface IRecipesOptions { }

export class Recipes extends VDomRenderer<RecipesModel.Model> {
  constructor(options: IRecipesOptions) {
    super(new RecipesModel.Model());
  }
  render(): JSX.Element | null {
    return (
      <>
      <MyComponent text= {'Recipes'} />
      <readCSVRecipe.ui />
      <readCSVRecipe.parent.icon />
      </>
    );
  }
}
