"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_radio_theme_1 = require("./ux-radio-theme");
exports.UxRadioTheme = ux_radio_theme_1.UxRadioTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-radio')
    ]);
}
exports.configure = configure;
