var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
const theme = new UxSwitchTheme();
let UxSwitch = class UxSwitch {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        styleEngine.ensureDefaultTheme(theme);
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
            if (attributeValue === 'true') {
                this.checked = true;
            }
        }
        this.themeChanged(this.theme);
        this.disabledChanged(this.disabled);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'switch';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    disabledChanged(newValue) {
        if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
            this.checkbox.setAttribute('disabled', '');
        }
        else if (this.element.classList.contains('disabled')) {
            this.checkbox.removeAttribute('disabled');
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
        }
        e.preventDefault();
    }
    onMouseUp(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
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
    bindable
], UxSwitch.prototype, "checked", void 0);
__decorate([
    computedFrom('disabled')
], UxSwitch.prototype, "isDisabled", null);
UxSwitch = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-switch')
], UxSwitch);
export { UxSwitch };
