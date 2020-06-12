import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';
let UxList = /** @class */ (() => {
    let UxList = class UxList {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        bind() {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.typeChanged(this.type);
        }
        typeChanged(newValue, oldValue) {
            if (typeof oldValue === 'string') {
                this.element.classList.remove(`ux-list--${oldValue}`);
            }
            if (typeof newValue === 'string') {
                this.element.classList.add(`ux-list--${newValue}`);
            }
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'list';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
    };
    __decorate([
        bindable
    ], UxList.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxList.prototype, "type", void 0);
    UxList = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-list'),
        useView(PLATFORM.moduleName('./ux-list.html'))
    ], UxList);
    return UxList;
})();
export { UxList };
//# sourceMappingURL=ux-list.js.map