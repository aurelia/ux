"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxField = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_pal_1 = require("aurelia-pal");
var UxField = /** @class */ (function () {
    function UxField(element) {
        this.element = element;
    }
    UxField.prototype.attached = function () {
        if (this.label && !this.element.querySelector('label')) {
            this.labelElement = document.createElement('label');
            this.labelElement.classList.add('ux-field__label');
            this.labelElement.textContent = this.label;
            this.element.insertBefore(this.labelElement, this.element.firstChild);
        }
    };
    UxField.prototype.labelChanged = function (newValue) {
        if (this.labelElement != null) {
            this.labelElement.textContent = newValue;
        }
    };
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxField.prototype, "label", void 0);
    UxField = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element),
        aurelia_templating_1.customElement('ux-field'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-field.html'))
    ], UxField);
    return UxField;
}());
exports.UxField = UxField;
//# sourceMappingURL=ux-field.js.map