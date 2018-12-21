var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ElementEvents } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, } from '@aurelia-ux/core';
import { DOM } from 'aurelia-pal';
var UxCheckbox = /** @class */ (function () {
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
            return normalizeBooleanAttribute('disabled', this.disabled);
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
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
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
        observable()
    ], UxCheckbox.prototype, "checked", void 0);
    __decorate([
        observable()
    ], UxCheckbox.prototype, "value", void 0);
    __decorate([
        observable()
    ], UxCheckbox.prototype, "focused", void 0);
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
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxCheckboxElementProto = Object.create(HTMLElement.prototype, {
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
