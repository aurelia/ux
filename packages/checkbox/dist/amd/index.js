define(["require", "exports", "aurelia-framework", "./ux-checkbox-theme"], function (require, exports, aurelia_framework_1, ux_checkbox_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCheckboxTheme = ux_checkbox_theme_1.UxCheckboxTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
        ]);
    }
    exports.configure = configure;
});
