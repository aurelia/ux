import { __decorate } from "tslib";
import { customElement, bindable } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { observable, computedFrom, useView } from 'aurelia-framework';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
let UxTextArea = /** @class */ (() => {
    let UxTextArea = class UxTextArea {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.autofocus = null;
            this.autoResize = false;
            this.disabled = false;
            this.readonly = false;
            this.variant = 'filled';
            this.dense = false;
            this.focused = false;
            this.value = undefined;
            defineUxTextAreaElementApis(element);
        }
        bind() {
            const element = this.element;
            const textbox = this.textbox;
            if (this.autofocus || this.autofocus === '') {
                this.focused = true;
            }
            this.dense = normalizeBooleanAttribute('dense', this.dense);
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
            this.themeChanged(this.theme);
            this.autocompleteChanged(this.autocomplete);
        }
        attached() {
            const textbox = this.textbox;
            this.isAttached = true;
            this.textbox.addEventListener('change', stopEvent);
            this.textbox.addEventListener('input', stopEvent);
            this.fitTextContent();
            textbox.addEventListener('change', stopEvent);
            textbox.addEventListener('input', stopEvent);
            this.variantChanged(this.variant);
        }
        detached() {
            const textbox = this.textbox;
            this.isAttached = false;
            textbox.removeEventListener('change', stopEvent);
            textbox.removeEventListener('input', stopEvent);
        }
        focus() {
            this.textbox.focus();
        }
        blur() {
            if (document.activeElement === this.textbox) {
                this.textbox.blur();
            }
        }
        getValue() {
            return this.value;
        }
        setValue(value) {
            const oldValue = this.value;
            const newValue = value === null || value === undefined ? null : value.toString();
            if (oldValue !== newValue) {
                this.value = newValue;
                this.ignoreRawChanges = true;
                this.rawValue = newValue === null ? '' : newValue.toString();
                this.fitTextContent();
                this.ignoreRawChanges = false;
                this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
            }
        }
        autocompleteChanged(newValue) {
            if (newValue != null) {
                this.textbox.setAttribute('autocomplete', newValue);
            }
            else {
                this.textbox.removeAttribute('autocomplete');
            }
        }
        rawValueChanged(newValue) {
            this.element.classList.toggle('ux-input-component--has-value', typeof newValue === 'string' && newValue.length > 0);
            if (this.ignoreRawChanges) {
                return;
            }
            this.setValue(newValue);
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'textarea';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        fitTextContent() {
            if (this.isAttached && (this.autoResize || this.autoResize === '')) {
                this.textbox.style.height = 'auto';
                this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
            }
        }
        focusedChanged(focus) {
            focus = focus || focus === '' ? true : false;
            this.element.classList.toggle('ux-input-component--focused', focus);
            this.element.dispatchEvent(DOM.createCustomEvent(focus ? 'focus' : 'blur', { bubbles: true }));
        }
        variantChanged(newValue) {
            this.element.style.backgroundColor = newValue === 'outline' ?
                this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
                '';
        }
        get placeholderMode() {
            return typeof this.label !== 'string' || this.label.length === 0;
        }
    };
    __decorate([
        bindable
    ], UxTextArea.prototype, "autocomplete", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "autofocus", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "autoResize", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "cols", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "maxlength", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "minlength", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "readonly", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "rows", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "label", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "placeholder", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "variant", void 0);
    __decorate([
        bindable
    ], UxTextArea.prototype, "dense", void 0);
    __decorate([
        observable({ initializer: () => '' })
    ], UxTextArea.prototype, "rawValue", void 0);
    __decorate([
        observable()
    ], UxTextArea.prototype, "focused", void 0);
    __decorate([
        computedFrom('label')
    ], UxTextArea.prototype, "placeholderMode", null);
    UxTextArea = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-textarea'),
        useView(PLATFORM.moduleName('./ux-textarea.html'))
    ], UxTextArea);
    return UxTextArea;
})();
export { UxTextArea };
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const defineUxTextAreaElementApis = (element) => {
    Object.defineProperties(element, {
        value: {
            get() {
                return getVm(this).getValue();
            },
            set(value) {
                getVm(this).setValue(value);
            },
            configurable: true
        },
        focus: {
            value() {
                getVm(this).focus();
            },
            configurable: true
        },
        blur: {
            value() {
                getVm(this).blur();
            },
            configurable: true
        }
    });
};
//# sourceMappingURL=ux-textarea.js.map