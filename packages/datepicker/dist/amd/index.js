define(["require", "exports", "aurelia-framework", "./ux-datepicker-theme", "./ux-calendar", "./ux-datepicker", "./ux-picker-dialog", "./ux-year-list"], function (require, exports, aurelia_framework_1, ux_datepicker_theme_1, ux_calendar_1, ux_datepicker_1, ux_picker_dialog_1, ux_year_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxDatepickerTheme = ux_datepicker_theme_1.UxDatepickerTheme;
    exports.UxCalendar = ux_calendar_1.UxCalendar;
    exports.UxDatepicker = ux_datepicker_1.UxDatepicker;
    exports.UxPickerDialog = ux_picker_dialog_1.UxPickerDialog;
    exports.UxYearList = ux_year_list_1.UxYearList;
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
//# sourceMappingURL=index.js.map