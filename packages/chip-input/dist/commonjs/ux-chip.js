"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxChip = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
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
        var closeEvent = aurelia_pal_1.DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    };
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxChip.prototype, "theme", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxChip.prototype, "variant", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxChip.prototype, "selectedIcon", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.observable
    ], UxChip.prototype, "focused", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxChip.prototype, "selected", void 0);
    UxChip = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_framework_1.customElement('ux-chip'),
        aurelia_framework_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-chip.html'))
    ], UxChip);
    return UxChip;
}());
exports.UxChip = UxChip;
//# sourceMappingURL=ux-chip.js.map