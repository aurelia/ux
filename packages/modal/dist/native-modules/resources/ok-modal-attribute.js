import { __decorate } from "tslib";
import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findModal } from './modal-util';
var OkModalAttribute = /** @class */ (function () {
    function OkModalAttribute(element) {
        this.element = element;
    }
    OkModalAttribute.prototype.bind = function () {
        this.element.addEventListener('click', this);
    };
    OkModalAttribute.prototype.unbind = function () {
        this.element.removeEventListener('click', this);
    };
    OkModalAttribute.prototype.handleEvent = function () {
        var modal = findModal(this.element);
        if (modal !== null) {
            modal.ok(this.value);
        }
    };
    OkModalAttribute = __decorate([
        inject(Element),
        customAttribute('ok-modal')
    ], OkModalAttribute);
    return OkModalAttribute;
}());
export { OkModalAttribute };
//# sourceMappingURL=ok-modal-attribute.js.map