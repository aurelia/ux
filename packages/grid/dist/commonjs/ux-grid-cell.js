"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxGridCell = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_pal_1 = require("aurelia-pal");
var UxGridCell = /** @class */ (function () {
    function UxGridCell(element) {
        this.element = element;
    }
    UxGridCell.prototype.bind = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "xs", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "sm", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "md", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "lg", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "xl", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxGridCell.prototype, "order", void 0);
    UxGridCell = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element),
        aurelia_templating_1.customElement('ux-grid-cell'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-grid-cell.html'))
    ], UxGridCell);
    return UxGridCell;
}());
exports.UxGridCell = UxGridCell;
//# sourceMappingURL=ux-grid-cell.js.map