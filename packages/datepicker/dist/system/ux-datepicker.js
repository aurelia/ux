System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./resources/datetime-utility", "moment"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, datetime_utility_1, moment, UxDatepicker;
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
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (datetime_utility_1_1) {
                datetime_utility_1 = datetime_utility_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            UxDatepicker = /** @class */ (function () {
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
                    this.processAttribute('placeholder');
                    if (this.initialDate != null) {
                        var dateParse = moment(this.initialDate);
                        if (dateParse.isValid()) {
                            this.initialDate = dateParse;
                        }
                    }
                    else {
                        this.initialDate = moment();
                    }
                    if (this.minDate != null) {
                        var dateParse = moment(this.minDate);
                        this.minDate = dateParse.isValid() ? dateParse : null;
                    }
                    if (this.maxDate != null) {
                        var dateParse = moment(this.maxDate);
                        this.maxDate = dateParse.isValid() ? dateParse : null;
                    }
                    if (this.minTime != null) {
                        var dateParse = moment(this.minTime, this.parsers.time);
                        this.minTime = dateParse.isValid() ? dateParse : null;
                    }
                    if (this.maxTime != null) {
                        var dateParse = moment(this.maxTime, this.parsers.time);
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
                    parseValue = this.type === 'time' ? moment(this.textboxValue, this.parsers.time) : moment(this.textboxValue);
                    if (parseValue.isValid() &&
                        datetime_utility_1.DatetimeUtility.dateOutOfRange(parseValue, this.minDate, this.maxDate, this.config) === false) {
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
                        this.textboxValue = moment(newValue).format(this.formatters.datetime);
                    }
                    if (this.type.toLowerCase() === 'date') {
                        this.textboxValue = moment(newValue).format(this.formatters.date);
                    }
                    if (this.type.toLowerCase() === 'time') {
                        this.textboxValue = moment(newValue).format(this.formatters.time);
                    }
                    this.showDialog = false;
                };
                UxDatepicker.prototype.minDateChanged = function (newValue) {
                    if (newValue != null && newValue instanceof moment === false) {
                        var dateParse = moment(newValue);
                        this.minDate = dateParse.isValid() ? dateParse : null;
                    }
                };
                UxDatepicker.prototype.maxDateChanged = function (newValue) {
                    if (newValue != null && newValue instanceof moment === false) {
                        var dateParse = moment(newValue);
                        this.maxDate = dateParse.isValid() ? dateParse : null;
                    }
                };
                UxDatepicker.prototype.minTimeChanged = function (newValue) {
                    if (newValue != null && newValue instanceof moment === false) {
                        var dateParse = moment(newValue, this.parsers.time);
                        this.minTime = dateParse.isValid() ? dateParse : null;
                    }
                };
                UxDatepicker.prototype.maxTimeChanged = function (newValue) {
                    if (newValue != null && newValue instanceof moment === false) {
                        var dateParse = moment(newValue, this.parsers.time);
                        this.maxTime = dateParse.isValid() ? dateParse : null;
                    }
                };
                UxDatepicker.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'datepicker';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxDatepicker.prototype.processAttribute = function (attributeName) {
                    var attributeValue = this.element.getAttribute('placeholder');
                    if (attributeValue) {
                        this.element.removeAttribute(attributeName);
                        this.textbox.setAttribute(attributeName, attributeValue);
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "display", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "type", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "initialDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "minTime", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "maxTime", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "minDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "maxDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "placeholder", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "config", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "formatters", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxDatepicker.prototype, "parsers", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], UxDatepicker.prototype, "value", void 0);
                UxDatepicker = __decorate([
                    aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-datepicker')
                ], UxDatepicker);
                return UxDatepicker;
            }());
            exports_1("UxDatepicker", UxDatepicker);
        }
    };
});
