"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_form_theme_1 = require("./ux-form-theme");
exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-field'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-form'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-submit-attribute')
    ]);
}
exports.configure = configure;
