define(["require", "exports", "tslib", "aurelia-templating", "aurelia-dependency-injection", "./resources/moment-rexports", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_dependency_injection_1, moment_rexports_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxPickerDialog = void 0;
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
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "type", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "display", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "weekdays", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "config", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "initialDate", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "minDate", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "maxDate", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "value", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxPickerDialog.prototype, "closeDialog", void 0);
        UxPickerDialog = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources),
            aurelia_templating_1.customElement('ux-picker-dialog'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-picker-dialog.html'))
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