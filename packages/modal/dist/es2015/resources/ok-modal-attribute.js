import { __decorate } from "tslib";
import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findModal } from './modal-util';
let OkModalAttribute = /** @class */ (() => {
    let OkModalAttribute = class OkModalAttribute {
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
                modal.ok(this.value);
            }
        }
    };
    OkModalAttribute = __decorate([
        inject(Element),
        customAttribute('ok-modal')
    ], OkModalAttribute);
    return OkModalAttribute;
})();
export { OkModalAttribute };
//# sourceMappingURL=ok-modal-attribute.js.map