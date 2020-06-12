import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { computedFrom } from 'aurelia-binding';
import { PLATFORM } from 'aurelia-pal';
let UxInputInfo = /** @class */ (() => {
    let UxInputInfo = class UxInputInfo {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.uxInputCounter = null;
        }
        bind() {
            if (this.target === undefined) {
                this.findAndSetTarget(this.element);
            }
            this.themeChanged(this.theme);
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'input-info';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        findAndSetTarget(element) {
            const inputElement = element.previousElementSibling;
            if (!inputElement) {
                return;
            }
            if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
                this.target = inputElement.au.controller.viewModel;
            }
        }
        get maxLength() {
            const target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.maxlength;
            }
            return 0;
        }
        get length() {
            const target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.value.length;
            }
            return 0;
        }
    };
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
})();
export { UxInputInfo };
//# sourceMappingURL=ux-input-info.js.map