define(["require", "exports", "aurelia-framework", "./ux-icon", "./ux-icon-theme"], function (require, exports, aurelia_framework_1, ux_icon_1, ux_icon_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxIcon = ux_icon_1.UxIcon;
    exports.UxIconTheme = ux_icon_theme_1.UxIconTheme;
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-icon'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map