import React, { useState, useContext, useEffect } from 'react';

import { ActiveCellManager } from './activeCell';
import { PackagesInspector } from '../inspector/packagesInspector';

type PackagesContextValue = {
  packages: Record<string, string>;
  checkPackage: (pkgInstallName: string, pkgImportName: string) => void;
};

const defaultPackagesContext: PackagesContextValue = {
  packages: {},
  checkPackage: (pkgInstallName: string, pkgImportName: string) => {}
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

  const [packages, setPackages] = useState<Record<string, string>>({});
  const [panelId, setPanelId] = useState('');

  const checkPackage = (pkgInstallName: string, pkgImportName: string) => {
    if (!(pkgImportName in packages)) {
      if (panelId !== '' && panelId in inspectors) {
        const inspector = inspectors[panelId];
        inspector.checkPackage(pkgInstallName, pkgImportName);
      }
    }
  };

  const setAvailablePackages = (pkgs: Record<string, string>) => {
    setPackages(pkgs);
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
            setAvailablePackages
          );
          inspectors[nbPanel.id] = inspector;
        }
      }
    });

  }, [props.activeCellManager]);

  useEffect(() => {
    setPackages({});
  }, [panelId]);

  return (
    <PackagesContext.Provider
      value={{
        packages,
        checkPackage
      }}
    >
      {props.children}
    </PackagesContext.Provider>
  );
}

export function usePackagesContext(): PackagesContextValue {
  const { packages, checkPackage } = useContext(PackagesContext);

  return {
    packages,
    checkPackage
  };
}
