define(["require", "exports", "tslib", "aurelia-templating", "aurelia-dependency-injection", "./modal-util"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_dependency_injection_1, modal_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OkModalAttribute = void 0;
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
            var modal = modal_util_1.findModal(this.element);
            if (modal !== null) {
                modal.ok(this.value);
            }
        };
        OkModalAttribute = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element),
            aurelia_templating_1.customAttribute('ok-modal')
        ], OkModalAttribute);
        return OkModalAttribute;
    }());
    exports.OkModalAttribute = OkModalAttribute;
});
//# sourceMappingURL=ok-modal-attribute.js.map