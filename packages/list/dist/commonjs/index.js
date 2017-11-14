"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_list_theme_1 = require("./ux-list-theme");
exports.UxListTheme = ux_list_theme_1.UxListTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-list'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-list-item')
    ]);
}
exports.configure = configure;
