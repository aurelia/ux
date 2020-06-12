import { __decorate } from "tslib";
import { customElement, bindable, processContent, DOM, inject, BindingEngine, useView, PLATFORM, } from 'aurelia-framework';
import { getAuViewModel } from './util';
var UxOptGroup = /** @class */ (function () {
    function UxOptGroup(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        Object.setPrototypeOf(element, UxOptGroupElementProto);
    }
    UxOptGroup.prototype.created = function () {
        var element = this.element;
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
    };
    UxOptGroup.prototype.bind = function () {
        var uxSelect = this.uxSelect = this.getUxSelect();
        this.setParentDisabled(uxSelect.isDisabled);
    };
    UxOptGroup.prototype.attached = function () {
        var be = this.bindingEngine;
        var uxSelect = this.uxSelect;
        this.subscriptions = [
            be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        ];
    };
    UxOptGroup.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var s = _a[_i];
            s.dispose();
        }
        this.subscriptions.length = 0;
    };
    UxOptGroup.prototype.getUxSelect = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option group has no "ux-select" parent');
    };
    UxOptGroup.prototype.setParentDisabled = function (disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOptGroup.prototype.getOptions = function () {
        if (!this.optionsCt) {
            return [];
        }
        return Array.from(this.optionsCt.children);
    };
    UxOptGroup.prototype.getDisabled = function () {
        return this.disabled;
    };
    UxOptGroup.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
        this.isDisabled = disabled || this.parentDisabled;
    };
    __decorate([
        bindable()
    ], UxOptGroup.prototype, "label", void 0);
    UxOptGroup = __decorate([
        inject(DOM.Element, BindingEngine),
        processContent(ensureOnlyUxOption),
        customElement('ux-optgroup'),
        useView(PLATFORM.moduleName('./ux-optgroup.html'))
    ], UxOptGroup);
    return UxOptGroup;
}());
export { UxOptGroup };
/**
 * A View-compiler hook that will remove any element that is not `<ux-option>` as child of `<ux-optgroup/>`
 */
function ensureOnlyUxOption(_, __, node) {
    var currentChild = node.firstChild;
    while (currentChild) {
        var nextSibling = currentChild.nextSibling;
        if (currentChild.nodeName !== 'UX-OPTION') {
            node.removeChild(currentChild);
        }
        currentChild = nextSibling;
    }
    return true;
}
var UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
    options: {
        get: function () {
            return getAuViewModel(this).getOptions();
        }
    },
    disabled: {
        get: function () {
            return getAuViewModel(this).getDisabled();
        },
        set: function (disabled) {
            return getAuViewModel(this).setDisabled(disabled);
        }
    }
});
//# sourceMappingURL=ux-optgroup.js.map