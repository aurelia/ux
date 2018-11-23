define(["require", "exports", "aurelia-framework", "./ux-responsive-utilities", "./ux-grid-theme"], function (require, exports, aurelia_framework_1, ux_responsive_utilities_1, ux_grid_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxResponsiveUtilities = ux_responsive_utilities_1.UxResponsiveUtilities;
    exports.UxGridTheme = ux_grid_theme_1.UxGridTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid/ux-grid'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid/ux-grid-cell')
        ]);
    }
    exports.configure = configure;
});
