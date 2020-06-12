define(["require", "exports", "aurelia-framework", "./ux-slider-theme", "./ux-slider"], function (require, exports, aurelia_framework_1, ux_slider_theme_1, ux_slider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxSliderTheme", { enumerable: true, get: function () { return ux_slider_theme_1.UxSliderTheme; } });
    Object.defineProperty(exports, "UxSlider", { enumerable: true, get: function () { return ux_slider_1.UxSlider; } });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-slider'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map