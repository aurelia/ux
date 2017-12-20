define(["require", "exports", "aurelia-framework", "./ux-radio-theme"], function (require, exports, aurelia_framework_1, ux_radio_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxRadioTheme = ux_radio_theme_1.UxRadioTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
        ]);
    }
    exports.configure = configure;
});
