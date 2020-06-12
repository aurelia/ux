define(["require", "exports", "aurelia-framework", "./ux-datepicker-theme", "./ux-calendar", "./ux-datepicker", "./ux-picker-dialog", "./ux-year-list"], function (require, exports, aurelia_framework_1, ux_datepicker_theme_1, ux_calendar_1, ux_datepicker_1, ux_picker_dialog_1, ux_year_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxDatepickerTheme", { enumerable: true, get: function () { return ux_datepicker_theme_1.UxDatepickerTheme; } });
    Object.defineProperty(exports, "UxCalendar", { enumerable: true, get: function () { return ux_calendar_1.UxCalendar; } });
    Object.defineProperty(exports, "UxDatepicker", { enumerable: true, get: function () { return ux_datepicker_1.UxDatepicker; } });
    Object.defineProperty(exports, "UxPickerDialog", { enumerable: true, get: function () { return ux_picker_dialog_1.UxPickerDialog; } });
    Object.defineProperty(exports, "UxYearList", { enumerable: true, get: function () { return ux_year_list_1.UxYearList; } });
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