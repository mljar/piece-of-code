import { RecipeWidgetsRegistry } from "./extendedcell/header";

const ALWAYS_OPEN_FLAG = 'alwaysOpenPieceOfCode';

const setFlag = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getFlag = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setAlwaysOpen = (value: boolean): void => {
  setFlag(ALWAYS_OPEN_FLAG, value.toString());
  if (value) {
    RecipeWidgetsRegistry.getInstance().showLastSelectedCellId();
  } else {
    RecipeWidgetsRegistry.getInstance().hideAll();
  }
};

export const getAlwaysOpen = (): boolean => {
  const f = getFlag(ALWAYS_OPEN_FLAG);
  if (f === null) {
    return true;
  }
  return f === 'true';
};
