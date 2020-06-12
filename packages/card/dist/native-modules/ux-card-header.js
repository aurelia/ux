import { __awaiter, __decorate, __generator } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';
var UxCardHeader = /** @class */ (function () {
    function UxCardHeader(element) {
        this.element = element;
    }
    UxCardHeader.prototype.bind = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.colorChanged(this.color);
                return [2 /*return*/];
            });
        });
    };
    UxCardHeader.prototype.colorChanged = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    __decorate([
        bindable
    ], UxCardHeader.prototype, "color", void 0);
    UxCardHeader = __decorate([
        inject(Element),
        customElement('ux-card-header'),
        useView(PLATFORM.moduleName('./ux-card-header.html'))
    ], UxCardHeader);
    return UxCardHeader;
}());
export { UxCardHeader };
//# sourceMappingURL=ux-card-header.js.map