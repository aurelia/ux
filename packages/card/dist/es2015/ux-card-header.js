import { __awaiter, __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';
let UxCardHeader = /** @class */ (() => {
    let UxCardHeader = class UxCardHeader {
        constructor(element) {
            this.element = element;
        }
        bind() {
            return __awaiter(this, void 0, void 0, function* () {
                this.colorChanged(this.color);
            });
        }
        colorChanged(newValue) {
            return __awaiter(this, void 0, void 0, function* () {
                this.element.classList.remove('ux-card__header--accent', 'ux-card__header--primary');
                if (newValue === 'primary') {
                    this.element.classList.add('ux-card__header--primary');
                }
                if (newValue === 'accent') {
                    this.element.classList.add('ux-card__header--accent');
                }
            });
        }
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
})();
export { UxCardHeader };
//# sourceMappingURL=ux-card-header.js.map