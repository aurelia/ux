import { FrameworkConfiguration } from 'aurelia-framework';
import { UxIcon } from './ux-icon';
export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };
import { UxIconMap, UxIconRegObject, UxIconRegArray } from './ux-icon-map';
export { UxIconMap, UxIconRegObject, UxIconRegArray };
export interface UxIconConfiguration {
    icons?: Array<UxIconRegObject>;
    defaultIconWidth?: number;
    defaultIconHeight?: number;
}
export declare function configure(config: FrameworkConfiguration, iconsOrConfig?: UxIconConfiguration | Array<UxIconRegObject>): void;
