"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DismissModalAttribute = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var modal_util_1 = require("./modal-util");
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
//# sourceMappingURL=dismiss-modal-attribute.js.map