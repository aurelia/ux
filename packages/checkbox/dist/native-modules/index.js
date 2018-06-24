import { customElement, bindable, ElementEvents, inlineView } from 'aurelia-templating';
import { computedFrom, observable, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, AureliaUX } from '@aurelia-ux/core';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-framework';

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

var UX_CHECKBOX_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"./ux-checkbox.css\"></require> <input type=\"checkbox\" ref=\"checkbox\" checked.bind=\"value\" indeterminate.bind=\"indeterminate\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked=\"indeterminate ? 'mixed' : value ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <div class=\"checkbox\"> <div class=\"background-box\"> <svg viewBox=\"0 0 24 24\"> <path d=\"M0 0h24v24H0z\" fill=\"none\"/> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/> </svg> </div> </div> </template> ";

var UxCheckbox = /** @class */ (function () {
    function UxCheckbox(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.ignoreValueChanges = false;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        Object.setPrototypeOf(element, uxCheckboxElementProto);
    }
    Object.defineProperty(UxCheckbox.prototype, "isDisabled", {
        get: function () {
            return normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    UxCheckbox.prototype.bind = function () {
        var element = this.element;
        var checkbox = this.checkbox;
        if (element.hasAttribute('id')) {
            var attributeValue = element.getAttribute('id');
            if (attributeValue != null) {
                checkbox.setAttribute('id', attributeValue);
            }
        }
        if (element.hasAttribute('tabindex')) {
            var attributeValue = element.getAttribute('tabindex');
            if (attributeValue != null) {
                checkbox.setAttribute('tabindex', attributeValue);
            }
        }
        if (element.hasAttribute('checked')) {
            var attributeValue = element.getAttribute('checked');
            if (attributeValue || attributeValue === '') {
                element.checked = true;
            }
        }
        this.themeChanged(this.theme);
    };
    UxCheckbox.prototype.attached = function () {
        this.checkbox.addEventListener('change', stopEvent);
    };
    UxCheckbox.prototype.detached = function () {
        this.checkbox.removeEventListener('change', stopEvent);
    };
    UxCheckbox.prototype.getChecked = function () {
        return this.checked;
    };
    UxCheckbox.prototype.setChecked = function (value) {
        var oldValue = this.checked;
        var newValue = !!value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxCheckbox.prototype.getIndeterminate = function () {
        return this.indeterminate;
    };
    UxCheckbox.prototype.setIndeterminate = function (value) {
        this.indeterminate = !!value;
    };
    UxCheckbox.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'checkbox';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxCheckbox.prototype.valueChanged = function (newValue) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(newValue);
    };
    UxCheckbox.prototype.onMouseDown = function (e) {
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
    ], UxCheckbox.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "theme", void 0);
    __decorate([
        observable()
    ], UxCheckbox.prototype, "value", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxCheckbox.prototype, "isDisabled", null);
    UxCheckbox = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-checkbox'),
        inlineView(UX_CHECKBOX_VIEW)
    ], UxCheckbox);
    return UxCheckbox;
}());
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxCheckboxElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'checkbox',
    },
    checked: {
        get: function () {
            return getVm(this).getChecked();
        },
        set: function (value) {
            getVm(this).setChecked(value);
        }
    },
    indeterminate: {
        get: function () {
            return getVm(this).getIndeterminate();
        },
        set: function (value) {
            getVm(this).setIndeterminate(value);
        }
    }
});

var UxCheckboxTheme = /** @class */ (function () {
    function UxCheckboxTheme() {
        this.themeKey = 'checkbox';
    }
    return UxCheckboxTheme;
}());

function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources(UxCheckbox);
}
var uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { configure, UxCheckbox, UxCheckboxTheme };
