define(["require", "exports", "aurelia-framework", "./ux-input-info-theme"], function (require, exports, aurelia_framework_1, ux_input_info_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxInputInfoTheme = ux_input_info_theme_1.UxInputInfoTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info/ux-input-info')
        ]);
    }
    exports.configure = configure;
});
