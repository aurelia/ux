"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var style_engine_1 = require("../styles/style-engine");
var design_attributes_1 = require("../designs/design-attributes");
var UxTextarea = (function () {
    function UxTextarea(element, styleEngine, resources) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.resources = resources;
        this.autofocus = null;
        this.autoResize = null;
        this.disabled = false;
        this.readonly = false;
        this.theme = null;
        this.value = undefined;
    }
    UxTextarea.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxTextarea.prototype.bind = function () {
        var _this = this;
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.autofocus || this.autofocus === '') {
            setTimeout(function () {
                _this.textbox.focus();
            }, 0);
        }
        if (this.element.hasAttribute('placeholder')) {
            var attributeValue = this.element.getAttribute('placeholder');
            if (attributeValue) {
                this.textbox.setAttribute('placeholder', attributeValue);
                this.element.removeAttribute('placeholder');
            }
        }
        if (this.element.hasAttribute('required')) {
            this.textbox.setAttribute('required', '');
            this.element.removeAttribute('required');
        }
        if (this.cols) {
            this.textbox.setAttribute('cols', this.cols.toString());
            this.element.removeAttribute('cols');
        }
        if (this.rows) {
            this.textbox.setAttribute('rows', this.rows.toString());
            this.element.removeAttribute('rows');
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
    UxTextarea.prototype.attached = function () {
        var _this = this;
        var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.addEventListener('focus', function () {
            _this.element.classList.add('focused');
        });
        this.textbox.addEventListener('blur', function () {
            _this.element.classList.remove('focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxTextarea.prototype.detached = function () {
        var _this = this;
        var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.removeEventListener('focus', function () {
            _this.element.classList.add('focused');
        });
        this.textbox.removeEventListener('blur', function () {
            _this.element.classList.remove('focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxTextarea.prototype.disabledChanged = function (newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('disabled', 'true');
        }
        else {
            this.textbox.removeAttribute('disabled');
        }
    };
    UxTextarea.prototype.readonlyChanged = function (newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('readonly', 'true');
        }
        else {
            this.textbox.removeAttribute('readonly');
        }
    };
    UxTextarea.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxTextarea.prototype.valueChanged = function () {
        if (this.autoResize !== null) {
            this.textbox.style.height = 'auto';
            this.textbox.style.height = this.textbox.scrollHeight + 2 + "px";
        }
    };
    return UxTextarea;
}());
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "autofocus", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "autoResize", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "cols", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "disabled", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "maxlength", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "minlength", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "readonly", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "rows", void 0);
__decorate([
    aurelia_templating_1.bindable
], UxTextarea.prototype, "theme", void 0);
__decorate([
    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
], UxTextarea.prototype, "value", void 0);
UxTextarea = __decorate([
    aurelia_dependency_injection_1.inject(Element, style_engine_1.StyleEngine, aurelia_templating_1.ViewResources),
    aurelia_templating_1.customElement('ux-textarea'),
    aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
], UxTextarea);
exports.UxTextarea = UxTextarea;
