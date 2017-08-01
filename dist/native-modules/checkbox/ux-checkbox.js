var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { PaperRipple } from '../effects/paper-ripple';
import { processDesignAttributes } from '../designs/design-attributes';
var UxCheckbox = (function () {
    function UxCheckbox(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.disabled = null;
        this.effect = null;
        this.matcher = function (a, b) { return a === b; };
        this.tabindex = 0;
        this.theme = null;
        this.checked = false;
        this.value = null;
        this.uncheckedValue = null;
        this.ripple = null;
    }
    Object.defineProperty(UxCheckbox.prototype, "isDisabled", {
        get: function () {
            var ret = this.disabled;
            if (typeof this.disabled === 'string' &&
                (this.disabled === '' || this.disabled.toString().toLocaleLowerCase() === 'disabled')) {
                ret = true;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    UxCheckbox.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxCheckbox.prototype.bind = function () {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.checked) {
            this.checkedChanged();
        }
        // ensure we cast empty string as true
        if (typeof this.disabled === 'string' && this.disabled === '') {
            this.disabled = true;
        }
        if (this.disabled && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    };
    UxCheckbox.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxCheckbox.prototype.disabledChanged = function (newValue) {
        // ensure we cast empty string as true
        if (typeof newValue === 'string' && newValue === '') {
            newValue = true;
        }
        if (newValue && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    };
    UxCheckbox.prototype.checkedChanged = function () {
        var _this = this;
        var elementValue = this.model ? this.model : this.value;
        var isChecked = this.checked;
        if (Array.isArray(this.checked)) {
            isChecked = this.checked.some(function (item) { return _this.matcher(item, elementValue); });
        }
        if (isChecked && isChecked !== this.uncheckedValue) {
            this.element.classList.add('checked');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('checked');
            this.element.setAttribute('aria-checked', 'false');
        }
    };
    UxCheckbox.prototype.toggleCheckbox = function () {
        var _this = this;
        if (this.isDisabled) {
            return;
        }
        var elementValue = this.model ? this.model : this.value;
        if (Array.isArray(this.checked)) {
            var index = this.checked.findIndex(function (item) { return _this.matcher(item, elementValue); });
            if (index === -1) {
                this.checked.push(elementValue);
            }
            else if (index !== -1) {
                this.checked.splice(index, 1);
            }
            this.checkedChanged();
        }
        else if (elementValue != null && typeof elementValue !== 'boolean') {
            if (this.checked && this.checked !== this.uncheckedValue) {
                if (this.uncheckedValue != null) {
                    this.checked = this.uncheckedValue;
                }
                else {
                    this.checked = null;
                }
            }
            else {
                this.checked = elementValue;
            }
        }
        else {
            this.checked = !this.checked;
        }
    };
    UxCheckbox.prototype.onKeyup = function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            this.toggleCheckbox();
        }
    };
    UxCheckbox.prototype.onMouseDown = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple')) {
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
        }
        this.toggleCheckbox();
        e.preventDefault();
    };
    UxCheckbox.prototype.onMouseUp = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
    };
    return UxCheckbox;
}());
__decorate([
    bindable
], UxCheckbox.prototype, "disabled", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "effect", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "label", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "matcher", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "model", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "tabindex", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "checked", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "uncheckedValue", void 0);
__decorate([
    computedFrom('disabled')
], UxCheckbox.prototype, "isDisabled", null);
UxCheckbox = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-checkbox'),
    processAttributes(processDesignAttributes)
], UxCheckbox);
export { UxCheckbox };
