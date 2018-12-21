var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-framework"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_dependency_injection_1, core_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxTextArea = /** @class */ (function () {
        function UxTextArea(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.autofocus = null;
            this.autoResize = false;
            this.disabled = false;
            this.focus = false;
            this.readonly = false;
            this.value = undefined;
            Object.setPrototypeOf(element, uxTextAreaElementProto);
        }
        UxTextArea.prototype.bind = function () {
            var element = this.element;
            var textbox = this.textbox;
            if (this.autofocus || this.autofocus === '') {
                this.focus = true;
            }
            if (element.hasAttribute('placeholder')) {
                var attributeValue = element.getAttribute('placeholder');
                if (attributeValue) {
                    textbox.setAttribute('placeholder', attributeValue);
                    element.removeAttribute('placeholder');
                }
            }
            if (this.cols) {
                textbox.setAttribute('cols', this.cols.toString());
                element.removeAttribute('cols');
            }
            if (this.rows) {
                textbox.setAttribute('rows', this.rows.toString());
                element.removeAttribute('rows');
            }
            if (this.minlength) {
                textbox.setAttribute('minlength', this.minlength.toString());
            }
            if (this.maxlength) {
                textbox.setAttribute('maxlength', this.maxlength.toString());
            }
            this.autocompleteChanged(this.autocomplete);
        };
        UxTextArea.prototype.attached = function () {
            var textbox = this.textbox;
            this.isAttached = true;
            this.textbox.addEventListener('change', stopEvent);
            this.textbox.addEventListener('input', stopEvent);
            this.fitTextContent();
            textbox.addEventListener('change', stopEvent);
            textbox.addEventListener('input', stopEvent);
        };
        UxTextArea.prototype.detached = function () {
            var textbox = this.textbox;
            this.isAttached = false;
            textbox.removeEventListener('change', stopEvent);
            textbox.removeEventListener('input', stopEvent);
        };
        UxTextArea.prototype.getValue = function () {
            return this.value;
        };
        UxTextArea.prototype.setValue = function (value) {
            var oldValue = this.value;
            var newValue = value === null || value === undefined ? null : value.toString();
            if (oldValue !== newValue) {
                this.value = newValue;
                this.ignoreRawChanges = true;
                this.rawValue = newValue === null ? '' : newValue.toString();
                this.fitTextContent();
                this.ignoreRawChanges = false;
                this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
            }
        };
        UxTextArea.prototype.autocompleteChanged = function (newValue) {
            if (newValue == null) {
                this.textbox.setAttribute('autocomplete', newValue);
            }
            else {
                this.textbox.removeAttribute('autocomplete');
            }
        };
        UxTextArea.prototype.rawValueChanged = function (rawValue) {
            if (this.ignoreRawChanges) {
                return;
            }
            this.setValue(rawValue);
        };
        UxTextArea.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'textarea';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxTextArea.prototype.fitTextContent = function () {
            if (this.isAttached && (this.autoResize || this.autoResize === '')) {
                this.textbox.style.height = 'auto';
                this.textbox.style.height = this.textbox.scrollHeight + 2 + "px";
            }
        };
        UxTextArea.prototype.focusChanged = function (focus) {
            focus = focus || focus === '' ? true : false;
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent(focus ? 'focus' : 'blur', { bubbles: true }));
        };
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "autocomplete", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "autofocus", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "autoResize", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "cols", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "disabled", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "focus", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "maxlength", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "minlength", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "readonly", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "rows", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxTextArea.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.observable({ initializer: function () { return ''; } })
        ], UxTextArea.prototype, "rawValue", void 0);
        UxTextArea = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-textarea')
        ], UxTextArea);
        return UxTextArea;
    }());
    exports.UxTextArea = UxTextArea;
    function stopEvent(e) {
        e.stopPropagation();
    }
    var getVm = function (_) { return _.au.controller.viewModel; };
    var uxTextAreaElementProto = Object.create(HTMLElement.prototype, {
        value: {
            get: function () {
                return getVm(this).getValue();
            },
            set: function (value) {
                getVm(this).setValue(value);
            }
        }
    });
});
