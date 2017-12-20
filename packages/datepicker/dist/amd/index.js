define(["require", "exports", "aurelia-framework", "./ux-datepicker-theme"], function (require, exports, aurelia_framework_1, ux_datepicker_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxDatepickerTheme = ux_datepicker_theme_1.UxDatepickerTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-calendar'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list')
        ]);
    }
    exports.configure = configure;
});
