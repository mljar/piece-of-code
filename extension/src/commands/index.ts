import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { cakeIcon, cakeOffIcon } from '../icons';
import { INotebookTracker } from '@jupyterlab/notebook';
import { getAlwaysOpen, setAlwaysOpen } from '../flags';

const CommandIds = {
  openPieceOfCode: '@mljar/pieceofcode:open',
  hidePieceOfCode: '@mljar/pieceofcode:hide'
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
  }
};
