import { __decorate } from "tslib";
import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findModal } from './modal-util';
var DismissModalAttribute = /** @class */ (function () {
    function DismissModalAttribute(element) {
        this.element = element;
    }
    DismissModalAttribute.prototype.bind = function () {
        this.element.addEventListener('click', this);
    };
    DismissModalAttribute.prototype.unbind = function () {
        this.element.removeEventListener('click', this);
    };
    DismissModalAttribute.prototype.handleEvent = function () {
        var modal = findModal(this.element);
        if (modal !== null) {
            modal.dismiss();
        }
    };
    DismissModalAttribute = __decorate([
        inject(Element),
        customAttribute('dismiss-modal')
    ], DismissModalAttribute);
    return DismissModalAttribute;
}());
export { DismissModalAttribute };
//# sourceMappingURL=dismiss-modal-attribute.js.map