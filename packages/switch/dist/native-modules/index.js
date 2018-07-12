import { __decorate } from 'tslib';
import { customElement, bindable, inlineView } from 'aurelia-templating';
import { computedFrom, observable, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, AureliaUX } from '@aurelia-ux/core';
import { DOM, ElementEvents, bindingMode } from 'aurelia-framework';

var UX_SWITCH_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <input type=checkbox ref=checkbox checked.bind=value indeterminate.bind=indeterminate mousedown.trigger=onMouseDown($event) disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"value & booleanAttr\" aria-disabledb.bind=\"disabled & booleanAttr\"> <div class=track> <div class=indicator> <div class=ripplecontainer> <span class=ripple></span> </div> </div> </div> </template> ";

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
            return normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    UxSwitch.prototype.bind = function () {
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
        this.disabledChanged(this.disabled);
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
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
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
        if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
            this.checkbox.setAttribute('disabled', '');
        }
        else if (this.element.classList.contains('disabled')) {
            this.checkbox.removeAttribute('disabled');
        }
    };
    UxSwitch.prototype.onMouseDown = function (e) {
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
    ], UxSwitch.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "theme", void 0);
    __decorate([
        observable({ initializer: function () { return false; } })
    ], UxSwitch.prototype, "value", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxSwitch.prototype, "isDisabled", null);
    UxSwitch = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-switch'),
        inlineView(UX_SWITCH_VIEW)
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

var css = "ux-switch{display:inline-block;position:relative;cursor:pointer}ux-switch>input{position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;width:100%;height:100%;cursor:pointer;z-index:1}ux-switch>input:disabled{cursor:default}ux-switch .track{margin:6px 5px;height:12px;width:32px;border:0;border-radius:6px;background-color:#e0e0e0;background-color:var(--ux-theme--switch-track, #E0E0E0);transition:background-color 150ms ease-in-out;position:relative}ux-switch input:disabled~.track,ux-switch input:disabled:checked~.track{background-color:#9e9e9e;background-color:var(--ux-theme--switch-track-disabled, #9E9E9E)}ux-switch input:disabled~.track .indicator,ux-switch input:disabled:checked~.track .indicator{background-color:#e0e0e0;background-color:var(--ux-theme--switch-indicator-disabled, #E0E0E0)}ux-switch input:checked~.track{background-color:#ff80ab;background-color:var(--ux-theme--switch-track-active, var(--ux-design--accent-light, #FF80AB))}ux-switch:focus{outline:0}ux-switch .track .indicator{position:relative;left:-3px;top:-3px;height:18px;width:18px;background-color:#fff;background-color:var(--ux-theme--switch-indicator, #FFF);border-radius:50%;box-shadow:0 1px 4px 0 rgba(0,0,0,.6);transition:left .1s ease-in-out,background-color .1s ease-in-out}ux-switch input:checked~.track .indicator{left:calc(100% - 14px);background-color:#ff80ab;background-color:var(--ux-theme--switch-indicator-active, var(--ux-design--accent, #F48FB1));box-shadow:0 2px 5px 0 rgba(0,0,0,.4)}ux-switch .ripplecontainer{position:relative;width:0;height:0}ux-switch .ripplecontainer>.paper-ripple{top:auto;left:auto;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%}ux-switch .ripplecontainer>.ripple{position:absolute;bottom:-37px;width:50px;height:50px;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.22);transition:transform 100ms ease-in-out;transform:scale3d(0,0,0);left:-6px}ux-switch input:focus~.ripplecontainer>.ripple{transform:scale3d(1,1,1)}ux-switch input:disabled:focus~.ripplecontainer>.ripple{transform:scale3d(0,0,0)}"

var UxSwitchTheme = /** @class */ (function () {
    function UxSwitchTheme() {
        this.themeKey = 'switch';
    }
    return UxSwitchTheme;
}());

function configure(config) {
    DOM.injectStyles(css, undefined, undefined, 'ux-switch-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxSwitchConfig);
    config.globalResources(UxSwitch);
}
var uxSwitchConfig = {
    tagName: 'ux-switch',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { configure, UxSwitchTheme, UxSwitch };
