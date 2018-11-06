System.register(["aurelia-framework", "./ux-datepicker-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-calendar'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list')
        ]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_datepicker_theme_1_1) {
                exports_1({
                    "UxDatepickerTheme": ux_datepicker_theme_1_1["UxDatepickerTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
