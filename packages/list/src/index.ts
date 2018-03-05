import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxListTheme } from './ux-list-theme';
export { UxListItem } from './ux-list-item';
export { UxList } from './ux-list';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/list/ux-list'),
    PLATFORM.moduleName('@aurelia-ux/list/ux-list-item')
  ]);
}
