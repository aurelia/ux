"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_input_info_theme_1 = require("./ux-input-info-theme");
exports.UxInputInfoTheme = ux_input_info_theme_1.UxInputInfoTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info/ux-input-info')
    ]);
}
exports.configure = configure;
