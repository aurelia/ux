System.register(["aurelia-framework", "./ux-switch-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_switch_theme_1_1) {
                exports_1({
                    "UxSwitchTheme": ux_switch_theme_1_1["UxSwitchTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
