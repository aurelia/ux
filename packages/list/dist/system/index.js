System.register(["aurelia-framework", "./ux-list-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-list-item')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_list_theme_1_1) {
                exports_1({
                    "UxListTheme": ux_list_theme_1_1["UxListTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
