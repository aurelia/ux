"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxInputInfo = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_input_info_1 = require("./ux-input-info");
Object.defineProperty(exports, "UxInputInfo", { enumerable: true, get: function () { return ux_input_info_1.UxInputInfo; } });
var ux_input_info_theme_1 = require("./ux-input-info-theme");
Object.defineProperty(exports, "UxInputInfoTheme", { enumerable: true, get: function () { return ux_input_info_theme_1.UxInputInfoTheme; } });
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-input-info'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map