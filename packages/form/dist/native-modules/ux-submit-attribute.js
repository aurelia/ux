import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customAttribute } from 'aurelia-templating';
var UxSubmitCustomAttribute = /** @class */ (function () {
    function UxSubmitCustomAttribute(element) {
        this.element = element;
        this.canSubmit = false;
    }
    UxSubmitCustomAttribute.prototype.attached = function () {
        var _this = this;
        var currentParent = this.element.parentElement;
        while (currentParent != null) {
            if (currentParent.tagName === 'UX-FORM') {
                this.canSubmit = true;
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
                this.element.addEventListener('mouseup', function () {
                    _this.element.dispatchEvent(_this.submitEvent);
                });
                break;
            }
            currentParent = currentParent.parentElement;
        }
    };
    UxSubmitCustomAttribute.prototype.detached = function () {
        var _this = this;
        if (this.canSubmit) {
            this.element.removeEventListener('mouseup', function () {
                _this.element.dispatchEvent(_this.submitEvent);
            });
        }
    };
    UxSubmitCustomAttribute = __decorate([
        customAttribute('ux-submit'),
        inject(Element)
    ], UxSubmitCustomAttribute);
    return UxSubmitCustomAttribute;
}());
export { UxSubmitCustomAttribute };
//# sourceMappingURL=ux-submit-attribute.js.map