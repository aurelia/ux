System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-pal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, aurelia_pal_1, UxCheckbox, getVm, uxCheckboxElementProto;
    var __moduleName = context_1 && context_1.id;
    function stopEvent(e) {
        e.stopPropagation();
    }
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
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            }
        ],
        execute: function () {
            UxCheckbox = /** @class */ (function () {
                function UxCheckbox(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.ignoreValueChanges = false;
                    this.disabled = false;
                    this.effect = 'ripple';
                    this.ripple = null;
                    Object.setPrototypeOf(element, uxCheckboxElementProto);
                }
                Object.defineProperty(UxCheckbox.prototype, "isDisabled", {
                    get: function () {
                        return core_1.normalizeBooleanAttribute('disabled', this.disabled);
                    },
                    enumerable: true,
                    configurable: true
                });
                UxCheckbox.prototype.bind = function () {
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
                    this.valueChanged(this.value);
                    this.disabledChanged(this.checkbox.disabled);
                    this.themeChanged(this.theme);
                };
                UxCheckbox.prototype.attached = function () {
                    this.checkbox.addEventListener('change', stopEvent);
                };
                UxCheckbox.prototype.detached = function () {
                    this.checkbox.removeEventListener('change', stopEvent);
                };
                UxCheckbox.prototype.getChecked = function () {
                    return this.checked;
                };
                UxCheckbox.prototype.setChecked = function (value) {
                    var oldValue = this.checked;
                    var newValue = !!value;
                    if (newValue !== oldValue) {
                        this.checked = newValue;
                        this.ignoreValueChanges = true;
                        this.value = newValue;
                        this.ignoreValueChanges = false;
                        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
                    }
                };
                UxCheckbox.prototype.getIndeterminate = function () {
                    return this.indeterminate;
                };
                UxCheckbox.prototype.setIndeterminate = function (value) {
                    this.indeterminate = !!value;
                };
                UxCheckbox.prototype.checkedChanged = function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    if (newValue === true) {
                        this.element.classList.add('ux-checkbox--checked');
                    }
                    else {
                        this.element.classList.remove('ux-checkbox--checked');
                    }
                };
                UxCheckbox.prototype.disabledChanged = function (newValue) {
                    if (newValue === true) {
                        this.element.classList.add('ux-checkbox--disabled');
                    }
                    else {
                        this.element.classList.remove('ux-checkbox--disabled');
                    }
                };
                UxCheckbox.prototype.focusedChanged = function (newValue) {
                    if (newValue === true) {
                        this.element.classList.add('ux-checkbox--focused');
                    }
                    else {
                        this.element.classList.remove('ux-checkbox--focused');
                    }
                };
                UxCheckbox.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'checkbox';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxCheckbox.prototype.valueChanged = function (newValue) {
                    if (this.ignoreValueChanges) {
                        return;
                    }
                    this.setChecked(newValue);
                };
                UxCheckbox.prototype.onMouseDown = function (e) {
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
                        var winEvents_1 = new aurelia_templating_1.ElementEvents(window);
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
                ], UxCheckbox.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCheckbox.prototype, "effect", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCheckbox.prototype, "id", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxCheckbox.prototype, "theme", void 0);
                __decorate([
                    aurelia_binding_1.observable()
                ], UxCheckbox.prototype, "checked", void 0);
                __decorate([
                    aurelia_binding_1.observable()
                ], UxCheckbox.prototype, "value", void 0);
                __decorate([
                    aurelia_binding_1.observable()
                ], UxCheckbox.prototype, "focused", void 0);
                __decorate([
                    aurelia_binding_1.computedFrom('disabled')
                ], UxCheckbox.prototype, "isDisabled", null);
                UxCheckbox = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-checkbox')
                ], UxCheckbox);
                return UxCheckbox;
            }());
            exports_1("UxCheckbox", UxCheckbox);
            getVm = function (_) { return _.au.controller.viewModel; };
            uxCheckboxElementProto = Object.create(HTMLElement.prototype, {
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
                },
                indeterminate: {
                    get: function () {
                        return getVm(this).getIndeterminate();
                    },
                    set: function (value) {
                        getVm(this).setIndeterminate(value);
                    }
                }
            });
        }
    };
});
