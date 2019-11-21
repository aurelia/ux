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

var uxRadio = "<template class=\"ux-radio ${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/radio/ux-radio.css\"></require> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <input type=\"radio\" ref=\"radio\" class=\"ux-radio__inner-input\" change.trigger=\"value = $event.target.checked\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" focus.bind=\"focused\" aria-checked.bind=\"indeterminate ? 'mixed' : checked ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ux-radio__border\"> <div class=\"ux-radio__background-fill\"> </div> </div> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxRadio
});

let UxRadio = class UxRadio {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.checked = false;
        this.ripple = null;
        Object.setPrototypeOf(element, uxRadioElementProto);
    }
    get isDisabled() {
        return normalizeBooleanAttribute('disabled', this.disabled);
    }
    bind() {
        if (this.element.hasAttribute('id')) {
            const id = this.element.id;
            if (id != null) {
                this.radio.setAttribute('id', id);
                this.element.removeAttribute('id');
            }
        }
        if (this.element.hasAttribute('tabindex')) {
            const tabIndex = this.element.getAttribute('tabindex');
            if (tabIndex != null) {
                this.radio.setAttribute('tabindex', tabIndex);
                this.element.removeAttribute('tabindex');
            }
        }
        if (this.element.hasAttribute('name')) {
            const name = this.element.getAttribute('name');
            if (name != null) {
                this.radio.setAttribute('name', name);
                this.element.removeAttribute('name');
            }
        }
        if (this.element.hasAttribute('checked')) {
            this.element.checked = true;
        }
        if (this.checked) {
            this.radio.checked = true;
            this.element.classList.add('ux-radio--checked');
        }
        this.disabledChanged(this.radio.disabled);
        this.themeChanged(this.theme);
    }
    attached() {
        this.radio.addEventListener('change', stopEvent);
    }
    detached() {
        this.radio.removeEventListener('change', stopEvent);
    }
    getChecked() {
        return this.checked;
    }
    setChecked(value) {
        const oldValue = this.checked;
        const newValue = value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            if (this.radio) {
                this.radio.checked = !!newValue;
                if (this.radio.checked) {
                    this.element.classList.add('ux-radio--checked');
                }
                else {
                    this.element.classList.remove('ux-radio--checked');
                }
            }
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    disabledChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-radio--disabled');
        }
        else {
            this.element.classList.remove('ux-radio--disabled');
        }
    }
    focusedChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-radio--focused');
        }
        else {
            this.element.classList.remove('ux-radio--focused');
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'radio';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    valueChanged(value) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(value);
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
        return true;
    }
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
    observable({ initializer: () => false })
], UxRadio.prototype, "value", void 0);
__decorate([
    observable()
], UxRadio.prototype, "focused", void 0);
__decorate([
    computedFrom('disabled')
], UxRadio.prototype, "isDisabled", null);
UxRadio = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-radio'),
    inlineView(VIEW)
], UxRadio);
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxRadioElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'radio',
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

class UxRadioTheme {
    constructor() {
        this.themeKey = 'radio';
    }
}

/// <reference path="html.d.ts" />
function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources(UxRadio);
}
const uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { UxRadio, UxRadioTheme, configure };
//# sourceMappingURL=index.js.map
