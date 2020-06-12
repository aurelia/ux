"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxIconMap = exports.UxIcon = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_icon_1 = require("./ux-icon");
Object.defineProperty(exports, "UxIcon", { enumerable: true, get: function () { return ux_icon_1.UxIcon; } });
var ux_icon_theme_1 = require("./ux-icon-theme");
Object.defineProperty(exports, "UxIconTheme", { enumerable: true, get: function () { return ux_icon_theme_1.UxIconTheme; } });
var ux_icon_map_1 = require("./ux-icon-map");
Object.defineProperty(exports, "UxIconMap", { enumerable: true, get: function () { return ux_icon_map_1.UxIconMap; } });
function configure(config, iconsOrConfig) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-icon'));
    var uxConfig = {};
    if (Array.isArray(iconsOrConfig) && iconsOrConfig.length > 0) {
        uxConfig.icons = iconsOrConfig;
    }
    else if (typeof iconsOrConfig === 'object') {
        uxConfig = iconsOrConfig;
    }
    var uxIconMap = config.container.get(ux_icon_map_1.UxIconMap);
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
exports.configure = configure;
//# sourceMappingURL=index.js.map