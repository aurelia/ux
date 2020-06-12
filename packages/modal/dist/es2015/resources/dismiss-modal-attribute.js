import { __decorate } from "tslib";
import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findModal } from './modal-util';
let DismissModalAttribute = /** @class */ (() => {
    let DismissModalAttribute = class DismissModalAttribute {
        constructor(element) {
            this.element = element;
        }
        bind() {
            this.element.addEventListener('click', this);
        }
        unbind() {
            this.element.removeEventListener('click', this);
        }
        handleEvent() {
            const modal = findModal(this.element);
            if (modal !== null) {
                modal.dismiss();
            }
        }
    };
    DismissModalAttribute = __decorate([
        inject(Element),
        customAttribute('dismiss-modal')
    ], DismissModalAttribute);
    return DismissModalAttribute;
})();
export { DismissModalAttribute };
//# sourceMappingURL=dismiss-modal-attribute.js.map