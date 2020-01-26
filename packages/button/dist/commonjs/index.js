"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_button_1 = require("./ux-button");
exports.UxButton = ux_button_1.UxButton;
var ux_button_theme_1 = require("./ux-button-theme");
exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-button'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map