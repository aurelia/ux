"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_slider_theme_1 = require("./ux-slider-theme");
exports.UxSliderTheme = ux_slider_theme_1.UxSliderTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider/ux-slider')
    ]);
}
exports.configure = configure;
