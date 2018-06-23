import * as moment_ from 'moment';
import { customElement, bindable, ViewResources, inlineView } from 'aurelia-templating';
import { observable, bindingMode, computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var moment = moment_;
var DatetimeUtility = /** @class */ (function () {
    function DatetimeUtility() {
    }
    /**
     * Checks to see if a date is beyond the min or max set date
     * @param date The date to check
     */
    DatetimeUtility.dateOutOfRange = function (date, minDate, maxDate, config) {
        var result = false;
        if (minDate != null && date.isBefore(minDate, 'day')) {
            result = true;
        }
        if (maxDate != null && date.isAfter(maxDate, 'day')) {
            result = true;
        }
        if (config && config.calendarSettings) {
            var settings = config.calendarSettings;
            if (settings.disableDays != null) {
                if (settings.disableDays.some(function (disabledDate) {
                    var disabledYear = date.year();
                    if (disabledDate.year != null) {
                        disabledYear = disabledDate.year;
                    }
                    var parsedVal = moment({ day: disabledDate.day, month: disabledDate.month, year: disabledYear });
                    if (parsedVal.isValid() && parsedVal.isSame(date, 'day')) {
                        return true;
                    }
                    return false;
                })) {
                    result = true;
                }
            }
            if (settings.disableWeekdays != null) {
                if (settings.disableWeekdays.some(function (disabledDay) {
                    return disabledDay.toString() === date.day().toString();
                })) {
                    result = true;
                }
            }
        }
        return result;
    };
    return DatetimeUtility;
}());

var UX_CALENDAR_VIEW = "<template> <require from=\"@aurelia-ux/datepicker/ux-calendar.css\"></require> <div class=\"month-display\"> <ux-button type=\"icon\" click.delegate=\"previousMonth()\"> <svg viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </ux-button> <span> ${displayMonth.format('MMMM YYYY')} </span> <ux-button type=\"icon\" click.delegate=\"nextMonth()\"> <svg viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </ux-button> </div> <div class=\"calendar-row weekdays\"> <div class=\"day\" repeat.for=\"weekday of weekdays\"> ${weekday[0]} </div> </div> <div class=\"calendar-row\" repeat.for=\"week of calendarRows\"> <div class=\"day\" repeat.for=\"day of week\"> <div click.delegate=\"changeCalendarSelection(day)\" if.bind=\"day\" class=\"day-highlight ${day.isSame(value, 'day') ? 'selected' : ''} ${isValidDate(day) ? 'out-of-range' : '' }\"> ${day.date()} </div> </div> </div> </template> ";

var moment$1 = moment_;
var UxCalendar = /** @class */ (function () {
    function UxCalendar(resources) {
        this.resources = resources;
        this.theme = null;
        this.weekdays = moment$1.weekdays();
        this.calendarRows = new Array();
    }
    UxCalendar.prototype.bind = function () {
        this.displayMonth = this.value.clone();
    };
    UxCalendar.prototype.previousMonth = function () {
        this.displayMonth = this.displayMonth.clone().subtract(1, 'month');
    };
    UxCalendar.prototype.nextMonth = function () {
        this.displayMonth = this.displayMonth.clone().add(1, 'month');
    };
    UxCalendar.prototype.changeCalendarSelection = function (newDate) {
        var modifiedDate = this.value.clone()
            .set('date', newDate.date())
            .set('month', newDate.month())
            .set('year', newDate.year());
        if (this.isValidDate(modifiedDate)) {
            return;
        }
        this.value = modifiedDate;
    };
    UxCalendar.prototype.displayMonthChanged = function (newDate) {
        this.calendarRows = new Array();
        var clonedDate = newDate.clone();
        var firstDay = clonedDate.startOf('month').weekday();
        var daysInMonth = newDate.daysInMonth();
        var currentWeek = new Array();
        while (currentWeek.length < firstDay) {
            currentWeek.push(null);
        }
        for (var index = 0; index < daysInMonth; index++) {
            currentWeek.push(clonedDate.clone().add(index, 'days'));
            if (currentWeek.length === 7) {
                this.calendarRows.push(currentWeek);
                currentWeek = new Array();
            }
        }
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            this.calendarRows.push(currentWeek);
        }
    };
    UxCalendar.prototype.isValidDate = function (date) {
        return DatetimeUtility.dateOutOfRange(date, this.minDate, this.maxDate, this.config);
    };
    __decorate([
        bindable
    ], UxCalendar.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxCalendar.prototype, "weekdays", void 0);
    __decorate([
        bindable
    ], UxCalendar.prototype, "minDate", void 0);
    __decorate([
        bindable
    ], UxCalendar.prototype, "maxDate", void 0);
    __decorate([
        bindable
    ], UxCalendar.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxCalendar.prototype, "config", void 0);
    __decorate([
        observable
    ], UxCalendar.prototype, "displayMonth", void 0);
    UxCalendar = __decorate([
        inject(ViewResources),
        customElement('ux-calendar'),
        inlineView(UX_CALENDAR_VIEW)
    ], UxCalendar);
    return UxCalendar;
}());

var UX_DATEPICKER_VIEW = "<template> <require from=\"@aurelia-ux/datepicker/ux-datepicker.css\"></require> <ux-input ref=\"textbox\" value.bind=\"textboxValue\" blur.trigger=\"changeTextboxValue()\" placeholder.bind=\"placeholder\"></ux-input> <ux-button type=\"icon\" click.delegate=\"toggleDialog('month')\" if.bind=\"type !== 'time'\"> <svg viewBox=\"0 0 24 24\"> <path d=\"M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z\"></path> </svg> </ux-button> <div class=\"overlay\" if.bind=\"showDialog\"> <ux-picker-dialog display.bind=\"display\" config.bind=\"config\" type.bind=\"type\" initial-date.bind=\"initialDate\" close-dialog.call=\"showDialog = false\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\" value.two-way=\"value\"></ux-picker-dialog> </div> </template> ";

var moment$2 = moment_;
var UxDatepicker = /** @class */ (function () {
    function UxDatepicker(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.display = 'month';
        this.type = 'datetime';
        this.formatters = {
            date: 'L',
            time: 'LT',
            datetime: 'L LT'
        };
        this.parsers = {
            time: ['h:m a', 'H:m']
        };
        this.showDialog = false;
    }
    UxDatepicker.prototype.bind = function () {
        if (this.initialDate != null) {
            var dateParse = moment$2(this.initialDate);
            if (dateParse.isValid()) {
                this.initialDate = dateParse;
            }
        }
        else {
            this.initialDate = moment$2();
        }
        if (this.minDate != null) {
            var dateParse = moment$2(this.minDate);
            this.minDate = dateParse.isValid() ? dateParse : null;
        }
        if (this.maxDate != null) {
            var dateParse = moment$2(this.maxDate);
            this.maxDate = dateParse.isValid() ? dateParse : null;
        }
        if (this.minTime != null) {
            var dateParse = moment$2(this.minTime, this.parsers.time);
            this.minTime = dateParse.isValid() ? dateParse : null;
        }
        if (this.maxTime != null) {
            var dateParse = moment$2(this.maxTime, this.parsers.time);
            this.maxTime = dateParse.isValid() ? dateParse : null;
        }
        this.valueChanged(this.value);
        this.themeChanged(this.theme);
    };
    UxDatepicker.prototype.toggleDialog = function (display) {
        if (this.showDialog) {
            this.showDialog = false;
            return;
        }
        this.display = display;
        this.showDialog = true;
    };
    UxDatepicker.prototype.changeTextboxValue = function () {
        if (!this.textboxValue) {
            this.value = null;
            return;
        }
        var parseValue;
        parseValue = this.type === 'time' ? moment$2(this.textboxValue, this.parsers.time) : moment$2(this.textboxValue);
        if (parseValue.isValid() &&
            DatetimeUtility.dateOutOfRange(parseValue, this.minDate, this.maxDate, this.config) === false) {
            this.value = parseValue.toDate();
        }
        else {
            this.value = null;
            this.textboxValue = '';
        }
    };
    UxDatepicker.prototype.valueChanged = function (newValue) {
        if (newValue == null) {
            return;
        }
        if (this.type.toLowerCase() === 'datetime') {
            this.textboxValue = moment$2(newValue).format(this.formatters.datetime);
        }
        if (this.type.toLowerCase() === 'date') {
            this.textboxValue = moment$2(newValue).format(this.formatters.date);
        }
        if (this.type.toLowerCase() === 'time') {
            this.textboxValue = moment$2(newValue).format(this.formatters.time);
        }
        this.showDialog = false;
    };
    UxDatepicker.prototype.minDateChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment$2 === false) {
            var dateParse = moment$2(newValue);
            this.minDate = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.maxDateChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment$2 === false) {
            var dateParse = moment$2(newValue);
            this.maxDate = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.minTimeChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment$2 === false) {
            var dateParse = moment$2(newValue, this.parsers.time);
            this.minTime = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.maxTimeChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment$2 === false) {
            var dateParse = moment$2(newValue, this.parsers.time);
            this.maxTime = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'datepicker';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], UxDatepicker.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "display", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "type", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "initialDate", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "minTime", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "maxTime", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "minDate", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "maxDate", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "placeholder", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "config", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "formatters", void 0);
    __decorate([
        bindable
    ], UxDatepicker.prototype, "parsers", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxDatepicker.prototype, "value", void 0);
    UxDatepicker = __decorate([
        inject(Element, ViewResources, StyleEngine),
        customElement('ux-datepicker'),
        inlineView(UX_DATEPICKER_VIEW)
    ], UxDatepicker);
    return UxDatepicker;
}());

var UX_PICKER_DIALOG_VIEW = "<template role=\"dialog\"> <require from=\"@aurelia-ux/datepicker/ux-picker-dialog.css\"></require> <header> <template if.bind=\"type !== 'time'\"> <div class=\"year ${display === 'year' ? 'active':''}\" click.trigger=\"display = 'year'\"> ${selectedDate.format('YYYY')} </div> <div class=\"date ${display === 'month' ? 'active':''}\" click.trigger=\"display = 'month'\"> ${selectedDate.format('ddd, MMM D')} </div> </template> </header> <ux-year-list if.bind=\"display === 'year'\" config.bind=\"config\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\" value.two-way=\"selectedDate\"> </ux-year-list> <ux-calendar if.bind=\"display === 'month'\" config.bind=\"config\" value.two-way=\"selectedDate\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"> </ux-calendar> <footer> <ux-button type=\"flat\" click.delegate=\"closeDialog()\">Cancel</ux-button> <ux-button type=\"flat\" click.delegate=\"selectDate()\">OK</ux-button> </footer> </template> ";

var moment$3 = moment_;
var UxPickerDialog = /** @class */ (function () {
    function UxPickerDialog(resources) {
        this.resources = resources;
        this.theme = null;
        this.type = 'datetime';
        this.display = 'month';
    }
    UxPickerDialog.prototype.bind = function () {
        if (this.value != null) {
            this.selectedDate = moment$3(this.value);
        }
        else {
            this.selectedDate = this.initialDate;
            if (this.minDate != null && this.selectedDate.isBefore(this.minDate)) {
                this.selectedDate = moment$3(this.minDate).clone();
            }
            if (this.maxDate != null && this.selectedDate.isBefore(this.maxDate)) {
                this.selectedDate = moment$3(this.minDate).clone();
            }
        }
    };
    UxPickerDialog.prototype.valueChanged = function (newDate) {
        this.selectedDate = moment$3(newDate);
    };
    UxPickerDialog.prototype.selectDate = function () {
        if (this.selectedDate != null) {
            this.value = this.selectedDate.toDate();
        }
    };
    UxPickerDialog.prototype.changeView = function (view) {
        this.display = view;
    };
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "type", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "display", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "weekdays", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "config", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "initialDate", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "minDate", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "maxDate", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxPickerDialog.prototype, "closeDialog", void 0);
    UxPickerDialog = __decorate([
        inject(ViewResources),
        customElement('ux-picker-dialog'),
        inlineView(UX_PICKER_DIALOG_VIEW)
    ], UxPickerDialog);
    return UxPickerDialog;
}());

var UX_YEAR_LIST_VIEW = "<template> <require from=\"@aurelia-ux/datepicker/ux-year-list.css\"></require> <template repeat.for=\"year of yearList\"> <div class=\"years ${year == value.year() ? 'selected' : ''}\" click.delegate=\"selectYear(year)\"> ${year} </div> </template> </template> ";

var UxYearList = /** @class */ (function () {
    function UxYearList(element, resources) {
        this.element = element;
        this.resources = resources;
        this.theme = null;
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);
    }
    UxYearList.prototype.attached = function () {
        this.scrollToActive();
    };
    UxYearList.prototype.selectYear = function (year) {
        this.value = this.value.clone().set('year', year);
    };
    Object.defineProperty(UxYearList.prototype, "yearList", {
        get: function () {
            var yearList = [];
            var min = 1900;
            var max = 2100;
            if (this.minDate) {
                min = this.minDate.year();
            }
            if (this.maxDate) {
                max = this.maxDate.year();
            }
            while (min <= max) {
                yearList.push(min);
                min++;
            }
            return yearList;
        },
        enumerable: true,
        configurable: true
    });
    UxYearList.prototype.scrollToActive = function () {
        var selected = this.element.querySelector('div.selected');
        if (selected == null && this.element.children.length > 5) {
            selected = this.element.children[Math.round(this.element.children.length / 2)];
        }
        if (selected != null) {
            selected.scrollIntoView();
        }
    };
    __decorate([
        bindable
    ], UxYearList.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "minDate", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "maxDate", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "value", void 0);
    __decorate([
        computedFrom('minDate', 'maxDate')
    ], UxYearList.prototype, "yearList", null);
    UxYearList = __decorate([
        inject(Element, ViewResources),
        customElement('ux-year-list'),
        inlineView(UX_YEAR_LIST_VIEW)
    ], UxYearList);
    return UxYearList;
}());

var UxDatepickerTheme = /** @class */ (function () {
    function UxDatepickerTheme() {
        this.themeKey = 'datepicker';
    }
    return UxDatepickerTheme;
}());

function configure(config) {
    config.globalResources([
        UxCalendar,
        UxDatepicker,
        UxPickerDialog,
        UxYearList
    ]);
}

export { configure, UxDatepickerTheme };
