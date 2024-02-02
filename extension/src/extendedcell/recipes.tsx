import React, { useState } from 'react';

import { ReactWidget } from '@jupyterlab/ui-components';

import { VDomModel, VDomRenderer } from '@jupyterlab/ui-components';

import { MyComponent } from '@mljar/recipes';

import { ReadCSV } from '@mljar/recipes';

export namespace RecipesModel {
  export class Model extends VDomModel {
    constructor() {
      super();
    }
  }
}

export interface IRecipesOptions {}

export class Recipes extends VDomRenderer<RecipesModel.Model> {
  // const [test:string, setTest: any] = React.useState('a');

  constructor(options: IRecipesOptions) {
    super(new RecipesModel.Model());
  }
  render(): JSX.Element | null {
    return (
      <>
        {/* <ReadCSV /> */}
        aaa
        {/* <MyComponent text= {'Re121'} /> */}
        {/* <readCSVRecipe.ui /> */}
      </>
    );
  }
}

interface Props {
  setCode: (src: string) => void;
}

const CounterComponent = ({ setCode }: Props): JSX.Element => {
  const [counter, setCounter] = useState(0);
  // const [name, setName] = useState("example");
  return (
    <div>
      <MyComponent text={'Re'} />
      <p>You clicked {counter} times!</p>
      <button
        onClick={(): void => {
          setCounter(counter + 1);
          setCode(`hejka ${counter}`);
        }}
      >
        Increment aa2
      </button>
      <ReadCSV />
      {/* {name} */}
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class CounterWidget extends ReactWidget {
  setCodeCallback: (src: string) => void;
  /**
   * Constructs a new CounterWidget.
   */
  constructor(setCode: (src: string) => void) {
    super();
    this.addClass('jp-react-widget');
    this.setCodeCallback = setCode;
  }

  render(): JSX.Element {
    return <CounterComponent setCode={this.setCodeCallback} />;
  }
}
