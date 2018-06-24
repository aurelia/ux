import { customElement, bindable, inlineView } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, AureliaUX } from '@aurelia-ux/core';
import { PLATFORM, bindingMode } from 'aurelia-framework';

class UxInputTheme {
    constructor() {
        this.themeKey = 'input';
    }
}

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
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var UX_INPUT_VIEW = "<template role=\"textbox\" class.bind=\"focused ? 'focused' : ''\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" aria-disabled.bind=\"disabled & booleanAttr\" aria-readonly.bind=\"readonly & booleanAttr\" click.trigger=\"focusInput()\"> <require from=\"@aurelia-ux/input/ux-input.css\"></require> <slot name=\"leading-icon\"></slot> <label if.bind=\"label || placeholder\">${label || placeholder}</label> <input ref=\"textbox\" value.bind=\"rawValue\" focus.bind=\"focused\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" required.bind=\"required & booleanAttr\"> <slot name=\"trailing-icon\"></slot> <div class=\"ux-input__border-bottom\"></div> <div class=\"ux-input__border-bottom-active\"></div> </template> ";

let UxInput = class UxInput {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.disabled = false;
        this.readonly = false;
        this.rawValue = '';
        this.focused = false;
        this.value = undefined;
        Object.setPrototypeOf(element, uxInputElementProto);
    }
    bind() {
        const element = this.element;
        const textbox = this.textbox;
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        if (element.hasAttribute('id')) {
            const attributeValue = element.getAttribute('id');
            if (attributeValue) {
                element.removeAttribute('id');
                textbox.setAttribute('id', attributeValue);
            }
        }
        if (element.hasAttribute('placeholder')) {
            const attributeValue = element.getAttribute('placeholder');
            if (attributeValue) {
                this.label = attributeValue;
            }
        }
        if (element.hasAttribute('step')) {
            const attributeValue = element.getAttribute('step');
            if (attributeValue) {
                textbox.setAttribute('step', attributeValue);
                element.removeAttribute('step');
            }
        }
        if ([
            'text',
            'password',
            'number',
            'email',
            'url',
            'tel',
            'search'
        ].includes(this.type)) {
            textbox.setAttribute('type', this.type);
        }
        if (this.min) {
            textbox.setAttribute('min', this.min.toString());
        }
        if (this.max) {
            textbox.setAttribute('max', this.max.toString());
        }
        if (this.minlength) {
            textbox.setAttribute('minlength', this.minlength.toString());
        }
        if (this.maxlength) {
            textbox.setAttribute('maxlength', this.maxlength.toString());
        }
        this.themeChanged(this.theme);
    }
    attached() {
        this.textbox.addEventListener('change', stopEvent);
        this.textbox.addEventListener('input', stopEvent);
    }
    detached() {
        this.textbox.removeEventListener('change', stopEvent);
        this.textbox.removeEventListener('input', stopEvent);
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        const oldValue = this.value;
        const newValue = this.processRawValue(value);
        if (oldValue !== newValue) {
            this.value = newValue;
            this.ignoreRawChanges = true;
            this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
            this.ignoreRawChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    processRawValue(rawValue) {
        let newValue = rawValue;
        if (this.type === 'number') {
            newValue = rawValue === '' ? NaN : Number(rawValue);
            if (isNaN(newValue)) {
                newValue = null;
            }
            else {
                if (this.min !== undefined && this.min > newValue) {
                    newValue = this.min;
                }
                if (this.max !== undefined && newValue > this.max) {
                    newValue = this.max;
                }
            }
        }
        return newValue;
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    focusedChanged(focused) {
        if (focused === true) {
            this.element.classList.add('ux-input--focused');
        }
        else {
            this.element.classList.remove('ux-input--focused');
        }
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    }
    typeChanged(newValue) {
        if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
            this.type = 'text';
        }
    }
    rawValueChanged(newValue) {
        if (newValue.length > 0) {
            this.element.classList.add('ux-input--has-value');
        }
        else {
            this.element.classList.remove('ux-input--has-value');
        }
        if (this.ignoreRawChanges) {
            return;
        }
        this.setValue(newValue);
    }
    focusInput() {
        this.textbox.focus();
    }
};
__decorate([
    bindable
], UxInput.prototype, "autofocus", void 0);
__decorate([
    bindable
], UxInput.prototype, "disabled", void 0);
__decorate([
    bindable
], UxInput.prototype, "maxlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "minlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "min", void 0);
__decorate([
    bindable
], UxInput.prototype, "max", void 0);
__decorate([
    bindable
], UxInput.prototype, "readonly", void 0);
__decorate([
    bindable
], UxInput.prototype, "theme", void 0);
__decorate([
    bindable
], UxInput.prototype, "label", void 0);
__decorate([
    bindable
], UxInput.prototype, "type", void 0);
__decorate([
    observable
], UxInput.prototype, "rawValue", void 0);
__decorate([
    observable
], UxInput.prototype, "focused", void 0);
UxInput = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-input'),
    inlineView(UX_INPUT_VIEW)
], UxInput);
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxInputElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get() {
            return getVm(this).getValue();
        },
        set(value) {
            getVm(this).setValue(value);
        }
    }
});

function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/input/ux-input')
    ]);
}
const uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};

export { configure, UxInputTheme, UxInput };
