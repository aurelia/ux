System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "./resources/datetime-utility", "moment"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, datetime_utility_1, moment, UxCalendar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (datetime_utility_1_1) {
                datetime_utility_1 = datetime_utility_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            UxCalendar = /** @class */ (function () {
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
                    return datetime_utility_1.DatetimeUtility.dateOutOfRange(date, this.minDate, this.maxDate, this.config);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "weekdays", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "minDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "maxDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "value", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCalendar.prototype, "config", void 0);
                __decorate([
                    aurelia_binding_1.observable
                ], UxCalendar.prototype, "displayMonth", void 0);
                UxCalendar = __decorate([
                    aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources),
                    aurelia_templating_1.customElement('ux-calendar')
                ], UxCalendar);
                return UxCalendar;
            }());
            exports_1("UxCalendar", UxCalendar);
        }
    };
});
