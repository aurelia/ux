define(["require", "exports", "tslib", "aurelia-dependency-injection", "aurelia-pal", "aurelia-templating"], function (require, exports, tslib_1, aurelia_dependency_injection_1, aurelia_pal_1, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxSubmitCustomAttribute = void 0;
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
                    this.submitEvent = aurelia_pal_1.DOM.createCustomEvent('submit', { bubbles: true });
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
        UxSubmitCustomAttribute = tslib_1.__decorate([
            aurelia_templating_1.customAttribute('ux-submit'),
            aurelia_dependency_injection_1.inject(Element)
        ], UxSubmitCustomAttribute);
        return UxSubmitCustomAttribute;
    }());
    exports.UxSubmitCustomAttribute = UxSubmitCustomAttribute;
});
//# sourceMappingURL=ux-submit-attribute.js.map