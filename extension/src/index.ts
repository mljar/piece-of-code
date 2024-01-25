import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { commandsPlugin } from './commands';
import { extendedCellFactory } from './extendedcell';
import { setAlwaysOpen } from './flags';
/**
 * Initialization data for the pieceofcode extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pieceofcode:plugin',
  description: 'Write code with UI.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log('JupyterLab extension pieceofcode is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          const updateSettings = (): void => {
            const alwaysOpen = settings.get('alwaysOpenPieceOfCode')
              .composite as boolean;
            if (alwaysOpen !== undefined) {
              setAlwaysOpen(alwaysOpen);
            }
          };
          updateSettings();
          settings.changed.connect(updateSettings);
          console.log('pieceofcode settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for pieceofcode.', reason);
        });
    }
  }
};

const plugins: JupyterFrontEndPlugin<any>[] = [plugin, commandsPlugin, extendedCellFactory];

export default plugins;
