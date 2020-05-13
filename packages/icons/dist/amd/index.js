define(["require", "exports", "aurelia-framework", "./ux-icon", "./ux-icon-theme", "./ux-icon-map"], function (require, exports, aurelia_framework_1, ux_icon_1, ux_icon_theme_1, ux_icon_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxIcon = ux_icon_1.UxIcon;
    exports.UxIconTheme = ux_icon_theme_1.UxIconTheme;
    exports.UxIconMap = ux_icon_map_1.UxIconMap;
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
});
//# sourceMappingURL=index.js.map