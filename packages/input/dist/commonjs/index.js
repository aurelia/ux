"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_input_theme_1 = require("./ux-input-theme");
exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input/ux-input')
    ]);
}
exports.configure = configure;
