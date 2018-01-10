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
import { UxCheckboxTheme } from './ux-checkbox-theme';
var theme = new UxCheckboxTheme();
var UxCheckbox = /** @class */ (function () {
    function UxCheckbox(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        styleEngine.ensureDefaultTheme(theme);
    }
    Object.defineProperty(UxCheckbox.prototype, "isDisabled", {
        get: function () {
            return normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    UxCheckbox.prototype.attached = function () {
        this.checkbox = this.element.querySelector('input');
        if (this.element.hasAttribute('id')) {
            var attributeValue = this.element.getAttribute('id');
            if (attributeValue != null) {
                this.checkbox.setAttribute('id', attributeValue);
            }
        }
        if (this.element.hasAttribute('tabindex')) {
            var attributeValue = this.element.getAttribute('tabindex');
            if (attributeValue != null) {
                this.checkbox.setAttribute('tabindex', attributeValue);
            }
        }
        if (this.element.hasAttribute('checked')) {
            var attributeValue = this.element.getAttribute('checked');
            if (attributeValue === 'true') {
                this.checked = true;
            }
        }
        this.themeChanged(this.theme);
        this.disabledChanged(this.disabled);
    };
    UxCheckbox.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'checkbox';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxCheckbox.prototype.disabledChanged = function (newValue) {
        if (this.checkbox == null) {
            return;
        }
        if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
            this.checkbox.setAttribute('disabled', '');
        }
        else if (this.element.classList.contains('disabled')) {
            this.checkbox.removeAttribute('disabled');
        }
    };
    UxCheckbox.prototype.onMouseDown = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
        }
        e.preventDefault();
    };
    UxCheckbox.prototype.onMouseUp = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
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
        bindable
    ], UxCheckbox.prototype, "matcher", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "model", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "checked", void 0);
    __decorate([
        bindable
    ], UxCheckbox.prototype, "value", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxCheckbox.prototype, "isDisabled", null);
    UxCheckbox = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-checkbox')
    ], UxCheckbox);
    return UxCheckbox;
}());
export { UxCheckbox };
