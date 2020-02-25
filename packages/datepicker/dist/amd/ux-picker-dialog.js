var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "./resources/moment-rexports"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, moment_rexports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import UX_PICKER_DIALOG_VIEW from './ux-picker-dialog.html';
    // import { PLATFORM } from 'aurelia-pal';
    var UxPickerDialog = /** @class */ (function () {
        function UxPickerDialog(resources) {
            this.resources = resources;
            this.theme = null;
            this.type = 'datetime';
            this.display = 'month';
        }
        UxPickerDialog.prototype.bind = function () {
            if (this.value != null) {
                this.selectedDate = moment_rexports_1.moment(this.value);
            }
            else {
                this.selectedDate = this.initialDate;
                if (this.minDate != null && this.selectedDate.isBefore(this.minDate)) {
                    this.selectedDate = moment_rexports_1.moment(this.minDate).clone();
                }
                if (this.maxDate != null && this.selectedDate.isBefore(this.maxDate)) {
                    this.selectedDate = moment_rexports_1.moment(this.minDate).clone();
                }
            }
        };
        UxPickerDialog.prototype.valueChanged = function (newDate) {
            this.selectedDate = moment_rexports_1.moment(newDate);
        };
        UxPickerDialog.prototype.selectDate = function () {
            if (this.selectedDate != null) {
                this.value = this.selectedDate.toDate();
                this.closeDialog();
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
            // @inlineView(
            //   UX_PICKER_DIALOG_VIEW,
            //   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog.css')]
            // )
        ], UxPickerDialog);
        return UxPickerDialog;
    }());
    exports.UxPickerDialog = UxPickerDialog;
});
//# sourceMappingURL=ux-picker-dialog.js.map