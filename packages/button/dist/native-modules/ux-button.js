var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
var UxButton = /** @class */ (function () {
    function UxButton(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.ripple = null;
    }
    UxButton.prototype.bind = function () {
        if (normalizeBooleanAttribute('disabled', this.disabled)) {
            this.button.setAttribute('disabled', '');
        }
        this.themeChanged(this.theme);
        this.typeChanged(this.type);
        this.sizeChanged(this.size);
        this.effectChanged(this.effect);
    };
    UxButton.prototype.typeChanged = function (newValue) {
        var _a;
        var typeClasses = ['text', 'flat', 'outline', 'raised', 'fab'];
        (_a = this.button.classList).remove.apply(_a, typeClasses);
        if (newValue == null || typeClasses.includes(newValue) === false) {
            newValue = 'raised';
        }
        this.button.classList.add(newValue);
    };
    UxButton.prototype.sizeChanged = function (newValue) {
        var _a;
        var sizeClasses = ['small', 'medium', 'large'];
        (_a = this.button.classList).remove.apply(_a, sizeClasses);
        if (newValue == null || sizeClasses.includes(newValue) === false) {
            newValue = 'medium';
        }
        this.button.classList.add(newValue);
    };
    UxButton.prototype.effectChanged = function (newValue) {
        var _a;
        var effectClasses = ['ripple', 'none'];
        (_a = this.button.classList).remove.apply(_a, effectClasses);
        if (newValue == null || effectClasses.includes(newValue) === false) {
            newValue = 'ripple';
        }
        this.button.classList.add(newValue);
    };
    UxButton.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'button';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxButton.prototype.disabledChanged = function (newValue) {
        if (normalizeBooleanAttribute('disabled', newValue)) {
            this.button.setAttribute('disabled', '');
        }
        else {
            this.button.removeAttribute('disabled');
        }
    };
    UxButton.prototype.onMouseDown = function (e) {
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
    };
    UxButton.prototype.onMouseUp = function () {
        if (this.button.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
        return true;
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
    return UxButton;
}());
export { UxButton };
