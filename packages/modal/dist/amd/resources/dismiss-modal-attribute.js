define(["require", "exports", "tslib", "aurelia-templating", "aurelia-dependency-injection", "./modal-util"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_dependency_injection_1, modal_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DismissModalAttribute = void 0;
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
            var modal = modal_util_1.findModal(this.element);
            if (modal !== null) {
                modal.dismiss();
            }
        };
        DismissModalAttribute = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element),
            aurelia_templating_1.customAttribute('dismiss-modal')
        ], DismissModalAttribute);
        return DismissModalAttribute;
    }());
    exports.DismissModalAttribute = DismissModalAttribute;
});
//# sourceMappingURL=dismiss-modal-attribute.js.map