"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxCardHeader = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var UxCardHeader = /** @class */ (function () {
    function UxCardHeader(element) {
        this.element = element;
    }
    UxCardHeader.prototype.bind = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.colorChanged(this.color);
                return [2 /*return*/];
            });
        });
    };
    UxCardHeader.prototype.colorChanged = function (newValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.element.classList.remove('ux-card__header--accent', 'ux-card__header--primary');
                if (newValue === 'primary') {
                    this.element.classList.add('ux-card__header--primary');
                }
                if (newValue === 'accent') {
                    this.element.classList.add('ux-card__header--accent');
                }
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxCardHeader.prototype, "color", void 0);
    UxCardHeader = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element),
        aurelia_templating_1.customElement('ux-card-header'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-card-header.html'))
    ], UxCardHeader);
    return UxCardHeader;
}());
exports.UxCardHeader = UxCardHeader;
//# sourceMappingURL=ux-card-header.js.map