import { __decorate } from "tslib";
import { customElement, bindable, ViewResources, useView } from 'aurelia-templating';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { DatetimeUtility } from './resources/datetime-utility';
import { moment } from './resources/moment-rexports';
import { PLATFORM } from 'aurelia-pal';
var UxCalendar = /** @class */ (function () {
    function UxCalendar(resources) {
        this.resources = resources;
        this.theme = null;
        this.weekdays = moment.weekdays();
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
        useView(PLATFORM.moduleName('./ux-calendar.html'))
    ], UxCalendar);
    return UxCalendar;
}());
export { UxCalendar };
//# sourceMappingURL=ux-calendar.js.map