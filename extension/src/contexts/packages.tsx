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

var inspectors: Record<string, PackagesInspector> = {}; // panelId -> inspector
//var nbPackages: Record<string, Record<string, string>> = {}; // panelId -> (pkgImportName -> version/status)

export function PackagesContextProvider(
  props: PackagesContextProps
): JSX.Element {
  console.log('PACKAGES PROVIDER');
  const [packages, setPackages] = useState<Record<string, string>>({});

  const [panelId, setPanelId] = useState('');

  const checkPackage = (pkgInstallName: string, pkgImportName: string) => {
    console.log(
      'provider check package',
      pkgInstallName,
      pkgImportName,
      panelId
    );
    console.log(packages);

    if (!(pkgImportName in packages)) {
      if (panelId !== '' && panelId in inspectors) {
        const inspector = inspectors[panelId];
        console.log('run check');
        inspector.checkPackage(pkgInstallName, pkgImportName);
      }
    }
  };

  const setAvailablePackages = (pkgs: Record<string, string>) => {
    console.log('set available packages');
    console.log(pkgs);
    setPackages(pkgs);
    props.updateWidget();
  };

  useEffect(() => {
    const manager = props.activeCellManager;

    manager.activeCellChanged.connect((_, newActiveCell) => {
      console.log('active cell changed 2');

      const nbPanel = manager.notebookPanel();
      console.log('panelId', nbPanel?.id);

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

    manager.activeCellErrorChanged.connect((_, newActiveCellError) => {
      console.log('cell error');
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
