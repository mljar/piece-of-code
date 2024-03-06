import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';
import { NotebookPanel } from '@jupyterlab/notebook';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { ExtendedCellFactory } from './factory';
import { RecipeWidgetsRegistry } from './header';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

export const extendedCellFactory: JupyterFrontEndPlugin<NotebookPanel.IContentFactory> = {
  id: '@mljar/piece-of-code-cell-factory',
  provides: NotebookPanel.IContentFactory,
  requires: [IEditorServices, ILabShell, ISettingRegistry],
  autoStart: true,
  activate: (app: JupyterFrontEnd, editorServices: IEditorServices, labShell: ILabShell, settingRegistry: ISettingRegistry) => {
    const { commands } = app;
    RecipeWidgetsRegistry.getInstance().setCommandRegistry(commands);
    RecipeWidgetsRegistry.getInstance().setLabShell(labShell);
    RecipeWidgetsRegistry.getInstance().setSettingRegistry(settingRegistry);

    const editorFactory = editorServices.factoryService.newInlineEditor;
    return new ExtendedCellFactory({ editorFactory });
  }
};

