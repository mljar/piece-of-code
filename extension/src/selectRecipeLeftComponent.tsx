import React, { useEffect, useState } from 'react';

import { SelectRecipeLeft } from '@mljar/recipes';
import { useActiveCellContext } from './contexts/activeCell';
import { CodeCellComponent } from './contexts/codeCell';
import { useVariablesContext } from './contexts/variables';

import { usePackagesContext } from './contexts/packages';

export const PieceOfCodeComponent = (): JSX.Element => {
  const activeCell = useActiveCellContext();
  const variables = useVariablesContext();
  const packages = usePackagesContext();
  const [code, setCode] = useState('');
  const [importCode, setImportCode] = useState('');

  if (!activeCell.exists) {
    return (
      <div
        style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}
      >
        Please open notebook
      </div>
    );
  }

  const checkPackage = (pkgInstallName: string, pkgImportName: string) => {
    packages.checkPackage(pkgInstallName, pkgImportName);
  };

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
        setPackages={(imports: string[]) => {
          setImportCode(imports.join('\n'));
        }}
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
        checkPackage={checkPackage}
        checkedPackages={packages.packages}
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

      {importCode && (
        <div
          style={{
            border: '1px solid #eee',
            margin: '8px',
            borderRadius: '7px'
          }}
        >
          <div style={{ padding: '5px' }}>
            <CodeCellComponent
              cellInput={importCode}
              languageMimetype="python"
            />
          </div>
        </div>
      )}

      {code && (
        <div
          style={{
            border: '1px solid #eee',
            margin: '8px',
            borderRadius: '7px'
          }}
        >
          <div style={{ padding: '5px' }}>
            <CodeCellComponent cellInput={code} languageMimetype="python" />
          </div>
        </div>
      )}
    </div>
  );
};
