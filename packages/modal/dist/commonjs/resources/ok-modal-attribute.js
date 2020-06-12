"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkModalAttribute = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var modal_util_1 = require("./modal-util");
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
//# sourceMappingURL=ok-modal-attribute.js.map