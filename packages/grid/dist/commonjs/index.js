"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_responsive_utilities_1 = require("./ux-responsive-utilities");
exports.UxResponsiveUtilities = ux_responsive_utilities_1.UxResponsiveUtilities;
var ux_grid_theme_1 = require("./ux-grid-theme");
exports.UxGridTheme = ux_grid_theme_1.UxGridTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid/ux-grid'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid/ux-grid-cell')
    ]);
}
exports.configure = configure;
