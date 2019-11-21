import { DOM, ElementEvents, bindingMode } from 'aurelia-framework';
import { observable, computedFrom, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { normalizeBooleanAttribute, PaperRipple, StyleEngine, AureliaUX } from '@aurelia-ux/core';
import { bindable, customElement, inlineView } from 'aurelia-templating';
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

var uxSwitch = "<template class=\"ux-switch ${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/switch/ux-switch.css\"></require> <input type=\"checkbox\" ref=\"checkbox\" class=\"ux-switch__inner-input\" checked.bind=\"value\" focus.bind=\"focused\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"value & booleanAttr\" aria-disabledb.bind=\"disabled & booleanAttr\"> <div class=\"ux-switch__track\"> <div class=\"ux-switch__indicator\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> </div> </div> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxSwitch
});

let UxSwitch = class UxSwitch {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        Object.setPrototypeOf(element, uxSwitchElementProto);
    }
    get isDisabled() {
        return normalizeBooleanAttribute('disabled', this.disabled);
    }
    bind() {
        if (this.element.hasAttribute('id')) {
            const attributeValue = this.element.getAttribute('id');
            if (attributeValue != null) {
                this.checkbox.setAttribute('id', attributeValue);
            }
        }
        if (this.element.hasAttribute('tabindex')) {
            const attributeValue = this.element.getAttribute('tabindex');
            if (attributeValue != null) {
                this.checkbox.setAttribute('tabindex', attributeValue);
            }
        }
        if (this.element.hasAttribute('checked')) {
            const attributeValue = this.element.getAttribute('checked');
            if (attributeValue || attributeValue === '') {
                this.element.checked = true;
            }
        }
        this.valueChanged(this.value);
        this.disabledChanged(this.checkbox.disabled);
        this.themeChanged(this.theme);
    }
    attached() {
        this.checkbox.addEventListener('change', stopEvent);
    }
    detached() {
        this.checkbox.removeEventListener('change', stopEvent);
    }
    getChecked() {
        return this.checked;
    }
    setChecked(value) {
        const oldValue = this.checked;
        const newValue = !!value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    checkedChanged(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (newValue === true) {
            this.element.classList.add('ux-switch--checked');
        }
        else {
            this.element.classList.remove('ux-switch--checked');
        }
    }
    focusedChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-switch--focused');
        }
        else {
            this.element.classList.remove('ux-switch--focused');
        }
    }
    valueChanged(newValue) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(newValue);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'switch';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    disabledChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-switch--disabled');
        }
        else {
            this.element.classList.remove('ux-switch--disabled');
        }
    }
    onMouseDown(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                const container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
            const winEvents = new ElementEvents(window);
            const upAction = () => {
                this.ripple.upAction();
                winEvents.disposeAll();
            };
            winEvents.subscribe('blur', upAction);
            winEvents.subscribe('mouseup', upAction, true);
        }
        e.preventDefault();
    }
};
__decorate([
    bindable
], UxSwitch.prototype, "disabled", void 0);
__decorate([
    bindable
], UxSwitch.prototype, "effect", void 0);
__decorate([
    bindable
], UxSwitch.prototype, "id", void 0);
__decorate([
    bindable
], UxSwitch.prototype, "theme", void 0);
__decorate([
    observable()
], UxSwitch.prototype, "checked", void 0);
__decorate([
    observable({ initializer: () => false })
], UxSwitch.prototype, "value", void 0);
__decorate([
    observable()
], UxSwitch.prototype, "focused", void 0);
__decorate([
    computedFrom('disabled')
], UxSwitch.prototype, "isDisabled", null);
UxSwitch = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-switch'),
    inlineView(VIEW)
], UxSwitch);
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxSwitchElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'checkbox',
    },
    checked: {
        get() {
            return getVm(this).getChecked();
        },
        set(value) {
            getVm(this).setChecked(value);
        }
    }
});

class UxSwitchTheme {
    constructor() {
        this.themeKey = 'switch';
    }
}

/// <reference path="html.d.ts" />
function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxSwitchConfig);
    config.globalResources(UxSwitch);
}
const uxSwitchConfig = {
    tagName: 'ux-switch',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { UxSwitch, UxSwitchTheme, configure };
//# sourceMappingURL=index.js.map
