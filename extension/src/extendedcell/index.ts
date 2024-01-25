import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { NotebookPanel } from '@jupyterlab/notebook';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { ExtendedCellFactory } from './factory';

export const extendedCellFactory: JupyterFrontEndPlugin<NotebookPanel.IContentFactory> = {
  id: '@mljar/piece-of-code-cell-factory',
  provides: NotebookPanel.IContentFactory,
  requires: [IEditorServices],
  autoStart: true,
  activate: (app: JupyterFrontEnd, editorServices: IEditorServices) => {
    console.log('POC content factory is activated!');
    const editorFactory = editorServices.factoryService.newInlineEditor;
    return new ExtendedCellFactory({ editorFactory });
  }
};

