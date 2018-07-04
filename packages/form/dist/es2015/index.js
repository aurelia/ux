import { customElement, bindable, inlineView, customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { StyleEngine } from '@aurelia-ux/core';
import { DOM as DOM$1 } from 'aurelia-framework';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var UX_FIELD_VIEW = "<template> <slot></slot> </template> ";

let UxField = class UxField {
    constructor(element) {
        this.element = element;
    }
    attached() {
        if (this.label && !this.element.querySelector('label')) {
            this.labelElement = document.createElement('label');
            this.labelElement.textContent = this.label;
            this.element.insertBefore(this.labelElement, this.element.firstChild);
        }
    }
    labelChanged(newValue) {
        if (this.labelElement != null) {
            this.labelElement.textContent = newValue;
        }
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

var UX_FORM_VIEW = "<template role=\"form\"> <slot></slot> </template> ";

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
    inlineView(UX_FORM_VIEW)
], UxForm);

let UxSubmitCustomAttribute = class UxSubmitCustomAttribute {
    constructor(element) {
        this.element = element;
        this.canSubmit = false;
    }
    attached() {
        let currentParent = this.element.parentElement;
        while (currentParent != null) {
            if (currentParent.tagName === 'UX-FORM') {
                this.canSubmit = true;
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
                this.element.addEventListener('mouseup', () => {
                    this.element.dispatchEvent(this.submitEvent);
                });
                break;
            }
            currentParent = currentParent.parentElement;
        }
    }
    detached() {
        if (this.canSubmit) {
            this.element.removeEventListener('mouseup', () => {
                this.element.dispatchEvent(this.submitEvent);
            });
        }
    }
};
UxSubmitCustomAttribute = __decorate([
    inject(Element),
    customAttribute('ux-submit')
], UxSubmitCustomAttribute);

var css = "ux-form{display:flex;flex-direction:column;width:100%}ux-form .form-row{display:flex;flex-direction:row}ux-form .form-row>*{margin-left:8px;margin-right:8px}ux-form .form-row>:last-child{margin-right:0}ux-form .form-row>:first-child{margin-left:0}ux-form ux-field{display:flex;flex-direction:column;width:100%;margin-top:16px}ux-form ux-field>label{font-size:14px;font-size:var(--ux-theme--form-label-font-size, 14px);color:inherit;color:var(--ux-theme--form-label-color, inherit)}";

class UxFormTheme {
    constructor() {
        this.themeKey = 'form';
    }
}

function configure(config) {
    DOM$1.injectStyles(css, undefined, undefined, 'ux-form-css');
    config.globalResources([
        UxField,
        UxForm,
        UxSubmitCustomAttribute,
    ]);
}

export { configure, UxFormTheme };
