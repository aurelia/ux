import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';

export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };

import { UxIconMap, UxIconRegObject, UxIconRegArray } from './ux-icon-map';
export { UxIconMap, UxIconRegObject, UxIconRegArray };

export interface UxIconConfiguration {
  icons?: Array<UxIconRegObject>;
  loadFullSet?: boolean;
  defaultIconWidth?: number;
  defaultIconHeight?: number;
}

export function configure(
  config: FrameworkConfiguration, iconsOrConfig?: UxIconConfiguration | Array<UxIconRegObject>) {
  config.globalResources(PLATFORM.moduleName('./ux-icon'));
  let uxConfig: UxIconConfiguration = {};
  if (Array.isArray(iconsOrConfig) && iconsOrConfig.length > 0) {
    uxConfig.icons = iconsOrConfig;
  } else if (typeof iconsOrConfig === 'object') {
    uxConfig = iconsOrConfig as UxIconConfiguration;
  }
  const uxIconMap = config.container.get(UxIconMap);
  if (typeof uxConfig.defaultIconWidth === 'number') {
    uxIconMap.defaultIconWidth = uxConfig.defaultIconWidth;
  }
  if (typeof uxConfig.defaultIconHeight === 'number') {
    uxIconMap.defaultIconHeight = uxConfig.defaultIconHeight;
  }
  if (uxConfig.icons) {
    uxIconMap.registerIcons(uxConfig.icons);
  }
  if (uxConfig.loadFullSet) {
    return uxIconMap.loadFullSet();
  }
  return;
}
