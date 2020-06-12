import { __awaiter, __decorate } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
let UxGridCell = /** @class */ (() => {
    let UxGridCell = class UxGridCell {
        constructor(element) {
            this.element = element;
        }
        bind() {
            return __awaiter(this, void 0, void 0, function* () {
                this.processAttributes();
                this.xsChanged(this.xs);
                this.smChanged(this.sm);
                this.mdChanged(this.md);
                this.lgChanged(this.lg);
                this.xlChanged(this.xl);
            });
        }
        processAttributes() {
            const alignAttributes = [
                'align-self-top',
                'align-self-middle',
                'align-self-bottom',
                'align-self-stretch'
            ];
            for (const attribute of alignAttributes) {
                if (this.element.hasAttribute(attribute)) {
                    this.element.removeAttribute(attribute);
                    this.element.classList.add(`ux-grid-cell--${attribute}`);
                }
            }
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
                this.element.classList.remove(`ux-grid-cell--${size}-${i}`);
                this.element.classList.remove(`ux-grid-cell--order-${this.order}-${size}-${i}`);
            }
            if (typeof value === 'string') {
                this.element.classList.add(`ux-grid-cell--${size}-${value}`);
                if (typeof this.order === 'string') {
                    this.element.classList.add(`ux-grid-cell--order-${this.order}-${size}-${value}`);
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
    };
    __decorate([
        bindable
    ], UxGridCell.prototype, "xs", void 0);
    __decorate([
        bindable
    ], UxGridCell.prototype, "sm", void 0);
    __decorate([
        bindable
    ], UxGridCell.prototype, "md", void 0);
    __decorate([
        bindable
    ], UxGridCell.prototype, "lg", void 0);
    __decorate([
        bindable
    ], UxGridCell.prototype, "xl", void 0);
    __decorate([
        bindable
    ], UxGridCell.prototype, "order", void 0);
    UxGridCell = __decorate([
        inject(Element),
        customElement('ux-grid-cell'),
        useView(PLATFORM.moduleName('./ux-grid-cell.html'))
    ], UxGridCell);
    return UxGridCell;
})();
export { UxGridCell };
//# sourceMappingURL=ux-grid-cell.js.map