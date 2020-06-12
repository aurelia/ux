import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
let UxForm = /** @class */ (() => {
    let UxForm = class UxForm {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.bindSubmitToEnter = false;
        }
        bind() {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            if (this.submitOnEnter !== undefined) {
                this.bindSubmitToEnter = true;
            }
        }
        attached() {
            if (this.bindSubmitToEnter) {
                this.element.addEventListener('keyup', (e) => {
                    let canSubmit = true;
                    if (e.srcElement != null && e.srcElement.tagName === 'TEXTAREA') {
                        canSubmit = false;
                    }
                    if (e.keyCode === 13 && canSubmit) {
                        this.submitForm();
                    }
                });
            }
        }
        detached() {
            if (this.bindSubmitToEnter) {
                this.element.removeEventListener('keyup', (e) => {
                    if (e.keyCode === 13) {
                        this.submitForm();
                    }
                });
            }
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'form';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        submitForm() {
            const submitEvent = DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
            this.element.dispatchEvent(submitEvent);
        }
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
})();
export { UxForm };
//# sourceMappingURL=ux-form.js.map