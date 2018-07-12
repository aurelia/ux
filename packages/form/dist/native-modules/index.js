import { __decorate } from 'tslib';
import { customElement, bindable, inlineView, customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { StyleEngine } from '@aurelia-ux/core';
import { DOM as DOM$1 } from 'aurelia-framework';

var UX_FIELD_VIEW = "<template> <slot></slot> </template> ";

var UxField = /** @class */ (function () {
    function UxField(element) {
        this.element = element;
    }
    UxField.prototype.attached = function () {
        if (this.label && !this.element.querySelector('label')) {
            this.labelElement = document.createElement('label');
            this.labelElement.textContent = this.label;
            this.element.insertBefore(this.labelElement, this.element.firstChild);
        }
    };
    UxField.prototype.labelChanged = function (newValue) {
        if (this.labelElement != null) {
            this.labelElement.textContent = newValue;
        }
    };
    __decorate([
        bindable
    ], UxField.prototype, "label", void 0);
    UxField = __decorate([
        inject(Element),
        customElement('ux-field'),
        inlineView(UX_FIELD_VIEW)
    ], UxField);
    return UxField;
}());

var UX_FORM_VIEW = "<template role=form> <slot></slot> </template> ";

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
        inlineView(UX_FORM_VIEW)
    ], UxForm);
    return UxForm;
}());

var UxSubmitCustomAttribute = /** @class */ (function () {
    function UxSubmitCustomAttribute(element) {
        this.element = element;
        this.canSubmit = false;
    }
    UxSubmitCustomAttribute.prototype.attached = function () {
        var _this = this;
        var currentParent = this.element.parentElement;
        while (currentParent != null) {
            if (currentParent.tagName === 'UX-FORM') {
                this.canSubmit = true;
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
                this.element.addEventListener('mouseup', function () {
                    _this.element.dispatchEvent(_this.submitEvent);
                });
                break;
            }
            currentParent = currentParent.parentElement;
        }
    };
    UxSubmitCustomAttribute.prototype.detached = function () {
        var _this = this;
        if (this.canSubmit) {
            this.element.removeEventListener('mouseup', function () {
                _this.element.dispatchEvent(_this.submitEvent);
            });
        }
    };
    UxSubmitCustomAttribute = __decorate([
        inject(Element),
        customAttribute('ux-submit')
    ], UxSubmitCustomAttribute);
    return UxSubmitCustomAttribute;
}());

var css = "ux-form{display:flex;flex-direction:column;width:100%}ux-form .form-row{display:flex;flex-direction:row}ux-form .form-row>*{margin-left:8px;margin-right:8px}ux-form .form-row>:last-child{margin-right:0}ux-form .form-row>:first-child{margin-left:0}ux-form ux-field{display:flex;flex-direction:column;width:100%;margin-top:16px}ux-form ux-field>label{font-size:14px;font-size:var(--ux-theme--form-label-font-size, 14px);color:inherit;color:var(--ux-theme--form-label-color, inherit)}"

var UxFormTheme = /** @class */ (function () {
    function UxFormTheme() {
        this.themeKey = 'form';
    }
    return UxFormTheme;
}());

function configure(config) {
    DOM$1.injectStyles(css, undefined, undefined, 'ux-form-css');
    config.globalResources([
        UxField,
        UxForm,
        UxSubmitCustomAttribute,
    ]);
}

export { configure, UxFormTheme };
