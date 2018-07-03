'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaBinding = require('aurelia-binding');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaFramework = require('aurelia-framework');

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

var UX_RADIO_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <input type=\"radio\" ref=\"radio\" change.trigger=\"value = $event.target.checked\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"indeterminate ? 'mixed' : checked ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <div class=\"radio\"> <div class=\"background-box\"> </div> </div> </template> ";

var UxRadio = /** @class */ (function () {
    function UxRadio(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.checked = false;
        this.ripple = null;
        Object.setPrototypeOf(element, uxRadioElementProto);
    }
    Object.defineProperty(UxRadio.prototype, "isDisabled", {
        get: function () {
            return core.normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    UxRadio.prototype.bind = function () {
        var element = this.element;
        var radio = this.radio;
        if (element.hasAttribute('id')) {
            var id = element.id;
            if (id != null) {
                radio.setAttribute('id', id);
                element.removeAttribute('id');
            }
        }
        if (element.hasAttribute('tabindex')) {
            var tabIndex = element.getAttribute('tabindex');
            if (tabIndex != null) {
                radio.setAttribute('tabindex', tabIndex);
                element.removeAttribute('tabindex');
            }
        }
        if (element.hasAttribute('checked')) {
            element.checked = true;
        }
        if (this.checked) {
            radio.checked = true;
        }
        this.themeChanged(this.theme);
    };
    UxRadio.prototype.attached = function () {
        this.radio.addEventListener('change', stopEvent);
    };
    UxRadio.prototype.detached = function () {
        this.radio.removeEventListener('change', stopEvent);
    };
    UxRadio.prototype.getChecked = function () {
        return this.checked;
    };
    UxRadio.prototype.setChecked = function (value) {
        var oldValue = this.checked;
        var newValue = value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            if (this.radio) {
                this.radio.checked = !!newValue;
            }
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxRadio.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'radio';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxRadio.prototype.valueChanged = function (value) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(value);
    };
    UxRadio.prototype.onMouseDown = function (e) {
        var _this = this;
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new core.PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
            var winEvents_1 = new aureliaFramework.ElementEvents(window);
            var upAction = function () {
                _this.ripple.upAction();
                winEvents_1.disposeAll();
            };
            winEvents_1.subscribe('blur', upAction);
            winEvents_1.subscribe('mouseup', upAction, true);
        }
        e.preventDefault();
    };
    __decorate([
        aureliaTemplating.bindable
    ], UxRadio.prototype, "disabled", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxRadio.prototype, "effect", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxRadio.prototype, "id", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxRadio.prototype, "theme", void 0);
    __decorate([
        aureliaBinding.observable({ initializer: function () { return false; } })
    ], UxRadio.prototype, "value", void 0);
    __decorate([
        aureliaBinding.computedFrom('disabled')
    ], UxRadio.prototype, "isDisabled", null);
    UxRadio = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-radio'),
        aureliaTemplating.inlineView(UX_RADIO_VIEW)
    ], UxRadio);
    return UxRadio;
}());
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxRadioElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'radio',
    },
    checked: {
        get: function () {
            return getVm(this).getChecked();
        },
        set: function (value) {
            getVm(this).setChecked(value);
        }
    }
});

var css = "ux-radio{display:inline-block;outline:0;height:24px;width:24px;box-sizing:border-box;position:relative}ux-radio>input{position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;width:100%;height:100%;cursor:pointer;z-index:1}ux-radio>input:disabled{cursor:default}ux-radio>.radio{width:24px;height:24px;border:solid 2px #455a64;border:var(--ux-theme--checkbox-border, solid 2px #455A64);border-radius:50%;display:inline-flex;box-sizing:border-box;cursor:pointer;align-items:center;justify-content:center}ux-radio input:hover:not(:disabled)~.radio{border:solid 2px #ff4081;border:var(--ux-theme--radio-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-radio input:checked~.radio{border:solid 2px #ff4081;border:var(--ux-theme--radio-checked-background, var(--ux-design--accent, #FF4081));border:var(--ux-theme--radio-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-radio>.radio>.background-box{width:100%;height:100%;background-color:#ff4081;background-color:var(--ux-theme--radio-checked-background, var(--ux-design--accent, #FF4081));border-radius:50%;transform:scale3d(0,0,0);transition:150ms}ux-radio input:checked~.radio>.background-box{transform:scale3d(.75,.75,.75)}ux-radio>.radio>.background-box>svg{fill:#fff;fill:var(--ux-theme--radio-checkmark-color, #FFF)}ux-radio.disabled{pointer-events:none;cursor:default}ux-radio input:disabled~.radio:hover{border:solid 2px #9e9e9e;border:var(--ux-theme--radio-disabled-border, solid 2px #9E9E9E)}ux-radio input:disabled~.radio{border:solid 2px #9e9e9e;border:var(--ux-theme--radio-disabled-border, solid 2px #9E9E9E)}ux-radio input:checked:disabled~.radio>.background-box{background-color:#9e9e9e;background-color:var(--ux-theme--radio-disabled-background, #9E9E9E)}ux-radio input:disabled~.radio>.background-box::after{border-color:#e0e0e0;border-color:var(--ux-theme--radio-disabled-foreground, #E0E0E0)}ux-radio .ripplecontainer{position:relative;width:0;height:0}ux-radio .ripplecontainer>.paper-ripple{top:auto;left:auto;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%}ux-radio .ripplecontainer>.ripple{position:absolute;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.22);transition:transform 100ms ease-in-out;transform:scale3d(0,0,0)}ux-radio input:focus~.ripplecontainer>.ripple{transform:scale3d(1,1,1)}ux-radio input:disabled:focus~.ripplecontainer>.ripple{transform:scale3d(0,0,0)}"

var UxRadioTheme = /** @class */ (function () {
    function UxRadioTheme() {
        this.themeKey = 'radio';
    }
    return UxRadioTheme;
}());

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-radio-css');
    config.container.get(core.AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources(UxRadio);
}
var uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: aureliaFramework.bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new aureliaBinding.CheckedObserver(element, new aureliaBinding.EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

exports.configure = configure;
exports.UxRadioTheme = UxRadioTheme;
exports.UxRadio = UxRadio;
