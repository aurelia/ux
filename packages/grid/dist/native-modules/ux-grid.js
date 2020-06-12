import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';
var UxGrid = /** @class */ (function () {
    function UxGrid(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxGrid.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.columns != null) {
            this.columnsChanged(this.columns);
        }
        this.processAttributes();
    };
    UxGrid.prototype.processAttributes = function () {
        var alignAttributes = [
            'align-cells-top',
            'align-cells-middle',
            'align-cells-bottom',
            'fixed',
            'remove-padding'
        ];
        for (var _i = 0, alignAttributes_1 = alignAttributes; _i < alignAttributes_1.length; _i++) {
            var attribute = alignAttributes_1[_i];
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add("ux-grid--" + attribute);
            }
        }
    };
    UxGrid.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'grid';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxGrid.prototype.columnsChanged = function (newValue) {
        if (newValue != null) {
            this.element.style.setProperty('grid-template-columns', "repeat(" + newValue + ", 1fr)");
        }
    };
    __decorate([
        bindable
    ], UxGrid.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxGrid.prototype, "columns", void 0);
    UxGrid = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-grid'),
        useView(PLATFORM.moduleName('./ux-grid.html'))
    ], UxGrid);
    return UxGrid;
}());
export { UxGrid };
//# sourceMappingURL=ux-grid.js.map