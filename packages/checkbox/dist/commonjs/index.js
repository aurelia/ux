'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = require('tslib');
var aureliaTemplating = require('aurelia-templating');
var aureliaBinding = require('aurelia-binding');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaPal = require('aurelia-pal');
var aureliaFramework = require('aurelia-framework');

var UX_CHECKBOX_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <input type=checkbox ref=checkbox checked.bind=value indeterminate.bind=indeterminate mousedown.trigger=onMouseDown($event) disabled.bind=\"disabled & booleanAttr\" aria-checked=\"indeterminate ? 'mixed' : value ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=ripplecontainer> <span class=ripple></span> </div> <div class=checkbox> <div class=background-box> <svg viewBox=\"0 0 24 24\"> <path d=\"M0 0h24v24H0z\" fill=none /> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/> </svg> </div> </div> </template> ";

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
            return core.normalizeBooleanAttribute('disabled', this.disabled);
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
            this.element.dispatchEvent(aureliaPal.DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxCheckbox.prototype.getIndeterminate = function () {
        return this.indeterminate;
    };
    UxCheckbox.prototype.setIndeterminate = function (value) {
        this.indeterminate = !!value;
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
                this.ripple = new core.PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
            var winEvents_1 = new aureliaTemplating.ElementEvents(window);
            var upAction = function () {
                _this.ripple.upAction();
                winEvents_1.disposeAll();
            };
            winEvents_1.subscribe('blur', upAction);
            winEvents_1.subscribe('mouseup', upAction, true);
        }
        e.preventDefault();
    };
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxCheckbox.prototype, "disabled", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxCheckbox.prototype, "effect", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxCheckbox.prototype, "id", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxCheckbox.prototype, "theme", void 0);
    tslib_1.__decorate([
        aureliaBinding.observable()
    ], UxCheckbox.prototype, "value", void 0);
    tslib_1.__decorate([
        aureliaBinding.computedFrom('disabled')
    ], UxCheckbox.prototype, "isDisabled", null);
    UxCheckbox = tslib_1.__decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-checkbox'),
        aureliaTemplating.inlineView(UX_CHECKBOX_VIEW)
    ], UxCheckbox);
    return UxCheckbox;
}());
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

var css = "ux-checkbox{display:inline-block;outline:0;height:24px;width:24px;box-sizing:border-box;position:relative}ux-checkbox>input{position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;width:100%;height:100%;cursor:pointer;z-index:1}ux-checkbox>input:disabled{cursor:default}ux-checkbox>.checkbox{border:solid 2px #616161;border:var(--ux-theme--checkbox-border, solid 2px #616161);border-radius:3px;display:block;position:relative;box-sizing:border-box;width:100%;height:100%}ux-checkbox input:hover:not(:disabled)~.checkbox{border:solid 2px #ff4081;border:var(--ux-theme--checkbox-hover-border, solid 2px var(--ux-design--accent, #FF4081));border-radius:3px}ux-checkbox input:checked~.checkbox{border:solid 2px #ff4081;border:var(--ux-theme--checkbox-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-checkbox>.checkbox>.background-box{transform:scale3d(0,0,0);transition:100ms;background-color:#ff4081;background-color:var(--ux-theme--checkbox-checked-background, var(--ux-design--accent, #FF4081));height:inherit;width:inherit}ux-checkbox input:checked~.checkbox>.background-box{transform:none}ux-checkbox>.checkbox>.background-box>svg{fill:#fff;fill:var(--ux-theme--checkbox-checkmark-color, #fff);width:20px;height:20px}ux-checkbox.disabled{pointer-events:none;cursor:default}ux-checkbox.disabled>.checkbox:hover{border:solid 2px #607d8b;border:var(--ux-theme--checkbox-disabled-border, solid 2px #607D8B);border-radius:3px}ux-checkbox input:disabled~.checkbox{border:solid 2px #607d8b;border:var(--ux-theme--checkbox-disabled-border, solid 2px #607D8B)}ux-checkbox input:checked:disabled~.checkbox>.background-box{background-color:#9e9e9e;background-color:var(--ux-theme--checkbox-disabled-background, #9E9E9E)}ux-checkbox input:disabled~.checkbox>.background-box::after{border-color:#e0e0e0;border-color:var(--ux-theme--checkbox-disabled-foreground, #E0E0E0)}ux-checkbox .ripplecontainer{position:relative;width:0;height:0}ux-checkbox .ripplecontainer>.paper-ripple{top:auto;left:auto;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%}ux-checkbox .ripplecontainer>.ripple{position:absolute;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.22);transition:transform 100ms ease-in-out;transform:scale3d(0,0,0)}ux-checkbox input:focus~.ripplecontainer>.ripple{transform:scale3d(1,1,1)}ux-checkbox input:disabled:focus~.ripplecontainer>.ripple{transform:scale3d(0,0,0)}"

var UxCheckboxTheme = /** @class */ (function () {
    function UxCheckboxTheme() {
        this.themeKey = 'checkbox';
    }
    return UxCheckboxTheme;
}());

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-checkbox-css');
    config.container.get(core.AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources(UxCheckbox);
}
var uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
    properties: {
        checked: {
            defaultBindingMode: aureliaFramework.bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new aureliaBinding.CheckedObserver(element, new aureliaBinding.EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

exports.configure = configure;
exports.UxCheckbox = UxCheckbox;
exports.UxCheckboxTheme = UxCheckboxTheme;
