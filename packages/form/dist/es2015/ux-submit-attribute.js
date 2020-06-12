import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customAttribute } from 'aurelia-templating';
let UxSubmitCustomAttribute = /** @class */ (() => {
    let UxSubmitCustomAttribute = class UxSubmitCustomAttribute {
        constructor(element) {
            this.element = element;
            this.canSubmit = false;
        }
        attached() {
            let currentParent = this.element.parentElement;
            while (currentParent != null) {
                if (currentParent.tagName === 'UX-FORM') {
                    this.canSubmit = true;
                    this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
                    this.element.addEventListener('mouseup', () => {
                        this.element.dispatchEvent(this.submitEvent);
                    });
                    break;
                }
                currentParent = currentParent.parentElement;
            }
        }
        detached() {
            if (this.canSubmit) {
                this.element.removeEventListener('mouseup', () => {
                    this.element.dispatchEvent(this.submitEvent);
                });
            }
        }
    };
    UxSubmitCustomAttribute = __decorate([
        customAttribute('ux-submit'),
        inject(Element)
    ], UxSubmitCustomAttribute);
    return UxSubmitCustomAttribute;
})();
export { UxSubmitCustomAttribute };
//# sourceMappingURL=ux-submit-attribute.js.map