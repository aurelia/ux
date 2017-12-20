"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_switch_theme_1 = require("./ux-switch-theme");
exports.UxSwitchTheme = ux_switch_theme_1.UxSwitchTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
    ]);
}
exports.configure = configure;
