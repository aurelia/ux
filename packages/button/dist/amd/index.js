define(["require", "exports", "aurelia-framework", "./ux-button-theme"], function (require, exports, aurelia_framework_1, ux_button_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button/ux-button')
        ]);
    }
    exports.configure = configure;
});
