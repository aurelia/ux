var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
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
    __decorate([
        bindable
    ], UxCard.prototype, "xs", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "sm", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "md", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "lg", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "xl", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "order", void 0);
    __decorate([
        bindable
    ], UxCard.prototype, "theme", void 0);
    UxCard = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-card')
    ], UxCard);
    return UxCard;
}());
export { UxCard };
//# sourceMappingURL=ux-card.js.map