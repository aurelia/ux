System.register(["aurelia-framework", "./ux-responsive-utilities", "./ux-grid-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid/ux-grid')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_responsive_utilities_1_1) {
                exports_1({
                    "UxResponsiveUtilities": ux_responsive_utilities_1_1["UxResponsiveUtilities"]
                });
            },
            function (ux_grid_theme_1_1) {
                exports_1({
                    "UxGridTheme": ux_grid_theme_1_1["UxGridTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
