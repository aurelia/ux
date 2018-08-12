"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_button_theme_1 = require("./ux-button-theme");
exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button/ux-button')
    ]);
}
exports.configure = configure;
