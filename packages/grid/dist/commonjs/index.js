"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_grid_1 = require("./ux-grid");
exports.UxGrid = ux_grid_1.UxGrid;
var ux_grid_cell_1 = require("./ux-grid-cell");
exports.UxGridCell = ux_grid_cell_1.UxGridCell;
var ux_responsive_utilities_1 = require("./ux-responsive-utilities");
exports.UxResponsiveUtilities = ux_responsive_utilities_1.UxResponsiveUtilities;
var ux_grid_theme_1 = require("./ux-grid-theme");
exports.UxGridTheme = ux_grid_theme_1.UxGridTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-grid'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-grid-cell')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map