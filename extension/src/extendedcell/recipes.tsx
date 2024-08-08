import React, { useState } from 'react';

import { IVariable, SelectRecipe } from '@mljar/recipes';
import { Cell, ICellModel } from '@jupyterlab/cells';

import { ReactWidget, UseSignal } from '@jupyterlab/ui-components';

import { Signal } from '@lumino/signaling';

export enum ExecutionStatus {
  Wait = 'Wait',
  Success = 'Success',
  Error = 'Error',
  Warning = 'Warning'
}

interface Props {
  previousCode: string;
  previousErrorName: string;
  previousErrorValue: string;
  previousExecutionCount: number;
  cell: Cell<ICellModel>;
  setCode: (src: string) => void;
  setPackages: (packages: string[]) => void;
  runCell: () => void;
  executionSteps: [string, ExecutionStatus][];
  deleteCell: () => void;
  addCell: () => void;
  variablesStatus: 'loading' | 'loaded' | 'error' | 'unknown';
  variables: IVariable[];
  checkPackage: (pkg: string) => void;
  checkedPackages: Record<string, string>;
  installPackage: (installationName: string, importName: string) => void;
  installLog: string;
  clearExecutionSteps: () => void;
  meta: any;
  setMeta: (m: any) => void;
  changeCellToMarkdown: () => void;
  changeCellToCode: () => void;
  setEnv: (envVariables: [string, string][]) => void;
}

const SelectRecipeComponent = ({
  previousCode,
  previousErrorName,
  previousErrorValue,
  previousExecutionCount,
  cell,
  setCode,
  setPackages,
  runCell,
  executionSteps,
  deleteCell,
  addCell,
  variablesStatus,
  variables,
  checkPackage,
  checkedPackages,
  installPackage,
  installLog,
  clearExecutionSteps,
  meta,
  setMeta,
  changeCellToMarkdown,
  changeCellToCode,
  setEnv
}: Props): JSX.Element => {
  // useEffect(() => {
  //   console.log('cell changed');
  // }, [cell]);

  // cell.model.contentChanged.connect(() => {
  //   setPreviousCode(cell.model.sharedModel.getSource());
  // }, cell);

  const [isDark, setIsDark] = useState(false);
  const getCellCode = (): string => {
    return cell.model.sharedModel.getSource();
  };

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        if (
          document.body.attributes
            .getNamedItem('data-jp-theme-name')
            ?.value.includes('Dark')
        ) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true, //configure it to listen to attribute changes
    attributeFilter: ['data-jp-theme-name']
  });

  return (
    <div className={isDark ? 'poc-dark' : ''}>
      <SelectRecipe
        previousCode={previousCode}
        previousErrorName={previousErrorName}
        previousErrorValue={previousErrorValue}
        previousExecutionCount={previousExecutionCount}
        setCode={setCode}
        setPackages={setPackages}
        runCell={runCell}
        executionSteps={executionSteps}
        deleteCell={deleteCell}
        addCell={addCell}
        variablesStatus={variablesStatus}
        variables={variables}
        checkPackage={checkPackage}
        checkedPackages={checkedPackages}
        installPackage={installPackage}
        installLog={installLog}
        clearExecutionSteps={clearExecutionSteps}
        metadata={meta}
        setMetadata={setMeta}
        changeCellToMarkdown={changeCellToMarkdown}
        changeCellToCode={changeCellToCode}
        cellType={cell.model.sharedModel.cell_type}
        getCellCode={getCellCode}
        setEnv={setEnv}
      />
    </div>
  );
};

export class SelectRecipeWidget extends ReactWidget {
  private _setCodeCallback: (src: string) => void;
  private _setPackagesCallback: (packages: string[]) => void;
  private _runCellCallback: () => void;
  private _deleteCell: () => void;
  private _addCell: () => void;
  private _cell: Cell<ICellModel>;
  private _signal = new Signal<this, void>(this);
  private _previousCode: string = '';
  private _previousErrorName: string = '';
  private _previousErrorValue: string = '';
  private _previousExecutionCount: number = 0;
  private _executionSteps: [string, ExecutionStatus][] = [];
  private _variablesStatus: 'loading' | 'loaded' | 'error' | 'unknown' =
    'unknown';
  private _variables: IVariable[] = [];
  private _checkPackage: (pkg: string) => void;
  private _checkedPackages: Record<string, string>;
  private _installPackage: (
    installationName: string,
    importName: string
  ) => void;
  private _installLog: string;
  private _meta: any;
  private _setMeta: (m: any) => void;
  private _changeCellToMarkdown: () => void;
  private _changeCellToCode: () => void;
  private _setEnv: (envVariables: [string, string][]) => void;

  constructor(
    cell: Cell<ICellModel>,
    setCode: (src: string) => void,
    setPackages: (packages: string[]) => void,
    runCell: () => void,
    deleteCell: () => void,
    addCell: () => void,
    executionCount: number,
    meta: any,
    setMeta: (m: any) => void,
    changeCellToMarkdown: () => void,
    changeCellToCode: () => void,
    setEnv: (envVariables: [string, string][]) => void
  ) {
    super();
    this.addClass('jp-react-widget');
    this._cell = cell;
    this._setCodeCallback = setCode;
    this._setPackagesCallback = setPackages;
    this._runCellCallback = runCell;
    this._deleteCell = deleteCell;
    this._addCell = addCell;
    this._previousExecutionCount = executionCount;
    this._checkPackage = (pkg: string) => {};
    this._checkedPackages = {};
    this._installPackage = (installationName: string, importName: string) => {};
    this._installLog = '';
    this._meta = meta;
    this._setMeta = setMeta;
    this._changeCellToMarkdown = changeCellToMarkdown;
    this._changeCellToCode = changeCellToCode;
    this._setEnv = setEnv;
  }

  public setExecutionSteps(steps: [string, ExecutionStatus][]) {
    this._executionSteps = steps;
    this.updateWidget();
  }

  public setPreviousCode(src: string) {
    this._previousCode = src;
  }

  public setPreviousExecutionCount(cnt: number) {
    this._previousExecutionCount = cnt;
  }

  public setPreviousError(name: string, value: string) {
    this._previousErrorName = name;
    this._previousErrorValue = value;
  }

  public updateWidget() {
    this._signal.emit();
  }

  public setVariablesStatus(
    status: 'loading' | 'loaded' | 'error' | 'unknown'
  ) {
    this._variablesStatus = status;
  }

  public setVariables(variables: IVariable[]) {
    this._variables = variables;
    this.updateWidget();
  }

  public setCheckPackage(checkPackage: (pkg: string) => void) {
    this._checkPackage = checkPackage;
  }

  public setCheckedPackages(pkgs: Record<string, string>) {
    //console.log('set checked packages');
    //console.log({ pkgs });
    this._checkedPackages = pkgs;
    this.updateWidget();
  }

  public setInstallPackage(
    installPackage: (installationName: string, importName: string) => void
  ) {
    this._installPackage = installPackage;
  }

  public setInstallationLog(installLog: string) {
    this._installLog = installLog;
    this.updateWidget();
  }

  render(): JSX.Element {
    return (
      <UseSignal signal={this._signal}>
        {() => {
          return (
            <SelectRecipeComponent
              previousCode={this._previousCode}
              previousErrorName={this._previousErrorName}
              previousErrorValue={this._previousErrorValue}
              previousExecutionCount={this._previousExecutionCount}
              cell={this._cell}
              setCode={this._setCodeCallback}
              setPackages={this._setPackagesCallback}
              runCell={this._runCellCallback}
              executionSteps={this._executionSteps}
              deleteCell={this._deleteCell}
              addCell={this._addCell}
              variablesStatus={this._variablesStatus}
              variables={this._variables}
              checkPackage={this._checkPackage}
              checkedPackages={this._checkedPackages}
              installPackage={this._installPackage}
              installLog={this._installLog}
              clearExecutionSteps={() => this.setExecutionSteps([])}
              meta={this._meta}
              setMeta={this._setMeta}
              changeCellToMarkdown={this._changeCellToMarkdown}
              changeCellToCode={this._changeCellToCode}
              setEnv={this._setEnv}
            />
          );
        }}
      </UseSignal>
    );
  }
}
