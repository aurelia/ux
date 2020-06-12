import { __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';
let UxGrid = /** @class */ (() => {
    let UxGrid = class UxGrid {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        bind() {
            this.themeChanged(this.theme);
            if (this.columns != null) {
                this.columnsChanged(this.columns);
            }
            this.processAttributes();
        }
        processAttributes() {
            const alignAttributes = [
                'align-cells-top',
                'align-cells-middle',
                'align-cells-bottom',
                'fixed',
                'remove-padding'
            ];
            for (const attribute of alignAttributes) {
                if (this.element.hasAttribute(attribute)) {
                    this.element.removeAttribute(attribute);
                    this.element.classList.add(`ux-grid--${attribute}`);
                }
            }
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'grid';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        columnsChanged(newValue) {
            if (newValue != null) {
                this.element.style.setProperty('grid-template-columns', `repeat(${newValue}, 1fr)`);
            }
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
})();
export { UxGrid };
//# sourceMappingURL=ux-grid.js.map