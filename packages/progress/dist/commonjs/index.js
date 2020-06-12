"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxProgress = exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_progress_1 = require("./ux-progress");
Object.defineProperty(exports, "UxProgress", { enumerable: true, get: function () { return ux_progress_1.UxProgress; } });
var ux_progress_theme_1 = require("./ux-progress-theme");
Object.defineProperty(exports, "UxProgressTheme", { enumerable: true, get: function () { return ux_progress_theme_1.UxProgressTheme; } });
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-progress'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map