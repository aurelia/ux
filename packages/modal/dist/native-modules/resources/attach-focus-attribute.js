import { __decorate } from "tslib";
import { customAttribute, inject } from "aurelia-framework";
var AttachFocusAttribute = /** @class */ (function () {
    function AttachFocusAttribute(element) {
        this.element = element;
    }
    AttachFocusAttribute.prototype.attached = function () {
        if (this.value === '' || (this.value && this.value !== 'false')) {
            this.element.focus();
        }
    };
    AttachFocusAttribute = __decorate([
        inject(Element),
        customAttribute('ux-attach-focus')
    ], AttachFocusAttribute);
    return AttachFocusAttribute;
}());
export { AttachFocusAttribute };
//# sourceMappingURL=attach-focus-attribute.js.map