import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';
var UxList = /** @class */ (function () {
    function UxList(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxList.prototype.bind = function () {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
        this.typeChanged(this.type);
    };
    UxList.prototype.typeChanged = function (newValue, oldValue) {
        if (typeof oldValue === 'string') {
            this.element.classList.remove("ux-list--" + oldValue);
        }
        if (typeof newValue === 'string') {
            this.element.classList.add("ux-list--" + newValue);
        }
    };
    UxList.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
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
}());
export { UxList };
//# sourceMappingURL=ux-list.js.map