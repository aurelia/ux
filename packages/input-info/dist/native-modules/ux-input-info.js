import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { computedFrom } from 'aurelia-binding';
import { PLATFORM } from 'aurelia-pal';
var UxInputInfo = /** @class */ (function () {
    function UxInputInfo(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.uxInputCounter = null;
    }
    UxInputInfo.prototype.bind = function () {
        if (this.target === undefined) {
            this.findAndSetTarget(this.element);
        }
        this.themeChanged(this.theme);
    };
    UxInputInfo.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input-info';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxInputInfo.prototype.findAndSetTarget = function (element) {
        var inputElement = element.previousElementSibling;
        if (!inputElement) {
            return;
        }
        if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
            this.target = inputElement.au.controller.viewModel;
        }
    };
    Object.defineProperty(UxInputInfo.prototype, "maxLength", {
        get: function () {
            var target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.maxlength;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UxInputInfo.prototype, "length", {
        get: function () {
            var target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.value.length;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        bindable
    ], UxInputInfo.prototype, "target", void 0);
    __decorate([
        bindable
    ], UxInputInfo.prototype, "uxInputCounter", void 0);
    __decorate([
        bindable
    ], UxInputInfo.prototype, "theme", void 0);
    __decorate([
        computedFrom('target.maxlength')
    ], UxInputInfo.prototype, "maxLength", null);
    __decorate([
        computedFrom('target.value')
    ], UxInputInfo.prototype, "length", null);
    UxInputInfo = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-input-info'),
        useView(PLATFORM.moduleName('./ux-input-info.html'))
    ], UxInputInfo);
    return UxInputInfo;
}());
export { UxInputInfo };
//# sourceMappingURL=ux-input-info.js.map