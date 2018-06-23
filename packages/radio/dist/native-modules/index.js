import { customElement, bindable, inlineView } from 'aurelia-templating';
import { computedFrom, observable, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, AureliaUX } from '@aurelia-ux/core';
import { ElementEvents, DOM, bindingMode } from 'aurelia-framework';

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

var UX_RADIO_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"./ux-radio.css\"></require> <input type=\"radio\" ref=\"radio\" change.trigger=\"value = $event.target.checked\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"indeterminate ? 'mixed' : checked ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <div class=\"radio\"> <div class=\"background-box\"> </div> </div> </template> ";

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
            return normalizeBooleanAttribute('disabled', this.disabled);
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
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
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
                this.ripple = new PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
            var winEvents_1 = new ElementEvents(window);
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
        bindable
    ], UxRadio.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "theme", void 0);
    __decorate([
        observable({ initializer: function () { return false; } })
    ], UxRadio.prototype, "value", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxRadio.prototype, "isDisabled", null);
    UxRadio = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-radio'),
        inlineView(UX_RADIO_VIEW)
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

var UxRadioTheme = /** @class */ (function () {
    function UxRadioTheme() {
        this.themeKey = 'radio';
    }
    return UxRadioTheme;
}());

function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources(UxRadio);
}
var uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { configure, UxRadioTheme, UxRadio };
