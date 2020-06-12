"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_datepicker_theme_1 = require("./ux-datepicker-theme");
Object.defineProperty(exports, "UxDatepickerTheme", { enumerable: true, get: function () { return ux_datepicker_theme_1.UxDatepickerTheme; } });
var ux_calendar_1 = require("./ux-calendar");
Object.defineProperty(exports, "UxCalendar", { enumerable: true, get: function () { return ux_calendar_1.UxCalendar; } });
var ux_datepicker_1 = require("./ux-datepicker");
Object.defineProperty(exports, "UxDatepicker", { enumerable: true, get: function () { return ux_datepicker_1.UxDatepicker; } });
var ux_picker_dialog_1 = require("./ux-picker-dialog");
Object.defineProperty(exports, "UxPickerDialog", { enumerable: true, get: function () { return ux_picker_dialog_1.UxPickerDialog; } });
var ux_year_list_1 = require("./ux-year-list");
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
//# sourceMappingURL=index.js.map