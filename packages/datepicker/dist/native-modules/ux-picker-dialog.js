import { __decorate } from "tslib";
import { customElement, bindable, ViewResources, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { moment } from './resources/moment-rexports';
import { PLATFORM } from 'aurelia-pal';
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
            this.closeDialog();
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
        useView(PLATFORM.moduleName('./ux-picker-dialog.html'))
        // @inlineView(
        //   UX_PICKER_DIALOG_VIEW,
        //   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-picker-dialog.css')]
        // )
    ], UxPickerDialog);
    return UxPickerDialog;
}());
export { UxPickerDialog };
//# sourceMappingURL=ux-picker-dialog.js.map