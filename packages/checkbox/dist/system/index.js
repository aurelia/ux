System.register(["aurelia-framework", "./ux-checkbox-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_checkbox_theme_1_1) {
                exports_1({
                    "UxCheckboxTheme": ux_checkbox_theme_1_1["UxCheckboxTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
