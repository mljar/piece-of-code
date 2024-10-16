import React, { useState, useContext, useEffect } from 'react';

import { VariablesInspector } from '../inspector/variablesInspector';
import { IVariable } from '@mljar/recipes';
import { ActiveCellManager } from './activeCell';

type PackagesContextValue = {
  status: 'loading' | 'loaded' | 'error' | 'unknown';
  variables: IVariable[];
};

const defaultPackagesContext: PackagesContextValue = {
  status: 'unknown',
  variables: []
};

const PackagesContext = React.createContext<PackagesContextValue>(
  defaultPackagesContext
);

type PackagesContextProps = {
  activeCellManager: ActiveCellManager;
  children: React.ReactNode;
};

export function PackagesContextProvider(
  props: PackagesContextProps
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
    <PackagesContext.Provider
      value={{
        status,
        variables
      }}
    >
      {props.children}
    </PackagesContext.Provider>
  );
}

export function usePackagesContext(): PackagesContextValue {
  const { status, variables } = useContext(PackagesContext);

  return {
    status,
    variables
  };
}
