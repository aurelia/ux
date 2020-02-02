import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';

export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };

import { UxIconMap } from './ux-icon-map';
export { UxIconMap };

export function configure(config: FrameworkConfiguration, icons?: Array<{name: string, material: string}>) {
  config.globalResources(PLATFORM.moduleName('./ux-icon'));
  if (Array.isArray(icons) && icons.length > 0 && typeof icons[0].name === 'string' && typeof icons[0].material === 'string') {
    UxIconMap.registerIcons(icons);
  }
}
