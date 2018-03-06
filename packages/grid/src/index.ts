import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxResponsiveUtilities } from './ux-responsive-utilities';
export { UxGridTheme } from './ux-grid-theme';
export { UxGrid } from './ux-grid';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/grid/ux-grid')
  ]);
}
