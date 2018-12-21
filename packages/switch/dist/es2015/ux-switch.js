var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { DOM, ElementEvents } from 'aurelia-framework';
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
    customElement('ux-switch')
], UxSwitch);
export { UxSwitch };
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
