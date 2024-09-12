import { LabIcon } from '@jupyterlab/ui-components';

import cakeSvgStr from '../style/icons/cake.svg';
import cakeOffSvgStr from '../style/icons/cakeoff.svg';
import mSvgStr from '../style/icons/m.svg';
import mljarStudioSvgStr from '../style/icons/mljarStudio.svg'; 

export const cakeIcon = new LabIcon({
  name: 'cake-icon',
  svgstr: cakeSvgStr
});

export const cakeOffIcon = new LabIcon({
  name: 'cake-off-icon',
  svgstr: cakeOffSvgStr
});

export const mIcon = new LabIcon({
  name: 'm-icon',
  svgstr: mSvgStr
});

export const mljarStudioIcon = new LabIcon({
  name: 'mljar-studio-icon',
  svgstr: mljarStudioSvgStr
});
