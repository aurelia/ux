define('@aurelia-ux/radio', ['exports', 'aurelia-framework', 'aurelia-binding', '@aurelia-ux/core', 'aurelia-templating', 'aurelia-dependency-injection'], function (exports, aureliaFramework, aureliaBinding, core, aureliaTemplating, aureliaDependencyInjection) { 'use strict';

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

    var uxRadio = "<template class=\"ux-radio ${effect !== null ? effect : ''}\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/radio/ux-radio.css\"></require> <div class=\"ripplecontainer\"> <span class=\"ripple\"></span> </div> <input type=\"radio\" ref=\"radio\" class=\"ux-radio__inner-input\" change.trigger=\"value = $event.target.checked\" mousedown.trigger=\"onMouseDown($event)\" disabled.bind=\"disabled & booleanAttr\" focus.bind=\"focused\" aria-checked.bind=\"indeterminate ? 'mixed' : checked ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=\"ux-radio__border\"> <div class=\"ux-radio__background-fill\"> </div> </div> </template> ";

    var VIEW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxRadio
    });

    var UxRadio = /** @class */ (function () {
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
                return core.normalizeBooleanAttribute('disabled', this.disabled);
            },
            enumerable: true,
            configurable: true
        });
        UxRadio.prototype.bind = function () {
            if (this.element.hasAttribute('id')) {
                var id = this.element.id;
                if (id != null) {
                    this.radio.setAttribute('id', id);
                    this.element.removeAttribute('id');
                }
            }
            if (this.element.hasAttribute('tabindex')) {
                var tabIndex = this.element.getAttribute('tabindex');
                if (tabIndex != null) {
                    this.radio.setAttribute('tabindex', tabIndex);
                    this.element.removeAttribute('tabindex');
                }
            }
            if (this.element.hasAttribute('name')) {
                var name_1 = this.element.getAttribute('name');
                if (name_1 != null) {
                    this.radio.setAttribute('name', name_1);
                    this.element.removeAttribute('name');
                }
            }
            if (this.element.hasAttribute('checked')) {
                this.element.checked = true;
            }
            if (this.checked) {
                this.radio.checked = true;
                this.element.classList.add('ux-radio--checked');
            }
            this.disabledChanged(this.radio.disabled);
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
                    if (this.radio.checked) {
                        this.element.classList.add('ux-radio--checked');
                    }
                    else {
                        this.element.classList.remove('ux-radio--checked');
                    }
                }
                this.ignoreValueChanges = false;
                this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('change', { bubbles: true }));
            }
        };
        UxRadio.prototype.disabledChanged = function (newValue) {
            if (newValue === true) {
                this.element.classList.add('ux-radio--disabled');
            }
            else {
                this.element.classList.remove('ux-radio--disabled');
            }
        };
        UxRadio.prototype.focusedChanged = function (newValue) {
            if (newValue === true) {
                this.element.classList.add('ux-radio--focused');
            }
            else {
                this.element.classList.remove('ux-radio--focused');
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
            return true;
        };
        __decorate([
            aureliaTemplating.bindable
        ], UxRadio.prototype, "disabled", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxRadio.prototype, "effect", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxRadio.prototype, "id", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxRadio.prototype, "theme", void 0);
        __decorate([
            aureliaBinding.observable({ initializer: function () { return false; } })
        ], UxRadio.prototype, "value", void 0);
        __decorate([
            aureliaBinding.observable()
        ], UxRadio.prototype, "focused", void 0);
        __decorate([
            aureliaBinding.computedFrom('disabled')
        ], UxRadio.prototype, "isDisabled", null);
        UxRadio = __decorate([
            aureliaDependencyInjection.inject(Element, core.StyleEngine),
            aureliaTemplating.customElement('ux-radio'),
            aureliaTemplating.inlineView(VIEW)
        ], UxRadio);
        return UxRadio;
    }());
    function stopEvent(e) {
        e.stopPropagation();
    }
    var getVm = function (_) { return _.au.controller.viewModel; };
    var uxRadioElementProto = Object.create(HTMLElement.prototype, {
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

    var UxRadioTheme = /** @class */ (function () {
        function UxRadioTheme() {
            this.themeKey = 'radio';
        }
        return UxRadioTheme;
    }());

    /// <reference path="html.d.ts" />
    function configure(config) {
        config.container.get(core.AureliaUX).registerUxElementConfig(uxRadioConfig);
        config.globalResources(UxRadio);
    }
    var uxRadioConfig = {
        tagName: 'ux-radio',
        properties: {
            checked: {
                defaultBindingMode: aureliaFramework.bindingMode.twoWay,
                getObserver: function (element, _, observerLocator) {
                    return new aureliaBinding.CheckedObserver(element, new aureliaBinding.EventSubscriber(['change']), observerLocator);
                }
            }
        }
    };

    exports.UxRadio = UxRadio;
    exports.UxRadioTheme = UxRadioTheme;
    exports.configure = configure;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map
