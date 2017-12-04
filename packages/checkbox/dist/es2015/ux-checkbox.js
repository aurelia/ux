var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxCheckboxTheme } from './ux-checkbox-theme';
const theme = new UxCheckboxTheme();
let UxCheckbox = class UxCheckbox {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = null;
        this.tabindex = 0;
        // tslint:disable
        this.matcher = (a, b) => a === b;
        // tslint: enable
        this.checked = false;
        this.value = null;
        this.uncheckedValue = null;
        this.ripple = null;
        styleEngine.ensureDefaultTheme(theme);
    }
    get isDisabled() {
        return normalizeBooleanAttribute('disabled', this.disabled);
    }
    bind() {
        this.themeChanged(this.theme);
        if (this.checked) {
            this.checkedChanged();
        }
        if (normalizeBooleanAttribute('disabled', this.disabled) && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    }
    attached() {
        if (this.id) {
            const labelElement = document.querySelector(`label[for=${this.id}]`);
            if (labelElement != null) {
                labelElement.addEventListener('click', () => {
                    this.toggleCheckbox();
                });
            }
        }
    }
    detached() {
        if (this.id) {
            const labelElement = document.querySelector(`label[for=${this.id}]`);
            if (labelElement != null) {
                labelElement.removeEventListener('click', () => {
                    this.toggleCheckbox();
                });
            }
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'checkbox';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    disabledChanged(newValue) {
        if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    }
    checkedChanged() {
        const elementValue = this.model ? this.model : this.value;
        let isChecked = this.checked;
        if (Array.isArray(this.checked)) {
            isChecked = this.checked.some(item => this.matcher(item, elementValue));
        }
        if (isChecked && isChecked !== this.uncheckedValue) {
            this.element.classList.add('checked');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('checked');
            this.element.setAttribute('aria-checked', 'false');
        }
    }
    toggleCheckbox() {
        if (this.isDisabled) {
            return;
        }
        const elementValue = this.model ? this.model : this.value;
        if (Array.isArray(this.checked)) {
            const index = this.checked.findIndex(item => this.matcher(item, elementValue));
            if (index === -1) {
                this.checked.push(elementValue);
            }
            else if (index !== -1) {
                this.checked.splice(index, 1);
            }
            this.checkedChanged();
        }
        else if (elementValue != null && typeof elementValue !== 'boolean') {
            if (this.checked && this.checked !== this.uncheckedValue) {
                if (this.uncheckedValue != null) {
                    this.checked = this.uncheckedValue;
                }
                else {
                    this.checked = null;
                }
            }
            else {
                this.checked = elementValue;
            }
        }
        else {
            this.checked = !this.checked;
        }
    }
    onKeydown(e) {
        const key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            e.preventDefault();
            this.toggleCheckbox();
        }
    }
    onMouseDown(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple')) {
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
        }
        this.toggleCheckbox();
        e.preventDefault();
    }
    onMouseUp(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
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
], UxCheckbox.prototype, "label", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "model", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "tabindex", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "theme", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "matcher", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "checked", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "uncheckedValue", void 0);
__decorate([
    computedFrom('disabled')
], UxCheckbox.prototype, "isDisabled", null);
UxCheckbox = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-checkbox')
], UxCheckbox);
export { UxCheckbox };
