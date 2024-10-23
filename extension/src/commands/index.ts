import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { runIcon } from "@jupyterlab/ui-components";
import { cakeIcon, cakeOffIcon } from '../icons';

import { getAlwaysOpen, setAlwaysOpen } from '../flags';

import { ISessionContext, ISessionContextDialogs } from '@jupyterlab/apputils';

import { INotebookTracker, Notebook, NotebookActions } from '@jupyterlab/notebook';

import { ITranslator } from '@jupyterlab/translation';


const CommandIds = {
  openPieceOfCode: '@mljar/pieceofcode:open',
  hidePieceOfCode: '@mljar/pieceofcode:hide',
  runFirstCell: '@mljar/pieceofcode:runfirstcell',
  runCurrentCell: '@mljar/pieceofcode:runcurrentcell',
};

const showButton = (title = 'open'): void => {
  const elements = document.querySelectorAll(
    `[data-command="@mljar/pieceofcode:${title}"]`
  );
  elements.forEach((e: Element) => {
    e.classList.remove('lm-mod-hidden');
  });
};

const hideButton = (title = 'open'): void => {
  const elements = document.querySelectorAll(
    `[data-command="@mljar/pieceofcode:${title}"]`
  );
  elements.forEach((e: Element) => {
    e.classList.add('lm-mod-hidden');
  });
};

export const commandsPlugin: JupyterFrontEndPlugin<void> = {
  id: '@mljar/pieceofcode:commands',
  description: 'Commands used in Piece of Code',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    const { commands } = app;

    commands.addCommand(CommandIds.openPieceOfCode, {
      icon: cakeIcon,
      caption: 'Open Piece of Code',
      execute: () => {
        setAlwaysOpen(true);
        showButton('hide');
        hideButton('open');
      },
      isVisible: () => !getAlwaysOpen()
    });

    commands.addCommand(CommandIds.hidePieceOfCode, {
      icon: cakeOffIcon,
      caption: 'Hide Piece of Code',
      execute: () => {
        setAlwaysOpen(false);
        showButton('open');
        hideButton('hide');
      },
      isVisible: () => getAlwaysOpen()
    });

    app.commands.addCommand(CommandIds.runFirstCell, {
      label: 'Execute first cell',
      execute: () => {
        const nb = tracker.currentWidget;
        if (nb) {
          return runCell(nb.content, nb.context.sessionContext, 0);
        }
      }
    });
    
    app.commands.addCommand(CommandIds.runCurrentCell, {
      icon: runIcon,
      label: 'Execute current cell',
      execute: () => {
        const nb = tracker.currentWidget;
        if (nb) {
          return runCell(nb.content, nb.context.sessionContext);
        }
      }
    });
    
  }
};

export function runCell(
  notebook: Notebook,
  sessionContext?: ISessionContext,
  cellIndex?: number,
  sessionDialogs?: ISessionContextDialogs,
  translator?: ITranslator,
) {
  if (!notebook.model || !notebook.activeCell) {
    return Promise.resolve(false);
  }
  if(cellIndex === undefined) {
    cellIndex = notebook.activeCellIndex
  }
  const cells = [notebook.widgets[cellIndex]];
  const promise = NotebookActions.runCells(
    notebook,
    cells,
    sessionContext,
    sessionDialogs,
    translator
  );
  return promise;
}