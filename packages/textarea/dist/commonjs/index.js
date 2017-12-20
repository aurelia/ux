"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_textarea_theme_1 = require("./ux-textarea-theme");
exports.UxTextareaTheme = ux_textarea_theme_1.UxTextareaTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
    ]);
}
exports.configure = configure;
