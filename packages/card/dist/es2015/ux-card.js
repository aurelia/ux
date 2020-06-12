import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, useView } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';
let UxCard = /** @class */ (() => {
    let UxCard = class UxCard {
        constructor(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        bind() {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        }
        xsChanged(newValue) {
            this.sizeChanged('xs', newValue);
        }
        smChanged(newValue) {
            this.sizeChanged('sm', newValue);
        }
        mdChanged(newValue) {
            this.sizeChanged('md', newValue);
        }
        lgChanged(newValue) {
            this.sizeChanged('lg', newValue);
        }
        xlChanged(newValue) {
            this.sizeChanged('xl', newValue);
        }
        sizeChanged(size, value) {
            for (let i = 0; i < 10; i++) {
                this.element.classList.remove(`ux-card--${size}-${i}`);
                this.element.classList.remove(`ux-card--order-${this.order}-${size}-${i}`);
            }
            if (typeof value === 'string') {
                this.element.classList.add(`ux-card--${size}-${value}`);
                if (typeof this.order === 'string') {
                    this.element.classList.add(`ux-card--order-${this.order}-${size}-${value}`);
                }
            }
        }
        orderChanged() {
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        }
        themeChanged(newValue) {
            this.styleEngine.applyTheme(newValue, this.element);
        }
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
        customElement('ux-card'),
        useView(PLATFORM.moduleName('./ux-card.html'))
    ], UxCard);
    return UxCard;
})();
export { UxCard };
//# sourceMappingURL=ux-card.js.map