System.register(["aurelia-framework", "./ux-input-info-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info/ux-input-info')
        ]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_input_info_theme_1_1) {
                exports_1({
                    "UxInputInfoTheme": ux_input_info_theme_1_1["UxInputInfoTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
