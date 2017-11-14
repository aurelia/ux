define(["require", "exports", "aurelia-framework", "./ux-datepicker-theme"], function (require, exports, aurelia_framework_1, ux_datepicker_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxDatepickerTheme = ux_datepicker_theme_1.UxDatepickerTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-calendar'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-datepicker'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-picker-dialog'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-year-list')
        ]);
    }
    exports.configure = configure;
});
