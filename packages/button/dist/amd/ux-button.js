var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxButton = /** @class */ (function () {
        function UxButton(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.disabled = false;
            this.ripple = null;
        }
        UxButton.prototype.bind = function () {
            if (core_1.normalizeBooleanAttribute('disabled', this.disabled)) {
                this.button.setAttribute('disabled', '');
            }
            this.themeChanged(this.theme);
            this.typeChanged(this.type);
            this.sizeChanged(this.size);
            this.effectChanged(this.effect);
        };
        UxButton.prototype.typeChanged = function (newValue) {
            var _a;
            var typeClasses = [
                'ux-button--text',
                'ux-button--flat',
                'ux-button--outline',
                'ux-button--raised',
                'ux-button--fab'
            ];
            (_a = this.button.classList).remove.apply(_a, typeClasses);
            if (newValue === 'fab') {
                this.element.classList.add('ux-fab-button');
            }
            else {
                this.element.classList.remove('ux-fab-button');
            }
            if (newValue == null || typeClasses.includes("ux-button--" + newValue) === false) {
                newValue = 'raised';
            }
            this.button.classList.add("ux-button--" + newValue);
        };
        UxButton.prototype.sizeChanged = function (newValue) {
            var _a;
            var sizeClasses = ['ux-button--small', 'ux-button--medium', 'ux-button--large'];
            (_a = this.element.classList).remove.apply(_a, sizeClasses);
            if (newValue == null || sizeClasses.includes("ux-button--" + newValue) === false) {
                newValue = 'medium';
            }
            this.element.classList.add("ux-button--" + newValue);
        };
        UxButton.prototype.effectChanged = function (newValue) {
            var _a;
            var effectClasses = ['ux-button--ripple'];
            (_a = this.button.classList).remove.apply(_a, effectClasses);
            if (newValue == null || effectClasses.includes("ux-button--" + newValue) === false) {
                newValue = 'ripple';
            }
            this.button.classList.add("ux-button--" + newValue);
        };
        UxButton.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'button';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxButton.prototype.disabledChanged = function (newValue) {
            if (core_1.normalizeBooleanAttribute('disabled', newValue)) {
                this.button.setAttribute('disabled', '');
            }
            else {
                this.button.removeAttribute('disabled');
            }
        };
        UxButton.prototype.onMouseDown = function (e) {
            if (this.button.classList.contains('ux-button--ripple')) {
                if (this.ripple === null) {
                    this.ripple = new core_1.PaperRipple();
                    this.button.appendChild(this.ripple.$);
                }
                if (this.button.classList.contains('ux-button--fab')) {
                    this.ripple.center = true;
                    this.ripple.round = true;
                }
                this.ripple.downAction(e);
            }
            return true;
        };
        UxButton.prototype.onMouseUp = function () {
            if (this.button.classList.contains('ux-button--ripple') && this.ripple !== null) {
                this.ripple.upAction();
            }
            return true;
        };
        __decorate([
            aurelia_templating_1.bindable
        ], UxButton.prototype, "type", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxButton.prototype, "size", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxButton.prototype, "effect", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxButton.prototype, "disabled", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxButton.prototype, "theme", void 0);
        UxButton = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-button')
        ], UxButton);
        return UxButton;
    }());
    exports.UxButton = UxButton;
});
