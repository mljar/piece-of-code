import React from 'react';
import { ReactWidget, UseSignal } from '@jupyterlab/ui-components';

import {
  ActiveCellContextProvider,
  ActiveCellManager,

} from './contexts/activeCell';

import {
  VariablesContextProvider
} from './contexts/variables';
import { cakeIcon } from './icons';
import {
  PackagesContextProvider,
} from './contexts/packages';

import { PieceOfCodeComponent } from './selectRecipeLeftComponent';

import { Signal } from '@lumino/signaling';

class PieceOfCodeWidget extends ReactWidget {
  private _signal = new Signal<this, void>(this);
  private _activeCellManager: ActiveCellManager;

  constructor(activeCellManager: ActiveCellManager) {
    super();
    this._activeCellManager = activeCellManager;
  }

  public updateWidget() {
    this._signal.emit();
  }

  render(): JSX.Element {
    return (
      <div>
        <UseSignal signal={this._signal}>
          {() => (
            <>
              <ActiveCellContextProvider
                activeCellManager={this._activeCellManager}
              >
                <VariablesContextProvider
                  activeCellManager={this._activeCellManager}
                >
                  <PackagesContextProvider
                    activeCellManager={this._activeCellManager}
                    updateWidget={this.updateWidget.bind(this)}
                  >
                    <PieceOfCodeComponent />
                  </PackagesContextProvider>
                </VariablesContextProvider>
              </ActiveCellContextProvider>
            </>
          )}
        </UseSignal>
      </div>
    );
  }
}

export function createPocLeft(
  activeCellManager: ActiveCellManager
): PieceOfCodeWidget {
  const widget = new PieceOfCodeWidget(activeCellManager);
  widget.id = 'mljar::piece-of-code';
  widget.title.icon = cakeIcon;
  widget.title.caption = 'Piece of Code';

  return widget;
}
