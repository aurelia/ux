import { customElement, bindable, ElementEvents, inlineView } from 'aurelia-templating';
import { computedFrom, observable, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, AureliaUX } from '@aurelia-ux/core';
import { DOM } from 'aurelia-pal';
import { bindingMode, DOM as DOM$1 } from 'aurelia-framework';

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

var UX_CHECKBOX_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <input type=\"checkbox\" ref=\"checkbox\" checked.bind=\"value\" indeterminate.bind=\"indeterminate\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked=\"indeterminate ? 'mixed' : value ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <div class=\"checkbox\"> <div class=\"background-box\"> <svg viewBox=\"0 0 24 24\"> <path d=\"M0 0h24v24H0z\" fill=\"none\"/> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/> </svg> </div> </div> </template> ";

let UxCheckbox = class UxCheckbox {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.ignoreValueChanges = false;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        Object.setPrototypeOf(element, uxCheckboxElementProto);
    }
    get isDisabled() {
        return normalizeBooleanAttribute('disabled', this.disabled);
    }
    bind() {
        const element = this.element;
        const checkbox = this.checkbox;
        if (element.hasAttribute('id')) {
            const attributeValue = element.getAttribute('id');
            if (attributeValue != null) {
                checkbox.setAttribute('id', attributeValue);
            }
        }
        if (element.hasAttribute('tabindex')) {
            const attributeValue = element.getAttribute('tabindex');
            if (attributeValue != null) {
                checkbox.setAttribute('tabindex', attributeValue);
            }
        }
        if (element.hasAttribute('checked')) {
            const attributeValue = element.getAttribute('checked');
            if (attributeValue || attributeValue === '') {
                element.checked = true;
            }
        }
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
    getIndeterminate() {
        return this.indeterminate;
    }
    setIndeterminate(value) {
        this.indeterminate = !!value;
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'checkbox';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    valueChanged(newValue) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(newValue);
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
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxCheckboxElementProto = Object.create(HTMLElement.prototype, {
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
    },
    indeterminate: {
        get() {
            return getVm(this).getIndeterminate();
        },
        set(value) {
            getVm(this).setIndeterminate(value);
        }
    }
});

var css = "ux-checkbox{display:inline-block;outline:0;height:24px;width:24px;box-sizing:border-box;position:relative}ux-checkbox>input{position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;width:100%;height:100%;cursor:pointer;z-index:1}ux-checkbox>input:disabled{cursor:default}ux-checkbox>.checkbox{border:solid 2px #616161;border:var(--ux-theme--checkbox-border, solid 2px #616161);border-radius:3px;display:block;position:relative;box-sizing:border-box;width:100%;height:100%}ux-checkbox input:hover:not(:disabled)~.checkbox{border:solid 2px #ff4081;border:var(--ux-theme--checkbox-hover-border, solid 2px var(--ux-design--accent, #FF4081));border-radius:3px}ux-checkbox input:checked~.checkbox{border:solid 2px #ff4081;border:var(--ux-theme--checkbox-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-checkbox>.checkbox>.background-box{transform:scale3d(0,0,0);transition:100ms;background-color:#ff4081;background-color:var(--ux-theme--checkbox-checked-background, var(--ux-design--accent, #FF4081));height:inherit;width:inherit}ux-checkbox input:checked~.checkbox>.background-box{transform:none}ux-checkbox>.checkbox>.background-box>svg{fill:#fff;fill:var(--ux-theme--checkbox-checkmark-color, #fff);width:20px;height:20px}ux-checkbox.disabled{pointer-events:none;cursor:default}ux-checkbox.disabled>.checkbox:hover{border:solid 2px #607d8b;border:var(--ux-theme--checkbox-disabled-border, solid 2px #607D8B);border-radius:3px}ux-checkbox input:disabled~.checkbox{border:solid 2px #607d8b;border:var(--ux-theme--checkbox-disabled-border, solid 2px #607D8B)}ux-checkbox input:checked:disabled~.checkbox>.background-box{background-color:#9e9e9e;background-color:var(--ux-theme--checkbox-disabled-background, #9E9E9E)}ux-checkbox input:disabled~.checkbox>.background-box::after{border-color:#e0e0e0;border-color:var(--ux-theme--checkbox-disabled-foreground, #E0E0E0)}ux-checkbox .ripplecontainer{position:relative;width:0;height:0}ux-checkbox .ripplecontainer>.paper-ripple{top:auto;left:auto;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%}ux-checkbox .ripplecontainer>.ripple{position:absolute;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.22);transition:transform 100ms ease-in-out;transform:scale3d(0,0,0)}ux-checkbox input:focus~.ripplecontainer>.ripple{transform:scale3d(1,1,1)}ux-checkbox input:disabled:focus~.ripplecontainer>.ripple{transform:scale3d(0,0,0)}";

class UxCheckboxTheme {
    constructor() {
        this.themeKey = 'checkbox';
    }
}

function configure(config) {
    DOM$1.injectStyles(css, undefined, undefined, 'ux-checkbox-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources(UxCheckbox);
}
const uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { configure, UxCheckbox, UxCheckboxTheme };
