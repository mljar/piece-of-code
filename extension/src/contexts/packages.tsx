import React, { useState, useContext, useEffect } from 'react';

import { ActiveCellManager } from './activeCell';
import { PackagesInspector } from '../inspector/packagesInspector';

type PackagesContextValue = {
  packages: Record<string, string>;
  installLog: string;
  checkPackage: (pkgInstallName: string, pkgImportName: string) => void;
  installPackage: (pkgInstallName: string, pkgImportName: string) => void;
};

const defaultPackagesContext: PackagesContextValue = {
  packages: {},
  installLog: '',
  checkPackage: (pkgInstallName: string, pkgImportName: string) => {},
  installPackage: (pkgInstallName: string, pkgImportName: string) => {}
};

const PackagesContext = React.createContext<PackagesContextValue>(
  defaultPackagesContext
);

type PackagesContextProps = {
  activeCellManager: ActiveCellManager;
  updateWidget: () => void;
  children: React.ReactNode;
};

var inspectors: Record<string, PackagesInspector> = {}; // panelId -> PackagesInspector

export function PackagesContextProvider(
  props: PackagesContextProps
): JSX.Element {
  const [panelId, setPanelId] = useState('');
  const [packages, setPackages] = useState<Record<string, string>>({});
  const [installLog, setInstallLogState] = useState('');

  const checkPackage = (pkgInstallName: string, pkgImportName: string) => {
    if (!(pkgImportName in packages)) {
      if (panelId !== '' && panelId in inspectors) {
        const inspector = inspectors[panelId];
        inspector.checkPackage(pkgInstallName, pkgImportName);
      }
    }
  };

  const installPackage = (pkgInstallName: string, pkgImportName: string) => {
    if (panelId !== '' && panelId in inspectors) {
      const inspector = inspectors[panelId];
      inspector.installPackage(pkgInstallName, pkgImportName);
    }
  };

  const setAvailablePackages = (pkgs: Record<string, string>) => {
    setPackages(pkgs);
    props.updateWidget();
  };

  const setInstallLog = (log: string) => {
    setInstallLogState(log);
    props.updateWidget();
  };

  useEffect(() => {
    const manager = props.activeCellManager;

    manager.activeCellChanged.connect((_, newActiveCell) => {
      const nbPanel = manager.notebookPanel();
      if (nbPanel) {
        setPanelId(nbPanel.id);
        if (!(nbPanel.id in inspectors)) {
          const inspector = new PackagesInspector(
            nbPanel,
            setAvailablePackages,
            setInstallLog
          );
          inspectors[nbPanel.id] = inspector;
        }
      }
    });
  }, [props.activeCellManager]);

  useEffect(() => {
    setPackages({});
    setInstallLog('');
  }, [panelId]);

  return (
    <PackagesContext.Provider
      value={{
        packages,
        installLog,
        checkPackage,
        installPackage
      }}
    >
      {props.children}
    </PackagesContext.Provider>
  );
}

export function usePackagesContext(): PackagesContextValue {
  const { packages, installLog, checkPackage, installPackage } =
    useContext(PackagesContext);

  return {
    packages,
    installLog,
    checkPackage,
    installPackage
  };
}
