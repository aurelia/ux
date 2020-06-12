import { __awaiter, __decorate, __generator } from "tslib";
import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
var UxGridCell = /** @class */ (function () {
    function UxGridCell(element) {
        this.element = element;
    }
    UxGridCell.prototype.bind = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.processAttributes();
                this.xsChanged(this.xs);
                this.smChanged(this.sm);
                this.mdChanged(this.md);
                this.lgChanged(this.lg);
                this.xlChanged(this.xl);
                return [2 /*return*/];
            });
        });
    };
    UxGridCell.prototype.processAttributes = function () {
        var alignAttributes = [
            'align-self-top',
            'align-self-middle',
            'align-self-bottom',
            'align-self-stretch'
        ];
        for (var _i = 0, alignAttributes_1 = alignAttributes; _i < alignAttributes_1.length; _i++) {
            var attribute = alignAttributes_1[_i];
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add("ux-grid-cell--" + attribute);
            }
        }
    };
    UxGridCell.prototype.xsChanged = function (newValue) {
        this.sizeChanged('xs', newValue);
    };
    UxGridCell.prototype.smChanged = function (newValue) {
        this.sizeChanged('sm', newValue);
    };
    UxGridCell.prototype.mdChanged = function (newValue) {
        this.sizeChanged('md', newValue);
    };
    UxGridCell.prototype.lgChanged = function (newValue) {
        this.sizeChanged('lg', newValue);
    };
    UxGridCell.prototype.xlChanged = function (newValue) {
        this.sizeChanged('xl', newValue);
    };
    UxGridCell.prototype.sizeChanged = function (size, value) {
        for (var i = 0; i < 10; i++) {
            this.element.classList.remove("ux-grid-cell--" + size + "-" + i);
            this.element.classList.remove("ux-grid-cell--order-" + this.order + "-" + size + "-" + i);
        }
        if (typeof value === 'string') {
            this.element.classList.add("ux-grid-cell--" + size + "-" + value);
            if (typeof this.order === 'string') {
                this.element.classList.add("ux-grid-cell--order-" + this.order + "-" + size + "-" + value);
            }
        }
    };
    UxGridCell.prototype.orderChanged = function () {
        this.xsChanged(this.xs);
        this.smChanged(this.sm);
        this.mdChanged(this.md);
        this.lgChanged(this.lg);
        this.xlChanged(this.xl);
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
}());
export { UxGridCell };
//# sourceMappingURL=ux-grid-cell.js.map