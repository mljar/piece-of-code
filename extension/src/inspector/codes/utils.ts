// 
export const getVars = `_jupyterlab_variableinspector_dict_list()`;

export const installPackageConda = (pkg: string): string =>
  `
import sys
!conda install --yes --prefix {sys.prefix} -c conda-forge ${pkg}`;

export const installPackagePip = (pkg: string): string =>
  `
import sys
!{sys.executable} -m pip install ${pkg}`;

export const checkIfConda = `import sys
!conda list --prefix {sys.prefix}`;


export const checkPackageCode = (pkgInstallName: string, pkgImportName: string): string =>
  `
from importlib import __import__
try:
    try:
        print('{' + f'"package": "${pkgImportName}", "version": "{__import__(f"${pkgImportName}").__version__}"' + '}')
    except AttributeError:
        import importlib.metadata as __imeta__
        print('{' + f'"package": "${pkgImportName}", "version": "{__imeta__.version(f"${pkgInstallName}")}"' + '}')
except Exception:
    print('{"package": "${pkgImportName}", "version": "error"}')
  `;