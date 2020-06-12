import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
var UxForm = /** @class */ (function () {
    function UxForm(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.bindSubmitToEnter = false;
    }
    UxForm.prototype.bind = function () {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
        if (this.submitOnEnter !== undefined) {
            this.bindSubmitToEnter = true;
        }
    };
    UxForm.prototype.attached = function () {
        var _this = this;
        if (this.bindSubmitToEnter) {
            this.element.addEventListener('keyup', function (e) {
                var canSubmit = true;
                if (e.srcElement != null && e.srcElement.tagName === 'TEXTAREA') {
                    canSubmit = false;
                }
                if (e.keyCode === 13 && canSubmit) {
                    _this.submitForm();
                }
            });
        }
    };
    UxForm.prototype.detached = function () {
        var _this = this;
        if (this.bindSubmitToEnter) {
            this.element.removeEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    _this.submitForm();
                }
            });
        }
    };
    UxForm.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'form';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxForm.prototype.submitForm = function () {
        var submitEvent = DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
        this.element.dispatchEvent(submitEvent);
    };
    __decorate([
        bindable
    ], UxForm.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxForm.prototype, "submitOnEnter", void 0);
    UxForm = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-form'),
        useView(PLATFORM.moduleName('./ux-form.html'))
    ], UxForm);
    return UxForm;
}());
export { UxForm };
//# sourceMappingURL=ux-form.js.map