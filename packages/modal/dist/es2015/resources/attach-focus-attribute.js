import { __decorate } from "tslib";
import { customAttribute, inject } from "aurelia-framework";
let AttachFocusAttribute = /** @class */ (() => {
    let AttachFocusAttribute = class AttachFocusAttribute {
        constructor(element) {
            this.element = element;
        }
        attached() {
            if (this.value === '' || (this.value && this.value !== 'false')) {
                this.element.focus();
            }
        }
    };
    AttachFocusAttribute = __decorate([
        inject(Element),
        customAttribute('ux-attach-focus')
    ], AttachFocusAttribute);
    return AttachFocusAttribute;
})();
export { AttachFocusAttribute };
//# sourceMappingURL=attach-focus-attribute.js.map