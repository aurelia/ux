define(["require", "exports", "tslib", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxList = void 0;
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
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxList.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxList.prototype, "type", void 0);
        UxList = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-list'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-list.html'))
        ], UxList);
        return UxList;
    }());
    exports.UxList = UxList;
});
//# sourceMappingURL=ux-list.js.map