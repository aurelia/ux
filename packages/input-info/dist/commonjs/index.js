"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_input_info_1 = require("./ux-input-info");
exports.UxInputInfo = ux_input_info_1.UxInputInfo;
var ux_input_info_theme_1 = require("./ux-input-info-theme");
exports.UxInputInfoTheme = ux_input_info_theme_1.UxInputInfoTheme;
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-input-info'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map