"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_chip_input_theme_1 = require("./ux-chip-input-theme");
exports.UxChipInputTheme = ux_chip_input_theme_1.UxChipInputTheme;
var ux_tag_theme_1 = require("./ux-tag-theme");
exports.UxTagTheme = ux_tag_theme_1.UxTagTheme;
var ux_chip_theme_1 = require("./ux-chip-theme");
exports.UxChipTheme = ux_chip_theme_1.UxChipTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-chip-input'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-chip'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-tag')
    ]);
}
exports.configure = configure;
