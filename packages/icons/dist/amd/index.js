define(["require", "exports", "aurelia-framework", "./ux-icon-theme"], function (require, exports, aurelia_framework_1, ux_icon_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxIconTheme = ux_icon_theme_1.UxIconTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/icons/ux-icon')
        ]);
    }
    exports.configure = configure;
});
