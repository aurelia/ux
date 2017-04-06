var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { processDesignAttributes } from '../designs/design-attributes';
var UxInput = (function () {
    function UxInput(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.disabled = false;
        this.readonly = false;
        this.theme = null;
        this.value = undefined;
    }
    UxInput.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxInput.prototype.bind = function () {
        var _this = this;
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.autofocus || this.autofocus === '') {
            setTimeout(function () {
                _this.textbox.focus();
            }, 0);
        }
        if (this.element.hasAttribute('required')) {
            this.textbox.setAttribute('required', '');
            this.element.removeAttribute('required');
        }
        if (this.element.hasAttribute('placeholder')) {
            var attributeValue = this.element.getAttribute('placeholder');
            if (attributeValue) {
                this.textbox.setAttribute('placeholder', attributeValue);
                this.element.removeAttribute('placeholder');
            }
        }
        if (this.element.hasAttribute('step')) {
            var attributeValue = this.element.getAttribute('step');
            if (attributeValue) {
                this.textbox.setAttribute('step', attributeValue);
                this.element.removeAttribute('step');
            }
        }
        if ([
            'text',
            'password',
            'number',
            'email',
            'url',
            'tel',
            'search'
        ].includes(this.type)) {
            this.textbox.setAttribute('type', this.type);
        }
        if (this.min) {
            this.textbox.setAttribute('min', this.min.toString());
        }
        if (this.max) {
            this.textbox.setAttribute('max', this.max.toString());
        }
        if (this.minlength) {
            this.textbox.setAttribute('minlength', this.minlength.toString());
        }
        if (this.maxlength) {
            this.textbox.setAttribute('maxlength', this.maxlength.toString());
        }
        if (this.disabled || this.disabled === '') {
            this.textbox.setAttribute('disabled', '');
        }
        if (this.readonly || this.readonly === '') {
            this.textbox.setAttribute('readonly', '');
        }
    };
    UxInput.prototype.attached = function () {
        var _this = this;
        var blurEvent = DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.addEventListener('focus', function () {
            _this.element.classList.add('focused');
        });
        this.textbox.addEventListener('blur', function () {
            _this.element.classList.remove('focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxInput.prototype.detached = function () {
        var _this = this;
        var blurEvent = DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.removeEventListener('focus', function () {
            _this.element.classList.add('focused');
        });
        this.textbox.removeEventListener('blur', function () {
            _this.element.classList.remove('focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxInput.prototype.disabledChanged = function (newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('disabled', 'true');
        }
        else {
            this.textbox.removeAttribute('disabled');
        }
    };
    UxInput.prototype.readonlyChanged = function (newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('readonly', 'true');
        }
        else {
            this.textbox.removeAttribute('readonly');
        }
    };
    UxInput.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxInput.prototype.typeChanged = function (newValue) {
        if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
            this.type = 'text';
        }
    };
    UxInput.prototype.valueChanged = function (newValue) {
        if (this.type === 'number' && !isNaN(newValue) && newValue !== '') {
            if (this.min && newValue < this.min) {
                this.value = this.min;
            }
            if (this.max && newValue > this.max) {
                this.value = this.max;
            }
            if (isNaN(newValue)) {
                this.value = '';
            }
        }
    };
    return UxInput;
}());
__decorate([
    bindable
], UxInput.prototype, "autofocus", void 0);
__decorate([
    bindable
], UxInput.prototype, "disabled", void 0);
__decorate([
    bindable
], UxInput.prototype, "maxlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "minlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "min", void 0);
__decorate([
    bindable
], UxInput.prototype, "max", void 0);
__decorate([
    bindable
], UxInput.prototype, "readonly", void 0);
__decorate([
    bindable
], UxInput.prototype, "theme", void 0);
__decorate([
    bindable
], UxInput.prototype, "type", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxInput.prototype, "value", void 0);
UxInput = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-input'),
    processAttributes(processDesignAttributes)
], UxInput);
export { UxInput };
