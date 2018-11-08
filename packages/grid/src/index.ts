import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxResponsiveUtilities } from './ux-responsive-utilities';
export { UxGridTheme } from './ux-grid-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/grid/ux-grid'),
    PLATFORM.moduleName('@aurelia-ux/grid/ux-grid-cell')
  ]);
}
