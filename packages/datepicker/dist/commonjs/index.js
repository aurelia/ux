"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_datepicker_theme_1 = require("./ux-datepicker-theme");
exports.UxDatepickerTheme = ux_datepicker_theme_1.UxDatepickerTheme;
var ux_calendar_1 = require("./ux-calendar");
exports.UxCalendar = ux_calendar_1.UxCalendar;
var ux_datepicker_1 = require("./ux-datepicker");
exports.UxDatepicker = ux_datepicker_1.UxDatepicker;
var ux_picker_dialog_1 = require("./ux-picker-dialog");
exports.UxPickerDialog = ux_picker_dialog_1.UxPickerDialog;
var ux_year_list_1 = require("./ux-year-list");
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
//# sourceMappingURL=index.js.map