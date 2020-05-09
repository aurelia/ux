"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_progress_1 = require("./ux-progress");
exports.UxProgress = ux_progress_1.UxProgress;
var ux_progress_theme_1 = require("./ux-progress-theme");
exports.UxProgressTheme = ux_progress_theme_1.UxProgressTheme;
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-progress'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map