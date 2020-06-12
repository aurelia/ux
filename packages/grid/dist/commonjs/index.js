"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxGridCell = exports.UxGrid = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_grid_1 = require("./ux-grid");
Object.defineProperty(exports, "UxGrid", { enumerable: true, get: function () { return ux_grid_1.UxGrid; } });
var ux_grid_cell_1 = require("./ux-grid-cell");
Object.defineProperty(exports, "UxGridCell", { enumerable: true, get: function () { return ux_grid_cell_1.UxGridCell; } });
var ux_responsive_utilities_1 = require("./ux-responsive-utilities");
Object.defineProperty(exports, "UxResponsiveUtilities", { enumerable: true, get: function () { return ux_responsive_utilities_1.UxResponsiveUtilities; } });
var ux_grid_theme_1 = require("./ux-grid-theme");
Object.defineProperty(exports, "UxGridTheme", { enumerable: true, get: function () { return ux_grid_theme_1.UxGridTheme; } });
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-grid'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-grid-cell')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map