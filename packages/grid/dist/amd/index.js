define(["require", "exports", "aurelia-framework", "./ux-grid", "./ux-grid-cell", "./ux-responsive-utilities", "./ux-grid-theme"], function (require, exports, aurelia_framework_1, ux_grid_1, ux_grid_cell_1, ux_responsive_utilities_1, ux_grid_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxGridCell = exports.UxGrid = void 0;
    Object.defineProperty(exports, "UxGrid", { enumerable: true, get: function () { return ux_grid_1.UxGrid; } });
    Object.defineProperty(exports, "UxGridCell", { enumerable: true, get: function () { return ux_grid_cell_1.UxGridCell; } });
    Object.defineProperty(exports, "UxResponsiveUtilities", { enumerable: true, get: function () { return ux_responsive_utilities_1.UxResponsiveUtilities; } });
    Object.defineProperty(exports, "UxGridTheme", { enumerable: true, get: function () { return ux_grid_theme_1.UxGridTheme; } });
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-grid'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-grid-cell')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map