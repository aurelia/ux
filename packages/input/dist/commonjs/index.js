'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaPal = require('aurelia-pal');
var aureliaBinding = require('aurelia-binding');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaFramework = require('aurelia-framework');

var css = "ux-input{display:flex;width:100%;height:56px;margin-top:8px;padding:0 16px;align-items:center;box-sizing:border-box;position:relative;cursor:text;color:inherit;color:var(--ux-theme--input-foreground, inherit);background-color:#00000011;background-color:var(--ux-theme--input-background, #00000011);border-radius:4px 4px 0 0;border-radius:var(--ux-theme--input-border-radius, 4px 4px 0 0)}ux-input:hover{background-color:#00000027;background-color:var(--ux-theme--input-background-hover, #00000027)}ux-input>input{width:100%;box-sizing:border-box;font-size:inherit;font-size:var(--ux-theme--input-font-size, inherit);letter-spacing:inherit;letter-spacing:var(--ux-theme--input-letter-spacing, inherit);padding:6px 0 4px 0;padding-right:0;padding-left:0;border:0;color:inherit;background-color:transparent;outline:0;padding-left:0;padding-right:0}ux-input label{position:absolute;cursor:text;font-size:13px;font-size:var(--ux-theme--input-label-font-size, 13px);letter-spacing:.5px;letter-spacing:var(--ux-theme--input-label-letter-spacing, 0.5px);transition:transform ease 150ms}ux-input.ux-input--focused label{color:#4043ff;color:var(--ux-theme--input-border-focus, var(--ux-design--primary, #4043ff))}ux-input.ux-input--has-value label,ux-input.ux-input--focused label{transform:translateY(-1.3em)}ux-input [slot=leading-icon]{margin-left:-8px;margin-right:8px}ux-input [slot=trailing-icon]{margin-left:8px;margin-right:-8px}ux-input.ux-input--has-value>[slot=leading-icon]~label,ux-input.ux-input--focused>[slot=leading-icon]~label{transform:translateX(24px) translateY(-1.3em)}ux-input [slot=leading-icon]~label{transform:translateX(24px)}ux-input :not(input){color:#555;color:var(--ux-theme--input-foreground-label, #555)}.ux-input__border-bottom{height:1px;background-color:#00000066;background-color:var(--ux-theme--input-border-bottom, #00000066);position:absolute;bottom:0;left:0;right:0}ux-input:hover .ux-input__border-bottom{background-color:#00000066;background-color:var(--ux-theme--input-border-bottom-hover, #00000066)}.ux-input__border-bottom-active{height:2px;background-color:#4043ff;background-color:var(--ux-theme--input-border-bottom-focus, var(--ux-design--primary, #4043ff));position:absolute;bottom:0;left:0;right:0;transform:scalex(0);transition:transform ease 150ms}ux-input input:focus~.ux-input__border-bottom-active{transform:scaleX(1)}ux-input.has-error input{box-shadow:none}ux-input.has-error .ux-input__border-bottom,ux-input.has-error .ux-input__border-bottom-active{background-color:#f44336;background-color:var(--ux-theme--input-error, #F44336)}ux-input.has-error>:not(input){color:#f44336;color:var(--ux-theme--input-error, #F44336)}ux-input[disabled],ux-input[readonly]{background-color:#e1e1e1;background-color:var(--ux-theme--input-disabled-background, #e1e1e1)}ux-input[disabled],ux-input[disabled] label,ux-input[disabled]:hover,ux-input[disabled]:focus,ux-input[readonly],ux-input[readonly] label,ux-input[readonly]:hover,ux-input[readonly]:focus{color:#989898;color:var(--ux-theme--input-disabled-foreground, #989898)}ux-input[disabled] .ux-input__border-bottom,ux-input[disabled]:hover .ux-input__border-bottom,ux-input[disabled]:focus .ux-input__border-bottom,ux-input[readonly] .ux-input__border-bottom,ux-input[readonly]:hover .ux-input__border-bottom,ux-input[readonly]:focus .ux-input__border-bottom{background-color:#989898;background-color:var(--ux-theme--input-disabled-border, #989898)}ux-input.outline{border:1px solid #00000066;border:1px solid var(--ux-theme--input-border, #00000066);border-radius:6px}ux-input.outline .ux-input__border-bottom,ux-input.outline .ux-input__border-bottom-active{display:none}ux-input.outline:hover{border:1px solid #00000066;border:1px solid var(--ux-theme--input-border-hover, #00000066)}ux-input.outline.ux-input--focused{border:2px solid #4043ff;border:2px solid var(--ux-theme--input-border-focus, var(--ux-design--primary, #4043ff))}ux-input.outline.ux-input--has-value label,ux-input.outline.ux-input--focused label{transform:translateX(0) translateY(-2.1em);padding-left:4px;padding-right:4px}ux-input.outline.has-error{border-color:#f44336;border-color:var(--ux-theme--input-error, #F44336)}"

var UxInputTheme = /** @class */ (function () {
    function UxInputTheme() {
        this.themeKey = 'input';
    }
    return UxInputTheme;
}());

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

var UX_INPUT_VIEW = "<template role=\"textbox\" class.bind=\"focused ? 'focused' : ''\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" aria-disabled.bind=\"disabled & booleanAttr\" aria-readonly.bind=\"readonly & booleanAttr\" click.trigger=\"focusInput()\"> <slot name=\"leading-icon\"></slot> <label if.bind=\"label || placeholder\">${label || placeholder}</label> <input ref=\"textbox\" value.bind=\"rawValue\" focus.bind=\"focused\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" required.bind=\"required & booleanAttr\"> <slot name=\"trailing-icon\"></slot> <div class=\"ux-input__border-bottom\"></div> <div class=\"ux-input__border-bottom-active\"></div> </template> ";

var UxInput = /** @class */ (function () {
    function UxInput(element, styleEngine) {
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
    UxInput.prototype.bind = function () {
        var element = this.element;
        var textbox = this.textbox;
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
            this.element.dispatchEvent(aureliaPal.DOM.createCustomEvent('change', { bubbles: true }));
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
        this.element.dispatchEvent(aureliaPal.DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
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
        aureliaTemplating.bindable
    ], UxInput.prototype, "autofocus", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "disabled", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "maxlength", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "minlength", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "min", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "max", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "readonly", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "theme", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "label", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxInput.prototype, "type", void 0);
    __decorate([
        aureliaBinding.observable
    ], UxInput.prototype, "rawValue", void 0);
    __decorate([
        aureliaBinding.observable
    ], UxInput.prototype, "focused", void 0);
    UxInput = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-input'),
        aureliaTemplating.inlineView(UX_INPUT_VIEW)
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

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-input-css');
    config.container.get(core.AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources([
        aureliaFramework.PLATFORM.moduleName('@aurelia-ux/input/ux-input')
    ]);
}
var uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: aureliaFramework.bindingMode.twoWay,
            getObserver: function (element) {
                return new aureliaBinding.ValueAttributeObserver(element, 'value', new aureliaBinding.EventSubscriber(['change']));
            }
        }
    }
};

exports.configure = configure;
exports.UxInputTheme = UxInputTheme;
exports.UxInput = UxInput;
