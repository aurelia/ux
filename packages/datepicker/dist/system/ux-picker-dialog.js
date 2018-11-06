System.register(["aurelia-templating", "aurelia-dependency-injection", "moment"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, moment, UxPickerDialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            UxPickerDialog = /** @class */ (function () {
                function UxPickerDialog(resources) {
                    this.resources = resources;
                    this.theme = null;
                    this.type = 'datetime';
                    this.display = 'month';
                }
                UxPickerDialog.prototype.bind = function () {
                    if (this.value != null) {
                        this.selectedDate = moment(this.value);
                    }
                    else {
                        this.selectedDate = this.initialDate;
                        if (this.minDate != null && this.selectedDate.isBefore(this.minDate)) {
                            this.selectedDate = moment(this.minDate).clone();
                        }
                        if (this.maxDate != null && this.selectedDate.isBefore(this.maxDate)) {
                            this.selectedDate = moment(this.minDate).clone();
                        }
                    }
                };
                UxPickerDialog.prototype.valueChanged = function (newDate) {
                    this.selectedDate = moment(newDate);
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
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "type", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "display", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "weekdays", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "config", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "initialDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "minDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "maxDate", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "value", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxPickerDialog.prototype, "closeDialog", void 0);
                UxPickerDialog = __decorate([
                    aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources),
                    aurelia_templating_1.customElement('ux-picker-dialog')
                ], UxPickerDialog);
                return UxPickerDialog;
            }());
            exports_1("UxPickerDialog", UxPickerDialog);
        }
    };
});
