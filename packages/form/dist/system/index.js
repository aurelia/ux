System.register(["aurelia-framework", "./ux-form-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-field'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-form'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form/ux-submit-attribute')
        ]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_form_theme_1_1) {
                exports_1({
                    "UxFormTheme": ux_form_theme_1_1["UxFormTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
