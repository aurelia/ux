System.register(["aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-button-theme"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_dependency_injection_1, core_1, ux_button_theme_1, theme, UxButton;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_button_theme_1_1) {
                ux_button_theme_1 = ux_button_theme_1_1;
            }
        ],
        execute: function () {
            theme = new ux_button_theme_1.UxButtonTheme();
            UxButton = /** @class */ (function () {
                function UxButton(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.disabled = false;
                    this.ripple = null;
                    styleEngine.ensureDefaultTheme(theme);
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
                    var typeClasses = ['flat', 'raised', 'fab', 'icon'];
                    (_a = this.button.classList).remove.apply(_a, typeClasses);
                    if (newValue == null || typeClasses.includes(newValue) === false) {
                        newValue = 'raised';
                    }
                    this.button.classList.add(newValue);
                    var _a;
                };
                UxButton.prototype.sizeChanged = function (newValue) {
                    var sizeClasses = ['small', 'medium', 'large'];
                    (_a = this.button.classList).remove.apply(_a, sizeClasses);
                    if (newValue == null || sizeClasses.includes(newValue) === false) {
                        newValue = 'medium';
                    }
                    this.button.classList.add(newValue);
                    var _a;
                };
                UxButton.prototype.effectChanged = function (newValue) {
                    var effectClasses = ['ripple', 'none'];
                    (_a = this.button.classList).remove.apply(_a, effectClasses);
                    if (newValue == null || effectClasses.includes(newValue) === false) {
                        newValue = 'ripple';
                    }
                    this.button.classList.add(newValue);
                    var _a;
                };
                UxButton.prototype.themeChanged = function (newValue) {
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
                    if (this.button.classList.contains('ripple')) {
                        if (this.ripple === null) {
                            this.ripple = new core_1.PaperRipple();
                            this.button.appendChild(this.ripple.$);
                        }
                        if (this.button.classList.contains('fab') || this.button.classList.contains('icon')) {
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
            exports_1("UxButton", UxButton);
        }
    };
});
