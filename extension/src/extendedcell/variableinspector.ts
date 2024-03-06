import { NotebookPanel } from "@jupyterlab/notebook";
import { KernelMessage } from '@jupyterlab/services';
import { IVariable } from "@mljar/recipes";

var notebooksInitialized: string[] = [];

const initCode = `import json
import sys
from importlib import __import__
from IPython import get_ipython
from IPython.core.magics.namespace import NamespaceMagics


_jupyterlab_variableinspector_nms = NamespaceMagics()
_jupyterlab_variableinspector_Jupyter = get_ipython()
_jupyterlab_variableinspector_nms.shell = _jupyterlab_variableinspector_Jupyter.kernel.shell

__np = None
__pd = None
__pyspark = None
__tf = None
__K = None
__torch = None
__ipywidgets = None
__xr = None


def _attempt_import(module):
    try:
        return __import__(module)
    except ImportError:
        return None


def _check_imported():
    global __np, __pd, __pyspark, __tf, __K, __torch, __ipywidgets, __xr

    __np = _attempt_import('numpy')
    __pd = _attempt_import('pandas')
    __pyspark = _attempt_import('pyspark')
    __tf = _attempt_import('tensorflow')
    __K = _attempt_import('keras.backend') or _attempt_import('tensorflow.keras.backend')
    __torch = _attempt_import('torch')
    __ipywidgets = _attempt_import('ipywidgets')
    __xr = _attempt_import('xarray')


def _jupyterlab_variableinspector_getsizeof(x):
    if type(x).__name__ in ['ndarray', 'Series']:
        return x.nbytes
    elif __pyspark and isinstance(x, __pyspark.sql.DataFrame):
        return "?"
    elif __tf and isinstance(x, __tf.Variable):
        return "?"
    elif __torch and isinstance(x, __torch.Tensor):
        return x.element_size() * x.nelement()
    elif __pd and type(x).__name__ == 'DataFrame':
        return x.memory_usage().sum()
    else:
        return sys.getsizeof(x)


def _jupyterlab_variableinspector_getshapeof(x):
    if __pd and isinstance(x, __pd.DataFrame):
        return "%d rows x %d cols" % x.shape
    if __pd and isinstance(x, __pd.Series):
        return "%d rows" % x.shape
    if __np and isinstance(x, __np.ndarray):
        shape = " x ".join([str(i) for i in x.shape])
        return "%s" % shape
    if __pyspark and isinstance(x, __pyspark.sql.DataFrame):
        return "? rows x %d cols" % len(x.columns)
    if __tf and isinstance(x, __tf.Variable):
        shape = " x ".join([str(int(i)) for i in x.shape])
        return "%s" % shape
    if __tf and isinstance(x, __tf.Tensor):
        shape = " x ".join([str(int(i)) for i in x.shape])
        return "%s" % shape
    if __torch and isinstance(x, __torch.Tensor):
        shape = " x ".join([str(int(i)) for i in x.shape])
        return "%s" % shape
    if __xr and isinstance(x, __xr.DataArray):
        shape = " x ".join([str(int(i)) for i in x.shape])
        return "%s" % shape
    if isinstance(x, list):
        return "%s" % len(x)
    if isinstance(x, dict):
        return "%s keys" % len(x)
    return None

def _jupyterlab_variableinspector_getcolumnsof(x):
    if __pd and isinstance(x, __pd.DataFrame):
        return list(x.columns)
    return []

def _jupyterlab_variableinspector_getcontentof(x):
    # returns content in a friendly way for python variables
    # pandas and numpy
    if __pd and isinstance(x, __pd.DataFrame):
        colnames = ', '.join(x.columns.map(str))
        content = "Columns: %s" % colnames
    elif __pd and isinstance(x, __pd.Series):
        content = str(x.values).replace(" ", ", ")[1:-1]
        content = content.replace("\\n", "")
    elif __np and isinstance(x, __np.ndarray):
        content = x.__repr__()
    elif __xr and isinstance(x, __xr.DataArray):
        content = x.values.__repr__()
    else:
        content = str(x)

    if len(content) > 150:
        return content[:150] + " ..."
    else:
        return content


def _jupyterlab_variableinspector_is_matrix(x):
    # True if type(x).__name__ in ["DataFrame", "ndarray", "Series"] else False
    if __pd and isinstance(x, __pd.DataFrame):
        return True
    if __pd and isinstance(x, __pd.Series):
        return True
    if __np and isinstance(x, __np.ndarray) and len(x.shape) <= 2:
        return True
    if __pyspark and isinstance(x, __pyspark.sql.DataFrame):
        return True
    if __tf and isinstance(x, __tf.Variable) and len(x.shape) <= 2:
        return True
    if __tf and isinstance(x, __tf.Tensor) and len(x.shape) <= 2:
        return True
    if __torch and isinstance(x, __torch.Tensor) and len(x.shape) <= 2:
        return True
    if __xr and isinstance(x, __xr.DataArray) and len(x.shape) <= 2:
        return True
    if isinstance(x, list):
        return True
    return False


def _jupyterlab_variableinspector_is_widget(x):
    return __ipywidgets and issubclass(x, __ipywidgets.DOMWidget)


def _jupyterlab_variableinspector_dict_list():
    _check_imported()
    def keep_cond(v):
        try:
            obj = eval(v)
            if isinstance(obj, str):
                return True
            if __tf and isinstance(obj, __tf.Variable):
                return True
            if __pd and __pd is not None and (
                isinstance(obj, __pd.core.frame.DataFrame)
                or isinstance(obj, __pd.core.series.Series)):
                return True
            if __xr and __xr is not None and isinstance(obj, __xr.DataArray):
                return True
            if str(obj)[0] == "<":
                return False
            if  v in ['__np', '__pd', '__pyspark', '__tf', '__K', '__torch', '__ipywidgets', '__xr']:
                return obj is not None
            if str(obj).startswith("_Feature"):
                # removes tf/keras objects
                return False
            return True
        except:
            return False
    values = _jupyterlab_variableinspector_nms.who_ls()
    vardic = [
        {
            'varName': _v,
            'varType': type(eval(_v)).__name__, 
            'varSize': str(_jupyterlab_variableinspector_getsizeof(eval(_v))), 
            'varShape': str(_jupyterlab_variableinspector_getshapeof(eval(_v))) if _jupyterlab_variableinspector_getshapeof(eval(_v)) else '', 
            'varContent': str(_jupyterlab_variableinspector_getcontentof(eval(_v))), 
            'isMatrix': _jupyterlab_variableinspector_is_matrix(eval(_v)),
            'isWidget': _jupyterlab_variableinspector_is_widget(type(eval(_v))),
            'varColumns': _jupyterlab_variableinspector_getcolumnsof(eval(_v)),
        }
        for _v in values if keep_cond(_v)
    ]
    return json.dumps(vardic, ensure_ascii=False)


def _jupyterlab_variableinspector_getmatrixcontent(x, max_rows=10000):
    # to do: add something to handle this in the future
    threshold = max_rows

    if __pd and __pyspark and isinstance(x, __pyspark.sql.DataFrame):
        df = x.limit(threshold).toPandas()
        return _jupyterlab_variableinspector_getmatrixcontent(df.copy())
    elif __np and __pd and type(x).__name__ == "DataFrame":
        if threshold is not None:
            x = x.head(threshold)
        x.columns = x.columns.map(str)
        return x.to_json(orient="table", default_handler=_jupyterlab_variableinspector_default, force_ascii=False)
    elif __np and __pd and type(x).__name__ == "Series":
        if threshold is not None:
            x = x.head(threshold)
        return x.to_json(orient="table", default_handler=_jupyterlab_variableinspector_default, force_ascii=False)
    elif __np and __pd and type(x).__name__ == "ndarray":
        df = __pd.DataFrame(x)
        return _jupyterlab_variableinspector_getmatrixcontent(df)
    elif __tf and (isinstance(x, __tf.Variable) or isinstance(x, __tf.Tensor)):
        df = __K.get_value(x)
        return _jupyterlab_variableinspector_getmatrixcontent(df)
    elif __torch and isinstance(x, __torch.Tensor):
        df = x.cpu().numpy()
        return _jupyterlab_variableinspector_getmatrixcontent(df)
    elif __xr and isinstance(x, __xr.DataArray):
        df = x.to_numpy()
        return _jupyterlab_variableinspector_getmatrixcontent(df)
    elif isinstance(x, list):
        s = __pd.Series(x)
        return _jupyterlab_variableinspector_getmatrixcontent(s)


def _jupyterlab_variableinspector_displaywidget(widget):
    display(widget)


def _jupyterlab_variableinspector_default(o):
    if isinstance(o, __np.number): return int(o)  
    raise TypeError


def _jupyterlab_variableinspector_deletevariable(x):
    exec("del %s" % x, globals())`;

const getVars = `_jupyterlab_variableinspector_dict_list()`;

var checkedPackages: Record<string, Record<string, string>> = {};

const checkPackageCode = (pkg: string): string =>
  `
from importlib import __import__
try:
    print('{' + f'"package": "${pkg}", "version": "{__import__("${pkg}").__version__}"' + '}')
except ImportError:
  print('{"package": "${pkg}", "version": "error"}')`;


const installPackageConda = (pkg: string): string =>
  `import sys
!conda install --yes --prefix {sys.prefix} ${pkg}`;

const installPackagePip = (pkg: string): string =>
  `import sys
!{sys.executable} -m pip install ${pkg}`;

const checkIfConda = `import sys
!conda list --prefix {sys.prefix}`;

var notebookPackageManager: Record<string, 'conda' | 'pip'> = {};

export class VariableInspector {

  private _notebook: NotebookPanel | null;
  private _notebookId: string | undefined;
  private _setVariablesStatus: (status: "loading" | "loaded" | "error" | "unknown") => void;
  private _setVariables: (variables: IVariable[]) => void;
  private _setInstalledPackages: (pkgs: Record<string, string>) => void;

  constructor(nb: NotebookPanel | null,
    setVariablesStatus: (status: "loading" | "loaded" | "error" | "unknown") => void,
    setVariables: (variables: IVariable[]) => void,
    setInstalledPackages: (pkgs: Record<string, string>) => void) {
    this._notebook = nb;
    this._notebookId = this._notebook?.id;
    this._setVariablesStatus = setVariablesStatus;
    this._setVariables = setVariables;
    this._setInstalledPackages = setInstalledPackages;
  }

  async getVariables() {
    console.log('get variables');
    try {
      this.checkPackageManager();

      this._setVariablesStatus("loading");
      this._setVariables([]);

      let code = '';
      console.log(this._notebookId);
      console.log(notebooksInitialized);
      if (this._notebookId && !notebooksInitialized.includes(this._notebookId)) {
        console.log('init getVariables');
        code += initCode + '\n\n';

      }
      code += getVars;
      await this._notebook?.sessionContext.ready;

      let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
        code,
        store_history: false,
      });
      console.log({ future });
      if (future) {
        future.onIOPub = this._onIOPub;
      }
    } catch (e) {
      console.log(e);
    }

  }

  private _onIOPub = (msg: KernelMessage.IIOPubMessage): void => {
    console.log(msg);
    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':

        interface ContentData {
          data: {
            'text/plain': string;
          }
        }
        const content = msg.content as ContentData;
        console.log(content);
        try {
          let contentDisplay: string = content.data["text/plain"] as string;
          contentDisplay = contentDisplay.slice(1, -1);
          contentDisplay = contentDisplay
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'");

          console.log('get variables', contentDisplay);
          const variables: IVariable[] = JSON.parse(contentDisplay);
          console.log(variables);
          this._setVariables(variables);
          this._setVariablesStatus("loaded");
          if (this._notebookId && !notebooksInitialized.includes(this._notebookId)) {
            notebooksInitialized.push(this._notebookId);
          }
        } catch (e) {
          console.log(e);
          this._setVariables([]);
          this._setVariablesStatus("error");
        }

        break;
      default:
        break;
    }
    return;
  };

  checkPackage(pkg: string): void {
    this.checkPackageManager();

    if (this._notebookId) {
      if (this._notebookId in checkedPackages && pkg in checkedPackages[this._notebookId]) {
        // const version = checkedPackages[this._notebookId][pkg];
        this._setInstalledPackages(checkedPackages[this._notebookId]);
      } else {
        let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
          code: checkPackageCode(pkg),
          store_history: false,
        });
        if (future) {
          future.onIOPub = this._onCheckPackage;
        }
      }
    }

  }

  private _onCheckPackage = (msg: KernelMessage.IIOPubMessage): void => {

    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'stream':
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':
        interface ContentData {
          text: string;
        }
        const content = msg.content as ContentData;
        //console.log(content.text);

        interface IPackage {
          package: string;
          version: string;
        }
        try {
          console.log('check package', content.text);
          const p: IPackage = JSON.parse(content.text);

          if (this._notebookId) {
            if (!(this._notebookId in checkedPackages)) {
              checkedPackages[this._notebookId] = { [p.package]: p.version }
            } else {
              checkedPackages[this._notebookId][p.package] = p.version;
            }
            this._setInstalledPackages(checkedPackages[this._notebookId]);
          }
        } catch (e) {
          console.log(e);
        }

        break;
      default:
        break;
    }
    return;
  };


  installPackage(installationName: string, importName: string) {
    let packageManager: 'conda' | 'pip' = 'conda';
    if (this._notebookId && this._notebookId in notebookPackageManager) {
      packageManager = notebookPackageManager[this._notebookId];
    }

    this._installPackagePackageManager(installationName, importName, packageManager);
  }

  private _installPackagePackageManager(installationName: string, importName: string, packageManager: 'conda' | 'pip') {
    console.log('Install', importName, 'with', packageManager);
    if (this._notebookId) {
      if (!(this._notebookId in checkedPackages)) {
        checkedPackages[this._notebookId] = { [importName]: 'install' }
      } else {
        checkedPackages[this._notebookId][importName] = 'install';
      }
      this._setInstalledPackages(checkedPackages[this._notebookId]);
    }

    let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
      code: packageManager === 'conda' ? installPackageConda(installationName) : installPackagePip(installationName),
      store_history: false,
    });
    if (future) {
      // will be needed to collect logs from installation
      // future.onIOPub = this._onInstallPackage;
      future.done.then(() => {
        if (this._notebookId && this._notebookId in checkedPackages) {
          // delete all packages, we need to re-check all packages again
          // there might be dependencies
          delete checkedPackages[this._notebookId]; //[importName];
          this.checkPackage(importName);
        }
      })
    }
  }


  // private _onInstallPackage = (msg: KernelMessage.IIOPubMessage): void => {
  //   const msgType = msg.header.msg_type;
  //   switch (msgType) {
  //     case 'stream':
  //     case 'execute_result':
  //     case 'display_data':
  //     case 'update_display_data':
  //       interface ContentData {
  //         name: string;
  //         text: string;
  //       }
  //       const content = msg.content as ContentData;
  //       //console.log(content);
  //       break;
  //     default:
  //       break;
  //   }
  //   return;
  // };


  checkPackageManager() {
    // if already checked, then skip this step
    if (this._notebookId && this._notebookId in notebookPackageManager) {
      return;
    }
    console.log('Check package manager');
    let future = this._notebook?.sessionContext.session?.kernel?.requestExecute({
      code: checkIfConda,
      store_history: false,
    });
    if (future) {
      future.onIOPub = this._onCheckPackageManager;
    }
  }


  private _onCheckPackageManager = (msg: KernelMessage.IIOPubMessage): void => {
    const msgType = msg.header.msg_type;
    switch (msgType) {
      case 'stream':
      case 'execute_result':
      case 'display_data':
      case 'update_display_data':

        interface ContentData {
          name: string;
          text: string;
        }
        const content = msg.content as ContentData;

        if (this._notebookId) {
          //                     n(N)ot a conda environment
          if (content.text.includes('ot a conda environment')) {
            notebookPackageManager[this._notebookId] = 'pip';
          } else {
            notebookPackageManager[this._notebookId] = 'conda';
          }
        }

        break;
      default:
        break;
    }
    return;
  };
}
