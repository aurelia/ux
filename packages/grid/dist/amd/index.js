define(["require", "exports", "aurelia-framework", "./ux-grid", "./ux-grid-cell", "./ux-responsive-utilities", "./ux-grid-theme"], function (require, exports, aurelia_framework_1, ux_grid_1, ux_grid_cell_1, ux_responsive_utilities_1, ux_grid_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxGrid = ux_grid_1.UxGrid;
    exports.UxGridCell = ux_grid_cell_1.UxGridCell;
    exports.UxResponsiveUtilities = ux_responsive_utilities_1.UxResponsiveUtilities;
    exports.UxGridTheme = ux_grid_theme_1.UxGridTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-grid'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-grid-cell')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map