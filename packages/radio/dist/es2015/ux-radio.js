var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';
let UxRadio = class UxRadio {
    constructor(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = null;
        this.tabindex = 0;
        // tslint:disable
        this.matcher = (a, b) => a === b;
        // tslint: enable
        this.checked = false;
        this.value = null;
        this.ripple = null;
        styleEngine.ensureDefaultTheme(new UxRadioTheme());
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
                    this.toggleRadio();
                });
            }
        }
    }
    detached() {
        if (this.id) {
            const labelElement = document.querySelector(`label[for=${this.id}]`);
            if (labelElement != null) {
                labelElement.removeEventListener('click', () => {
                    this.toggleRadio();
                });
            }
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'radio';
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
        if (isChecked && isChecked === elementValue) {
            this.element.classList.add('checked');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('checked');
            this.element.setAttribute('aria-checked', 'false');
        }
    }
    toggleRadio() {
        if (this.isDisabled) {
            return;
        }
        const elementValue = this.model ? this.model : this.value;
        if (elementValue != null && typeof elementValue !== 'boolean') {
            this.checked = elementValue;
        }
        else {
            this.checked = !this.checked;
        }
    }
    onKeydown(e) {
        const key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            e.preventDefault();
            this.toggleRadio();
        }
        return true;
    }
    onMouseDown(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.radio.classList.contains('ripple')) {
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
        this.toggleRadio();
        e.preventDefault();
    }
    onMouseUp(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.radio.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
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
], UxRadio.prototype, "label", void 0);
__decorate([
    bindable
], UxRadio.prototype, "model", void 0);
__decorate([
    bindable
], UxRadio.prototype, "tabindex", void 0);
__decorate([
    bindable
], UxRadio.prototype, "theme", void 0);
__decorate([
    bindable
], UxRadio.prototype, "matcher", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxRadio.prototype, "checked", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxRadio.prototype, "value", void 0);
__decorate([
    computedFrom('disabled')
], UxRadio.prototype, "isDisabled", null);
UxRadio = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-radio')
], UxRadio);
export { UxRadio };
