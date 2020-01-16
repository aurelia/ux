"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_icon_1 = require("./ux-icon");
exports.UxIcon = ux_icon_1.UxIcon;
var ux_icon_theme_1 = require("./ux-icon-theme");
exports.UxIconTheme = ux_icon_theme_1.UxIconTheme;
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-icon'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map