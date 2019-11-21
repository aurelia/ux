define('@aurelia-ux/switch', ['exports', 'aurelia-framework', 'aurelia-binding', '@aurelia-ux/core', 'aurelia-templating', 'aurelia-dependency-injection'], function (exports, aureliaFramework, aureliaBinding, core, aureliaTemplating, aureliaDependencyInjection) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var uxSwitch = "<template class=\"ux-switch ${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/switch/ux-switch.css\"></require> <input type=\"checkbox\" ref=\"checkbox\" class=\"ux-switch__inner-input\" checked.bind=\"value\" focus.bind=\"focused\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"value & booleanAttr\" aria-disabledb.bind=\"disabled & booleanAttr\"> <div class=\"ux-switch__track\"> <div class=\"ux-switch__indicator\"> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> </div> </div> </template> ";

    var VIEW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxSwitch
    });

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
                return core.normalizeBooleanAttribute('disabled', this.disabled);
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
                this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('change', { bubbles: true }));
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
                    this.ripple = new core.PaperRipple();
                    var container = this.element.querySelector('.ripplecontainer');
                    if (container != null) {
                        container.appendChild(this.ripple.$);
                    }
                }
                this.ripple.center = true;
                this.ripple.round = true;
                this.ripple.downAction(e);
                var winEvents_1 = new aureliaFramework.ElementEvents(window);
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
            aureliaTemplating.bindable
        ], UxSwitch.prototype, "disabled", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxSwitch.prototype, "effect", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxSwitch.prototype, "id", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxSwitch.prototype, "theme", void 0);
        __decorate([
            aureliaBinding.observable()
        ], UxSwitch.prototype, "checked", void 0);
        __decorate([
            aureliaBinding.observable({ initializer: function () { return false; } })
        ], UxSwitch.prototype, "value", void 0);
        __decorate([
            aureliaBinding.observable()
        ], UxSwitch.prototype, "focused", void 0);
        __decorate([
            aureliaBinding.computedFrom('disabled')
        ], UxSwitch.prototype, "isDisabled", null);
        UxSwitch = __decorate([
            aureliaDependencyInjection.inject(Element, core.StyleEngine),
            aureliaTemplating.customElement('ux-switch'),
            aureliaTemplating.inlineView(VIEW)
        ], UxSwitch);
        return UxSwitch;
    }());
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

    var UxSwitchTheme = /** @class */ (function () {
        function UxSwitchTheme() {
            this.themeKey = 'switch';
        }
        return UxSwitchTheme;
    }());

    /// <reference path="html.d.ts" />
    function configure(config) {
        config.container.get(core.AureliaUX).registerUxElementConfig(uxSwitchConfig);
        config.globalResources(UxSwitch);
    }
    var uxSwitchConfig = {
        tagName: 'ux-switch',
        properties: {
            checked: {
                defaultBindingMode: aureliaFramework.bindingMode.twoWay,
                getObserver: function (element, _, observerLocator) {
                    return new aureliaBinding.CheckedObserver(element, new aureliaBinding.EventSubscriber(['change']), observerLocator);
                }
            }
        }
    };

    exports.UxSwitch = UxSwitch;
    exports.UxSwitchTheme = UxSwitchTheme;
    exports.configure = configure;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map
