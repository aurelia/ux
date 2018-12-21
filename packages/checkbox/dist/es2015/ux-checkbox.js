var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ElementEvents } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, } from '@aurelia-ux/core';
import { DOM } from 'aurelia-pal';
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
    getIndeterminate() {
        return this.indeterminate;
    }
    setIndeterminate(value) {
        this.indeterminate = !!value;
    }
    checkedChanged(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (newValue === true) {
            this.element.classList.add('ux-checkbox--checked');
        }
        else {
            this.element.classList.remove('ux-checkbox--checked');
        }
    }
    disabledChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-checkbox--disabled');
        }
        else {
            this.element.classList.remove('ux-checkbox--disabled');
        }
    }
    focusedChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-checkbox--focused');
        }
        else {
            this.element.classList.remove('ux-checkbox--focused');
        }
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
], UxCheckbox.prototype, "checked", void 0);
__decorate([
    observable()
], UxCheckbox.prototype, "value", void 0);
__decorate([
    observable()
], UxCheckbox.prototype, "focused", void 0);
__decorate([
    computedFrom('disabled')
], UxCheckbox.prototype, "isDisabled", null);
UxCheckbox = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-checkbox')
], UxCheckbox);
export { UxCheckbox };
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
