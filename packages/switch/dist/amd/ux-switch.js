var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-framework"], function (require, exports, aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxSwitch = /** @class */ (function () {
        function UxSwitch(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.disabled = false;
            this.effect = 'ripple';
            this.ripple = null;
            Object.setPrototypeOf(element, uxSwitchElementProto);
        }
        Object.defineProperty(UxSwitch.prototype, "isDisabled", {
            get: function () {
                return core_1.normalizeBooleanAttribute('disabled', this.disabled);
            },
            enumerable: true,
            configurable: true
        });
        UxSwitch.prototype.bind = function () {
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
                if (attributeValue || attributeValue === '') {
                    this.element.checked = true;
                }
            }
            this.valueChanged(this.value);
            this.disabledChanged(this.checkbox.disabled);
            this.themeChanged(this.theme);
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
        UxSwitch.prototype.checkedChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            if (newValue === true) {
                this.element.classList.add('ux-switch--checked');
            }
            else {
                this.element.classList.remove('ux-switch--checked');
            }
        };
        UxSwitch.prototype.focusedChanged = function (newValue) {
            if (newValue === true) {
                this.element.classList.add('ux-switch--focused');
            }
            else {
                this.element.classList.remove('ux-switch--focused');
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
            if (newValue === true) {
                this.element.classList.add('ux-switch--disabled');
            }
            else {
                this.element.classList.remove('ux-switch--disabled');
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
            aurelia_binding_1.observable()
        ], UxSwitch.prototype, "checked", void 0);
        __decorate([
            aurelia_binding_1.observable({ initializer: function () { return false; } })
        ], UxSwitch.prototype, "value", void 0);
        __decorate([
            aurelia_binding_1.observable()
        ], UxSwitch.prototype, "focused", void 0);
        __decorate([
            aurelia_binding_1.computedFrom('disabled')
        ], UxSwitch.prototype, "isDisabled", null);
        UxSwitch = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-switch')
        ], UxSwitch);
        return UxSwitch;
    }());
    exports.UxSwitch = UxSwitch;
    function stopEvent(e) {
        e.stopPropagation();
    }
    var getVm = function (_) { return _.au.controller.viewModel; };
    var uxSwitchElementProto = Object.create(HTMLElement.prototype, {
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
});
