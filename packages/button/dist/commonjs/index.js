"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxButton = exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_button_1 = require("./ux-button");
Object.defineProperty(exports, "UxButton", { enumerable: true, get: function () { return ux_button_1.UxButton; } });
var ux_button_theme_1 = require("./ux-button-theme");
Object.defineProperty(exports, "UxButtonTheme", { enumerable: true, get: function () { return ux_button_theme_1.UxButtonTheme; } });
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-button'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map