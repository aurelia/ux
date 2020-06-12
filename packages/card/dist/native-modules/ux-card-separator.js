import { __decorate } from "tslib";
import { inject, useView, PLATFORM } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
var UxCardSeparator = /** @class */ (function () {
    function UxCardSeparator(element) {
        this.element = element;
    }
    UxCardSeparator.prototype.bind = function () {
        if (this.element.hasAttribute('no-margin')) {
            this.element.classList.add('ux-card__separator--no-margin');
        }
    };
    UxCardSeparator = __decorate([
        inject(Element),
        customElement('ux-card-separator'),
        useView(PLATFORM.moduleName('./ux-card-separator.html'))
    ], UxCardSeparator);
    return UxCardSeparator;
}());
export { UxCardSeparator };
//# sourceMappingURL=ux-card-separator.js.map