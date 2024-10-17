import React, { useState, useContext, useEffect } from 'react';

import { VariablesInspector } from '../inspector/variablesInspector';
import { IVariable } from '@mljar/recipes';
import { ActiveCellManager } from './activeCell';

type VariablesContextValue = {
  status: 'loading' | 'loaded' | 'error' | 'unknown';
  variables: IVariable[];
};

const defaultVariablesContext: VariablesContextValue = {
  status: 'unknown',
  variables: []
};

const VariablesContext = React.createContext<VariablesContextValue>(
  defaultVariablesContext
);

type VariablesContextProps = {
  activeCellManager: ActiveCellManager;
  children: React.ReactNode;
};

export function VariablesContextProvider(
  props: VariablesContextProps
): JSX.Element {
  const [status, setStatus] = useState<
    'loading' | 'loaded' | 'error' | 'unknown'
  >('unknown');
  const [variables, setVariables] = useState<IVariable[]>([]);

  useEffect(() => {
    const manager = props.activeCellManager;

    manager.activeCellChanged.connect((_, newActiveCell) => {
      console.log('active cell changed 2');
      const nb = manager.notebook();
      const nbPanel = manager.notebookPanel();

      console.log('title', nb?.id);
      console.log('panel title', nbPanel?.id);
      //setExists(!!newActiveCell);
      if (nbPanel) {
        const inspector = new VariablesInspector(
          nbPanel,
          setStatus,
          setVariables
        );
        console.log(inspector.getVariables());
      }
    });
    setStatus('unknown');
    setVariables([]);
    // manager.activeCellErrorChanged.connect((_, newActiveCellError) => {
    //   setHasError(!!newActiveCellError);
    // });
  }, [props.activeCellManager]);

  useEffect(() => {
    console.log(status);
    console.log(variables);
  }, [status, variables])

  return (
    <VariablesContext.Provider
      value={{
        status,
        variables
      }}
    >
      {props.children}
    </VariablesContext.Provider>
  );
}

export function useVariablesContext(): VariablesContextValue {
  const { status, variables } = useContext(VariablesContext);

  return {
    status,
    variables
  };
}
