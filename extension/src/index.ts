import {
  ILabShell,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  IThemeManager,
  ThemeManager
} from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { commandsPlugin } from './commands';
// import { extendedCellFactory } from './extendedcell';
import { setAlwaysOpen } from './flags';
/**
 * Initialization data for the pieceofcode extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pieceofcode:plugin',
  description: 'Write code with UI.',
  autoStart: true,
  optional: [ISettingRegistry, IThemeManager, ILabShell],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null,
    themeManager: IThemeManager,
    labShell: ILabShell
  ) => {
    console.log('Piece of Code extension is activated!');

    const { commands } = app;
    RecipeWidgetsRegistry.getInstance().setCommandRegistry(commands);
    RecipeWidgetsRegistry.getInstance().setLabShell(labShell);
    if (settingRegistry) {
      RecipeWidgetsRegistry.getInstance().setSettingRegistry(settingRegistry);
    }


    const tm = themeManager as ThemeManager;
    if (tm) {
      if (!tm.isToggledThemeScrollbars())
        tm.toggleThemeScrollbars();
    }
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
          // console.log('pieceofcode settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for pieceofcode.', reason);
        });
    }
  }
};


import { ITranslator } from '@jupyterlab/translation';
import {
  Dialog,
  ISplashScreen
} from '@jupyterlab/apputils';
// import { jupyterFaviconIcon } from '@jupyterlab/ui-components';
import { Throttler } from '@lumino/polling';
import { DisposableDelegate } from '@lumino/disposable';
import { mljarStudioIcon } from './icons';

const SPLASH_RECOVER_TIMEOUT = 12000;

const splash: JupyterFrontEndPlugin<ISplashScreen> = {
  id: '@jupyterlab/apputils-extension:splash2',
  description: 'Provides the splash screen.',
  autoStart: true,
  requires: [ITranslator],
  provides: ISplashScreen,
  activate: (app: JupyterFrontEnd, translator: ITranslator) => {
    const trans = translator.load('jupyterlab');
    const { commands, restored } = app;

    // Create splash element and populate it.
    const splash = document.createElement('div');
    const logo = document.createElement('div');

    splash.id = 'jupyterlab-splash';
    logo.id = 'main-logo';

    mljarStudioIcon.element({
      container: logo,
      stylesheet: 'splash'
    });
    splash.appendChild(logo);

    // Create debounced recovery dialog function.
    let dialog: Dialog<unknown> | null;
    const recovery = new Throttler(
      async () => {
        if (dialog) {
          return;
        }
        dialog = new Dialog({
          title: trans.__('Loading…'),
          body: trans.__(`The loading screen is taking a long time.
Would you like to clear the workspace or keep waiting?`),
          buttons: [
            Dialog.cancelButton({ label: trans.__('Keep Waiting') }),
            Dialog.warnButton({ label: trans.__('Clear Workspace') })
          ]
        });

        try {
          const result = await dialog.launch();
          dialog.dispose();
          dialog = null;
          if (result.button.accept && commands.hasCommand('apputils:reset')) {
            return commands.execute('apputils:reset');
          }

          // Re-invoke the recovery timer in the next frame.
          requestAnimationFrame(() => {
            // Because recovery can be stopped, handle invocation rejection.
            void recovery.invoke().catch(_ => undefined);
          });
        } catch (error) {
          /* no-op */
        }
      },
      { limit: SPLASH_RECOVER_TIMEOUT, edge: 'trailing' }
    );

    // Return ISplashScreen.
    let splashCount = 0;
    return {
      show: (light = true) => {
        splash.classList.remove('splash-fade');
        //splash.classList.toggle('light', light);
        //splash.classList.toggle('dark', !light);
        splashCount++;
        document.body.appendChild(splash);

        // Because recovery can be stopped, handle invocation rejection.
        void recovery.invoke().catch(_ => undefined);

        return new DisposableDelegate(async () => {
          await restored;
          if (--splashCount === 0) {
            void recovery.stop();

            if (dialog) {
              dialog.dispose();
              dialog = null;
            }
            splash.classList.add('splash-fade');
            window.setTimeout(() => {
              document.body.removeChild(splash);
            }, 3000);
          }
        });
      }
    };
  }
};


import { createPocLeft } from './selectRecipeLeft';
import { ActiveCellManager } from './contexts/activeCell';
import { RecipeWidgetsRegistry } from './extendedcell/header';


const pocLeft: JupyterFrontEndPlugin<void> = {
  id: '@mljar/pocLeft',
  autoStart: true,
  activate: async (
    app: JupyterFrontEnd
  ) => {


    const activeCellManager = new ActiveCellManager(app.shell);

    let widget = createPocLeft(activeCellManager);


    /**
     * Add Chat widget to right sidebar
     */
    app.shell.add(widget, 'left', { rank: 2000 });

  }
};



// extendedCellFactory
const plugins: JupyterFrontEndPlugin<any>[] = [plugin, commandsPlugin, splash, pocLeft];

export default plugins;
