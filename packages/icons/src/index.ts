import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';

export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };

import { UxIconMap, UxIconRegObject, UxIconRegArray } from './ux-icon-map';
export { UxIconMap, UxIconRegObject, UxIconRegArray };

export function configure(config: FrameworkConfiguration, icons?: Array<UxIconRegObject>) {
  config.globalResources(PLATFORM.moduleName('./ux-icon'));
  if (Array.isArray(icons) && icons.length > 0) {
    config.container.get(UxIconMap).registerIcons(icons);
  }
}
