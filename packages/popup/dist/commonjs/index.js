"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_popup_1 = require("./ux-popup");
Object.defineProperty(exports, "UxPopup", { enumerable: true, get: function () { return ux_popup_1.UxPopup; } });
var ux_popup_theme_1 = require("./ux-popup-theme");
Object.defineProperty(exports, "UxPopupTheme", { enumerable: true, get: function () { return ux_popup_theme_1.UxPopupTheme; } });
function configure(frameworkConfig) {
    frameworkConfig.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-popup')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map