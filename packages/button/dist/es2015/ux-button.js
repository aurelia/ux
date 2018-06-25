var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
let UxButton = class UxButton {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.ripple = null;
    }
    bind() {
        if (normalizeBooleanAttribute('disabled', this.disabled)) {
            this.button.setAttribute('disabled', '');
        }
        this.themeChanged(this.theme);
        this.typeChanged(this.type);
        this.sizeChanged(this.size);
        this.effectChanged(this.effect);
    }
    typeChanged(newValue) {
        const typeClasses = ['text', 'flat', 'outline', 'raised', 'fab'];
        this.button.classList.remove(...typeClasses);
        if (newValue == null || typeClasses.includes(newValue) === false) {
            newValue = 'raised';
        }
        this.button.classList.add(newValue);
    }
    sizeChanged(newValue) {
        const sizeClasses = ['small', 'medium', 'large'];
        this.button.classList.remove(...sizeClasses);
        if (newValue == null || sizeClasses.includes(newValue) === false) {
            newValue = 'medium';
        }
        this.button.classList.add(newValue);
    }
    effectChanged(newValue) {
        const effectClasses = ['ripple', 'none'];
        this.button.classList.remove(...effectClasses);
        if (newValue == null || effectClasses.includes(newValue) === false) {
            newValue = 'ripple';
        }
        this.button.classList.add(newValue);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'button';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    disabledChanged(newValue) {
        if (normalizeBooleanAttribute('disabled', newValue)) {
            this.button.setAttribute('disabled', '');
        }
        else {
            this.button.removeAttribute('disabled');
        }
    }
    onMouseDown(e) {
        if (this.button.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                this.button.appendChild(this.ripple.$);
            }
            if (this.button.classList.contains('fab')) {
                this.ripple.center = true;
                this.ripple.round = true;
            }
            this.ripple.downAction(e);
        }
        return true;
    }
    onMouseUp() {
        if (this.button.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
        return true;
    }
};
__decorate([
    bindable
], UxButton.prototype, "type", void 0);
__decorate([
    bindable
], UxButton.prototype, "size", void 0);
__decorate([
    bindable
], UxButton.prototype, "effect", void 0);
__decorate([
    bindable
], UxButton.prototype, "disabled", void 0);
__decorate([
    bindable
], UxButton.prototype, "theme", void 0);
UxButton = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-button')
], UxButton);
export { UxButton };
