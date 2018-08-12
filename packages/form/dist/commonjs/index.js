"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_form_theme_1 = require("./ux-form-theme");
exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-field'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-form'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-submit-attribute')
    ]);
}
exports.configure = configure;
