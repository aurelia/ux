System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-switch-theme", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    function stopEvent(e) {
        e.stopPropagation();
    }
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, ux_switch_theme_1, aurelia_framework_1, theme, UxSwitch, getVm, uxSwitchElementProto;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_switch_theme_1_1) {
                ux_switch_theme_1 = ux_switch_theme_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            theme = new ux_switch_theme_1.UxSwitchTheme();
            UxSwitch = /** @class */ (function () {
                function UxSwitch(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.disabled = false;
                    this.effect = 'ripple';
                    this.ripple = null;
                    Object.setPrototypeOf(element, uxSwitchElementProto);
                    styleEngine.ensureDefaultTheme(theme);
                }
                Object.defineProperty(UxSwitch.prototype, "isDisabled", {
                    get: function () {
                        return core_1.normalizeBooleanAttribute('disabled', this.disabled);
                    },
                    enumerable: true,
                    configurable: true
                });
                UxSwitch.prototype.bind = function () {
                    var element = this.element;
                    var checkbox = this.checkbox;
                    if (element.hasAttribute('id')) {
                        var attributeValue = element.getAttribute('id');
                        if (attributeValue != null) {
                            checkbox.setAttribute('id', attributeValue);
                        }
                    }
                    if (element.hasAttribute('tabindex')) {
                        var attributeValue = element.getAttribute('tabindex');
                        if (attributeValue != null) {
                            checkbox.setAttribute('tabindex', attributeValue);
                        }
                    }
                    if (element.hasAttribute('checked')) {
                        var attributeValue = element.getAttribute('checked');
                        if (attributeValue || attributeValue === '') {
                            element.checked = true;
                        }
                    }
                    this.themeChanged(this.theme);
                    this.disabledChanged(this.disabled);
                };
                UxSwitch.prototype.attached = function () {
                    this.checkbox.addEventListener('change', stopEvent);
                };
                UxSwitch.prototype.detached = function () {
                    this.checkbox.removeEventListener('change', stopEvent);
                };
                UxSwitch.prototype.getChecked = function () {
                    return this.checked;
                };
                UxSwitch.prototype.setChecked = function (value) {
                    var oldValue = this.checked;
                    var newValue = !!value;
                    if (newValue !== oldValue) {
                        this.checked = newValue;
                        this.ignoreValueChanges = true;
                        this.value = newValue;
                        this.ignoreValueChanges = false;
                        this.element.dispatchEvent(aurelia_framework_1.DOM.createCustomEvent('change', { bubbles: true }));
                    }
                };
                UxSwitch.prototype.valueChanged = function (newValue) {
                    if (this.ignoreValueChanges) {
                        return;
                    }
                    this.setChecked(newValue);
                };
                UxSwitch.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'switch';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxSwitch.prototype.disabledChanged = function (newValue) {
                    if (core_1.normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
                        this.checkbox.setAttribute('disabled', '');
                    }
                    else if (this.element.classList.contains('disabled')) {
                        this.checkbox.removeAttribute('disabled');
                    }
                };
                UxSwitch.prototype.onMouseDown = function (e) {
                    var _this = this;
                    if (e.button !== 0 || this.isDisabled) {
                        return;
                    }
                    if (this.element.classList.contains('ripple')) {
                        if (this.ripple === null) {
                            this.ripple = new core_1.PaperRipple();
                            var container = this.element.querySelector('.ripplecontainer');
                            if (container != null) {
                                container.appendChild(this.ripple.$);
                            }
                        }
                        this.ripple.center = true;
                        this.ripple.round = true;
                        this.ripple.downAction(e);
                        var winEvents_1 = new aurelia_framework_1.ElementEvents(window);
                        var upAction = function () {
                            _this.ripple.upAction();
                            winEvents_1.disposeAll();
                        };
                        winEvents_1.subscribe('blur', upAction);
                        winEvents_1.subscribe('mouseup', upAction, true);
                    }
                    e.preventDefault();
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxSwitch.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxSwitch.prototype, "effect", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxSwitch.prototype, "id", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxSwitch.prototype, "theme", void 0);
                __decorate([
                    aurelia_binding_1.observable({ initializer: function () { return false; } })
                ], UxSwitch.prototype, "value", void 0);
                __decorate([
                    aurelia_binding_1.computedFrom('disabled')
                ], UxSwitch.prototype, "isDisabled", null);
                UxSwitch = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-switch')
                ], UxSwitch);
                return UxSwitch;
            }());
            exports_1("UxSwitch", UxSwitch);
            getVm = function (_) { return _.au.controller.viewModel; };
            uxSwitchElementProto = Object.create(HTMLElement.prototype, {
                type: {
                    value: 'checkbox',
                },
                checked: {
                    get: function () {
                        return getVm(this).getChecked();
                    },
                    set: function (value) {
                        getVm(this).setChecked(value);
                    }
                }
            });
        }
    };
});
