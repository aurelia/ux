"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxOption = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var core_1 = require("@aurelia-ux/core");
var util_1 = require("./util");
var UxOption = /** @class */ (function () {
    function UxOption(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.selected = false;
        this.focused = false;
        Object.setPrototypeOf(element, UxOptionElementProto);
    }
    UxOption.prototype.created = function () {
        var element = this.element;
        if (element.hasAttribute('value')) {
            this.value = element.getAttribute('value');
        }
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
        element.removeAttribute('text');
    };
    UxOption.prototype.bind = function () {
        if (this.value === undefined) {
            this.value = this.text;
        }
    };
    UxOption.prototype.attached = function () {
        var optGroup = this.optGroup = this.getOptGroup();
        var uxSelect = this.uxSelect = this.getUxSelect();
        var bindingEngine = this.bindingEngine;
        this.setParentDisabled(optGroup ? optGroup.isDisabled : uxSelect.isDisabled);
        this.isMultiple = uxSelect.isMultiple;
        this.subscriptions = [
            bindingEngine.propertyObserver(uxSelect, 'isMultiple').subscribe(this.uxMultipleChanged.bind(this)),
            optGroup
                // ux-opt group will also subscribe to ux-select to know if it's disabled
                ? bindingEngine.propertyObserver(optGroup, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
                // If ux-option is not a member of a group, then subscribe to disabled state of ux-select
                : bindingEngine.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        ];
    };
    UxOption.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var s = _a[_i];
            s.dispose();
        }
        this.subscriptions.length = 0;
    };
    UxOption.prototype.getOptGroup = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-OPTGROUP') {
                return util_1.getAuViewModel(el);
            }
            el = el.parentElement;
        }
        return null;
    };
    UxOption.prototype.getUxSelect = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return util_1.getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option has no "ux-select" parent');
    };
    UxOption.prototype.uxMultipleChanged = function (useSelect) {
        this.isMultiple = useSelect;
    };
    UxOption.prototype.setParentDisabled = function (disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOption.prototype.notify = function () {
        this.element.dispatchEvent(aurelia_framework_1.DOM.createCustomEvent('select', { bubbles: true, detail: this.element }));
    };
    UxOption.prototype.getFocused = function () {
        return this.focused;
    };
    UxOption.prototype.setFocused = function (focused) {
        this.focused = !!focused;
    };
    UxOption.prototype.getSelected = function () {
        return this.selected;
    };
    UxOption.prototype.setSelected = function (selected) {
        var oldValue = this.selected;
        var newValue = !!selected;
        if (newValue !== oldValue) {
            this.selected = newValue;
            this.notify();
        }
    };
    UxOption.prototype.getDisabled = function () {
        return this.disabled || this.parentDisabled;
    };
    UxOption.prototype.setDisabled = function (disabled) {
        this.disabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOption.prototype.onClick = function () {
        if (!this.disabled) {
            if (this.isMultiple) {
                this.setSelected(!this.selected);
            }
            else {
                this.selected = true;
                this.notify();
            }
        }
    };
    UxOption.prototype.onMouseDown = function (e) {
        this.addWave(e);
        return true;
    };
    /**
     * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
     */
    UxOption.prototype.addWave = function (e, autoEnd) {
        var target = this.element;
        if (target.classList.contains('ripple')) {
            if (target.ripple === null || target.ripple === undefined) {
                target.ripple = new core_1.PaperRipple();
                target.appendChild(target.ripple.$);
            }
            target.ripple.downAction(e);
            if (autoEnd) {
                setTimeout(removeWave, 125, target);
            }
            else {
                new aurelia_framework_1.ElementEvents(aurelia_framework_1.PLATFORM.global).subscribeOnce('mouseup', function () {
                    target.ripple.upAction();
                }, true);
            }
        }
    };
    tslib_1.__decorate([
        aurelia_framework_1.bindable()
    ], UxOption.prototype, "text", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable()
    ], UxOption.prototype, "value", void 0);
    UxOption = tslib_1.__decorate([
        aurelia_framework_1.inject(aurelia_framework_1.DOM.Element, aurelia_framework_1.BindingEngine),
        aurelia_framework_1.customElement('ux-option'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-option.html')),
        aurelia_framework_1.processAttributes(convertTextToAttr)
    ], UxOption);
    return UxOption;
}());
exports.UxOption = UxOption;
function removeWave(el) {
    el.ripple.upAction();
}
function convertTextToAttr(_, __, node, attributes) {
    var ii = attributes.length;
    for (var i = 0; ii > i; ++i) {
        var attr = attributes[i];
        if (attr.nodeName === 'text') {
            return;
        }
        var parts = attr.nodeName.split('.');
        if (parts[0] === 'text') {
            return;
        }
    }
    node.setAttribute('text', node.textContent || '');
    node.textContent = '';
}
var UxOptionElementProto = Object.create(HTMLElement.prototype, {
    disabled: {
        get: function () {
            return util_1.getAuViewModel(this).getDisabled();
        },
        set: function (disabled) {
            util_1.getAuViewModel(this).setDisabled(disabled);
        }
    },
    focused: {
        get: function () {
            return util_1.getAuViewModel(this).getFocused();
        },
        set: function (focused) {
            util_1.getAuViewModel(this).setFocused(focused);
        }
    },
    selected: {
        get: function () {
            return util_1.getAuViewModel(this).getSelected();
        },
        set: function (selected) {
            util_1.getAuViewModel(this).setSelected(selected);
        }
    },
    value: {
        get: function () {
            return util_1.getAuViewModel(this).value;
        },
        set: function (value) {
            util_1.getAuViewModel(this).value = value;
        }
    },
    wave: {
        value: function () {
            util_1.getAuViewModel(this).addWave(null, true);
        }
    }
});
//# sourceMappingURL=ux-option.js.map