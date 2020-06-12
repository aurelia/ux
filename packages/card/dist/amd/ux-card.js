define(["require", "exports", "tslib", "aurelia-dependency-injection", "aurelia-templating", "@aurelia-ux/core", "aurelia-pal"], function (require, exports, tslib_1, aurelia_dependency_injection_1, aurelia_templating_1, core_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCard = void 0;
    var UxCard = /** @class */ (function () {
        function UxCard(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        UxCard.prototype.bind = function () {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        };
        UxCard.prototype.xsChanged = function (newValue) {
            this.sizeChanged('xs', newValue);
        };
        UxCard.prototype.smChanged = function (newValue) {
            this.sizeChanged('sm', newValue);
        };
        UxCard.prototype.mdChanged = function (newValue) {
            this.sizeChanged('md', newValue);
        };
        UxCard.prototype.lgChanged = function (newValue) {
            this.sizeChanged('lg', newValue);
        };
        UxCard.prototype.xlChanged = function (newValue) {
            this.sizeChanged('xl', newValue);
        };
        UxCard.prototype.sizeChanged = function (size, value) {
            for (var i = 0; i < 10; i++) {
                this.element.classList.remove("ux-card--" + size + "-" + i);
                this.element.classList.remove("ux-card--order-" + this.order + "-" + size + "-" + i);
            }
            if (typeof value === 'string') {
                this.element.classList.add("ux-card--" + size + "-" + value);
                if (typeof this.order === 'string') {
                    this.element.classList.add("ux-card--order-" + this.order + "-" + size + "-" + value);
                }
            }
        };
        UxCard.prototype.orderChanged = function () {
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        };
        UxCard.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(newValue, this.element);
        };
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "xs", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "sm", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "md", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "lg", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "xl", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "order", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxCard.prototype, "theme", void 0);
        UxCard = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-card'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-card.html'))
        ], UxCard);
        return UxCard;
    }());
    exports.UxCard = UxCard;
});
//# sourceMappingURL=ux-card.js.map