"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachFocusAttribute = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var AttachFocusAttribute = /** @class */ (function () {
    function AttachFocusAttribute(element) {
        this.element = element;
    }
    AttachFocusAttribute.prototype.attached = function () {
        if (this.value === '' || (this.value && this.value !== 'false')) {
            this.element.focus();
        }
    };
    AttachFocusAttribute = tslib_1.__decorate([
        aurelia_framework_1.inject(Element),
        aurelia_framework_1.customAttribute('ux-attach-focus')
    ], AttachFocusAttribute);
    return AttachFocusAttribute;
}());
exports.AttachFocusAttribute = AttachFocusAttribute;
//# sourceMappingURL=attach-focus-attribute.js.map