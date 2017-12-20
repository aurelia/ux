define(["require", "exports", "aurelia-framework", "./ux-input-theme"], function (require, exports, aurelia_framework_1, ux_input_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input/ux-input')
        ]);
    }
    exports.configure = configure;
});
