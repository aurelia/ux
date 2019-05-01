define(["require", "exports", "aurelia-framework", "./ux-slider-theme"], function (require, exports, aurelia_framework_1, ux_slider_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxSliderTheme = ux_slider_theme_1.UxSliderTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider/ux-slider')
        ]);
    }
    exports.configure = configure;
});
