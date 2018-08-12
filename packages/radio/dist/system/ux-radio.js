System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-framework"], function (exports_1, context_1) {
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
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, aurelia_framework_1, UxRadio, getVm, uxRadioElementProto;
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
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            UxRadio = /** @class */ (function () {
                function UxRadio(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.disabled = false;
                    this.effect = 'ripple';
                    this.checked = false;
                    this.ripple = null;
                    Object.setPrototypeOf(element, uxRadioElementProto);
                }
                Object.defineProperty(UxRadio.prototype, "isDisabled", {
                    get: function () {
                        return core_1.normalizeBooleanAttribute('disabled', this.disabled);
                    },
                    enumerable: true,
                    configurable: true
                });
                UxRadio.prototype.bind = function () {
                    var element = this.element;
                    var radio = this.radio;
                    if (element.hasAttribute('id')) {
                        var id = element.id;
                        if (id != null) {
                            radio.setAttribute('id', id);
                            element.removeAttribute('id');
                        }
                    }
                    if (element.hasAttribute('tabindex')) {
                        var tabIndex = element.getAttribute('tabindex');
                        if (tabIndex != null) {
                            radio.setAttribute('tabindex', tabIndex);
                            element.removeAttribute('tabindex');
                        }
                    }
                    if (element.hasAttribute('checked')) {
                        element.checked = true;
                    }
                    if (this.checked) {
                        radio.checked = true;
                    }
                    this.themeChanged(this.theme);
                };
                UxRadio.prototype.attached = function () {
                    this.radio.addEventListener('change', stopEvent);
                };
                UxRadio.prototype.detached = function () {
                    this.radio.removeEventListener('change', stopEvent);
                };
                UxRadio.prototype.getChecked = function () {
                    return this.checked;
                };
                UxRadio.prototype.setChecked = function (value) {
                    var oldValue = this.checked;
                    var newValue = value;
                    if (newValue !== oldValue) {
                        this.checked = newValue;
                        this.ignoreValueChanges = true;
                        this.value = newValue;
                        if (this.radio) {
                            this.radio.checked = !!newValue;
                        }
                        this.ignoreValueChanges = false;
                        this.element.dispatchEvent(aurelia_framework_1.DOM.createCustomEvent('change', { bubbles: true }));
                    }
                };
                UxRadio.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'radio';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxRadio.prototype.valueChanged = function (value) {
                    if (this.ignoreValueChanges) {
                        return;
                    }
                    this.setChecked(value);
                };
                UxRadio.prototype.onMouseDown = function (e) {
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
                ], UxRadio.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxRadio.prototype, "effect", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxRadio.prototype, "id", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxRadio.prototype, "theme", void 0);
                __decorate([
                    aurelia_binding_1.observable({ initializer: function () { return false; } })
                ], UxRadio.prototype, "value", void 0);
                __decorate([
                    aurelia_binding_1.computedFrom('disabled')
                ], UxRadio.prototype, "isDisabled", null);
                UxRadio = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-radio')
                ], UxRadio);
                return UxRadio;
            }());
            exports_1("UxRadio", UxRadio);
            getVm = function (_) { return _.au.controller.viewModel; };
            uxRadioElementProto = Object.create(HTMLElement.prototype, {
                type: {
                    value: 'radio',
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
