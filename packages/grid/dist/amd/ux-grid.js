define(["require", "exports", "tslib", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxGrid = void 0;
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
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxGrid.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxGrid.prototype, "columns", void 0);
        UxGrid = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-grid'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-grid.html'))
        ], UxGrid);
        return UxGrid;
    }());
    exports.UxGrid = UxGrid;
});
//# sourceMappingURL=ux-grid.js.map