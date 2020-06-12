"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_slider_theme_1 = require("./ux-slider-theme");
Object.defineProperty(exports, "UxSliderTheme", { enumerable: true, get: function () { return ux_slider_theme_1.UxSliderTheme; } });
var ux_slider_1 = require("./ux-slider");
Object.defineProperty(exports, "UxSlider", { enumerable: true, get: function () { return ux_slider_1.UxSlider; } });
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-slider'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map