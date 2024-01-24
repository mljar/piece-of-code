import { LabIcon } from '@jupyterlab/ui-components';

import cakeSvgStr from '../style/icons/cake.svg';
import cakeOffSvgStr from '../style/icons/cakeoff.svg';

export const cakeIcon = new LabIcon({
  name: 'cake-icon',
  svgstr: cakeSvgStr
});

export const cakeOffIcon = new LabIcon({
  name: 'cake-off-icon',
  svgstr: cakeOffSvgStr
});
