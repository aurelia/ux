System.register(["aurelia-framework", "./ux-list-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list/ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list/ux-list-item')
        ]);
    }
    exports_1("configure", configure);
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
