import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaUX } from './aurelia-ux';
export { swatches } from './colors/swatches';
export { UxButtonTheme } from './button/ux-button-theme';
export * from './styles/decorators';
export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';
export declare function configure(config: FrameworkConfiguration, callback?: (config: AureliaUX) => Promise<any>): Promise<void>;
