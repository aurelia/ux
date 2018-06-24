import { FrameworkConfiguration } from 'aurelia-framework';
import { UxGrid } from './ux-grid';

export { UxGridTheme } from './ux-grid-theme';
export { UxResponsiveUtilities } from './ux-responsive-utilities';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(UxGrid);
}
