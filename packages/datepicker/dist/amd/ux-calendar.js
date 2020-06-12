define(["require", "exports", "tslib", "aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "./resources/datetime-utility", "./resources/moment-rexports", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, datetime_utility_1, moment_rexports_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCalendar = void 0;
    var UxCalendar = /** @class */ (function () {
        function UxCalendar(resources) {
            this.resources = resources;
            this.theme = null;
            this.weekdays = moment_rexports_1.moment.weekdays();
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
            return datetime_utility_1.DatetimeUtility.dateOutOfRange(date, this.minDate, this.maxDate, this.config);
        };
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "weekdays", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "minDate", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "maxDate", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "value", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCalendar.prototype, "config", void 0);
        tslib_1.__decorate([
            aurelia_binding_1.observable
        ], UxCalendar.prototype, "displayMonth", void 0);
        UxCalendar = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources),
            aurelia_templating_1.customElement('ux-calendar'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-calendar.html'))
        ], UxCalendar);
        return UxCalendar;
    }());
    exports.UxCalendar = UxCalendar;
});
//# sourceMappingURL=ux-calendar.js.map