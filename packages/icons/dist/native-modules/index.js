import { PLATFORM } from 'aurelia-framework';
import { UxIcon } from './ux-icon';
export { UxIconTheme } from './ux-icon-theme';
export { UxIcon };
import { UxIconMap } from './ux-icon-map';
export { UxIconMap };
export function configure(config, iconsOrConfig) {
    config.globalResources(PLATFORM.moduleName('./ux-icon'));
    var uxConfig = {};
    if (Array.isArray(iconsOrConfig) && iconsOrConfig.length > 0) {
        uxConfig.icons = iconsOrConfig;
    }
    else if (typeof iconsOrConfig === 'object') {
        uxConfig = iconsOrConfig;
    }
    var uxIconMap = config.container.get(UxIconMap);
    if (typeof uxConfig.defaultIconWidth === 'number') {
        uxIconMap.defaultIconWidth = uxConfig.defaultIconWidth;
    }
    if (typeof uxConfig.defaultIconHeight === 'number') {
        uxIconMap.defaultIconHeight = uxConfig.defaultIconHeight;
    }
    if (uxConfig.icons) {
        uxIconMap.registerIcons(uxConfig.icons);
    }
}
//# sourceMappingURL=index.js.map