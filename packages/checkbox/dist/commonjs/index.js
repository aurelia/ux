"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_checkbox_theme_1 = require("./ux-checkbox-theme");
exports.UxCheckboxTheme = ux_checkbox_theme_1.UxCheckboxTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-checkbox')
    ]);
}
exports.configure = configure;
