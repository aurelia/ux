var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
let UxSwitch = class UxSwitch {
    constructor(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = null;
        this.tabindex = 0;
        this.checked = false;
        styleEngine.ensureDefaultTheme(new UxSwitchTheme());
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
                    this.toggleSwitch();
                });
            }
        }
    }
    detached() {
        if (this.id) {
            const labelElement = document.querySelector(`label[for=${this.id}]`);
            if (labelElement != null) {
                labelElement.removeEventListener('click', () => {
                    this.toggleSwitch();
                });
            }
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'switch';
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
        if (this.checked) {
            this.element.classList.add('on');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('on');
            this.element.setAttribute('aria-checked', 'false');
        }
    }
    toggleSwitch() {
        if (this.isDisabled) {
            return;
        }
        this.checked = !this.checked;
    }
    onKeydown(e) {
        const key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            e.preventDefault();
            this.toggleSwitch();
        }
        return true;
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
], UxSwitch.prototype, "tabindex", void 0);
__decorate([
    bindable
], UxSwitch.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxSwitch.prototype, "checked", void 0);
__decorate([
    computedFrom('disabled')
], UxSwitch.prototype, "isDisabled", null);
UxSwitch = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-switch')
], UxSwitch);
export { UxSwitch };
