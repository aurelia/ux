var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { ElementEvents, DOM } from 'aurelia-framework';
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
            return normalizeBooleanAttribute('disabled', this.disabled);
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
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
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
                this.ripple = new PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
            var winEvents_1 = new ElementEvents(window);
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
        bindable
    ], UxRadio.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "theme", void 0);
    __decorate([
        observable({ initializer: function () { return false; } })
    ], UxRadio.prototype, "value", void 0);
    __decorate([
        observable()
    ], UxRadio.prototype, "focused", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxRadio.prototype, "isDisabled", null);
    UxRadio = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-radio')
    ], UxRadio);
    return UxRadio;
}());
export { UxRadio };
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
