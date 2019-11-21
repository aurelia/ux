import { bindingMode } from 'aurelia-framework';
import { observable, ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { StyleEngine, AureliaUX } from '@aurelia-ux/core';
import { bindable, customElement, inlineView } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';

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

var uxInput = "<template role=\"textbox\" class=\"ux-input ${focused ? 'ux-input--focused' : ''}\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" aria-disabled.bind=\"disabled & booleanAttr\" aria-readonly.bind=\"readonly & booleanAttr\" click.trigger=\"focusInput()\"> <require from=\"@aurelia-ux/input/ux-input.css\"></require> <slot name=\"leading-icon\"></slot> <label class=\"ux-input__label\" if.bind=\"label || placeholder\">${label || placeholder}</label> <input ref=\"textbox\" class=\"ux-input__inner-input\" value.bind=\"rawValue\" focus.bind=\"focused\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" required.bind=\"required & booleanAttr\"> <slot name=\"trailing-icon\"></slot> <div class=\"ux-input__border-bottom\"></div> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxInput
});

var UxInput = /** @class */ (function () {
    function UxInput(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.disabled = false;
        this.readonly = false;
        this.rawValue = '';
        this.focused = false;
        Object.setPrototypeOf(element, uxInputElementProto);
    }
    UxInput.prototype.bind = function () {
        var element = this.element;
        var textbox = this.textbox;
        var textboxValue = this.textbox.getAttribute('value');
        if (textboxValue != null) {
            this.rawValue = textboxValue;
        }
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        if (element.hasAttribute('id')) {
            var attributeValue = element.getAttribute('id');
            if (attributeValue) {
                element.removeAttribute('id');
                textbox.setAttribute('id', attributeValue);
            }
        }
        if (element.hasAttribute('placeholder')) {
            var attributeValue = element.getAttribute('placeholder');
            if (attributeValue) {
                this.label = attributeValue;
            }
        }
        if (element.hasAttribute('step')) {
            var attributeValue = element.getAttribute('step');
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
        this.autocompleteChanged(this.autocomplete);
        this.themeChanged(this.theme);
    };
    UxInput.prototype.attached = function () {
        this.textbox.addEventListener('change', stopEvent);
        this.textbox.addEventListener('input', stopEvent);
    };
    UxInput.prototype.detached = function () {
        this.textbox.removeEventListener('change', stopEvent);
        this.textbox.removeEventListener('input', stopEvent);
    };
    UxInput.prototype.getValue = function () {
        return this.value;
    };
    UxInput.prototype.setValue = function (value) {
        var oldValue = this.value;
        var newValue = this.processRawValue(value);
        if (oldValue !== newValue) {
            this.value = newValue;
            this.ignoreRawChanges = true;
            this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
            this.ignoreRawChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxInput.prototype.processRawValue = function (rawValue) {
        var newValue = rawValue;
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
    };
    UxInput.prototype.autocompleteChanged = function (newValue) {
        if (newValue == null) {
            this.textbox.setAttribute('autocomplete', newValue);
        }
        else {
            this.textbox.removeAttribute('autocomplete');
        }
    };
    UxInput.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxInput.prototype.focusedChanged = function (focused) {
        if (focused === true) {
            this.element.classList.add('ux-input--focused');
        }
        else {
            this.element.classList.remove('ux-input--focused');
        }
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    UxInput.prototype.typeChanged = function (newValue) {
        if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
            this.type = 'text';
        }
    };
    UxInput.prototype.rawValueChanged = function (newValue) {
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
    };
    UxInput.prototype.focusInput = function () {
        this.textbox.focus();
    };
    __decorate([
        bindable
    ], UxInput.prototype, "autofocus", void 0);
    __decorate([
        bindable
    ], UxInput.prototype, "autocomplete", void 0);
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
        inlineView(VIEW)
    ], UxInput);
    return UxInput;
}());
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxInputElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get: function () {
            return getVm(this).getValue();
        },
        set: function (value) {
            getVm(this).setValue(value);
        }
    }
});

var UxInputTheme = /** @class */ (function () {
    function UxInputTheme() {
        this.themeKey = 'input';
    }
    return UxInputTheme;
}());

/// <reference path="html.d.ts" />
function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources(UxInput);
}
var uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};

export { UxInput, UxInputTheme, configure };
//# sourceMappingURL=index.js.map
