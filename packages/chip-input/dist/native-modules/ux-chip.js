import { __decorate } from "tslib";
import { customElement, bindable, observable, useView } from 'aurelia-framework';
import { DOM, PLATFORM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
var UxChip = /** @class */ (function () {
    function UxChip(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.variant = 'filled';
        this.selectedIcon = 'check';
        this.focused = false;
        this.selected = undefined;
    }
    UxChip.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.element.hasAttribute('deletable')) {
            this.element.removeAttribute('deletable');
            this.element.classList.add('ux-chip--deletable');
        }
    };
    UxChip.prototype.attached = function () {
        var _this = this;
        this.isFocused = function () {
            _this.focused = document.activeElement === _this.element;
        };
        window.addEventListener('focus', this.isFocused, true);
        window.addEventListener('blur', this.isFocused, true);
    };
    UxChip.prototype.detached = function () {
        window.removeEventListener('focus', this.isFocused, true);
        window.removeEventListener('blur', this.isFocused, true);
    };
    UxChip.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxChip.prototype.closeChip = function (event) {
        if (event) {
            event.stopPropagation();
        }
        var closeEvent = DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    };
    __decorate([
        bindable
    ], UxChip.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxChip.prototype, "variant", void 0);
    __decorate([
        bindable
    ], UxChip.prototype, "selectedIcon", void 0);
    __decorate([
        observable
    ], UxChip.prototype, "focused", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxChip.prototype, "selected", void 0);
    UxChip = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-chip'),
        useView(PLATFORM.moduleName('./ux-chip.html'))
    ], UxChip);
    return UxChip;
}());
export { UxChip };
//# sourceMappingURL=ux-chip.js.map