import React, { useState } from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';

import { SelectRecipeLeft } from '@mljar/recipes';
import {
  ActiveCellContextProvider,
  ActiveCellManager,
  useActiveCellContext
} from './contexts/activeCell';
import { CodeCellComponent } from './contexts/codeCell';
import {
  useVariablesContext,
  VariablesContextProvider
} from './contexts/variables';
import { cakeIcon } from './icons';

export function Hello() {
  const activeCell = useActiveCellContext();
  const variables = useVariablesContext();
  const [code, setCode] = useState('');
  console.log('Left compoenent');
  return (
    <div>
      <SelectRecipeLeft
        previousCode={''}
        previousErrorName={''}
        previousErrorValue={''}
        previousExecutionCount={0}
        setCode={(code: string) => {
          setCode(code);
        }}
        setPackages={(p: string[]) => {}}
        runCell={() => {}}
        executionSteps={[]}
        deleteCell={() => {}}
        addCell={() => {
          if (activeCell.exists) {
            activeCell.manager.insertBelow('test');
          }
        }}
        variablesStatus={variables.status}
        variables={variables.variables}
        checkPackage={(pkgInstallName: string, pkgImportName: string) => {}}
        checkedPackages={{}}
        installPackage={(pkgInstallName: string, pkgImportName: string) => {}}
        installLog={''}
        clearExecutionSteps={() => {}}
        metadata={{}}
        setMetadata={(m: any) => {}}
        changeCellToMarkdown={() => {}}
        changeCellToCode={() => {}}
        cellType={'code'}
        getCellCode={() => ''}
        setEnv={() => {}}
      />
      {code && (
        <div style={{ border: '1px solid #eee', margin: '5px' }}>
          <CodeCellComponent cellInput={code} languageMimetype="python" />
        </div>
      )}
    </div>
  );
}

// public setVariablesStatus(
//   status: 'loading' | 'loaded' | 'error' | 'unknown'
// ) {
//   this._variablesStatus = status;
// }

// public setVariables(variables: IVariable[]) {
//   this._variables = variables;
//   this.updateWidget();
// }

export function createPocLeft(
  activeCellManager: ActiveCellManager
): ReactWidget {
  const widget = ReactWidget.create(
    <ActiveCellContextProvider activeCellManager={activeCellManager}>
      <VariablesContextProvider activeCellManager={activeCellManager}>
        <Hello />
      </VariablesContextProvider>
    </ActiveCellContextProvider>
  );
  widget.id = 'mljar::piece-of-code';
  widget.title.icon = cakeIcon;
  widget.title.caption = 'Piece of Code';

  return widget;
}
