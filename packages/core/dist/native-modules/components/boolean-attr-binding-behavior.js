import { __decorate } from "tslib";
import { bindingBehavior } from 'aurelia-binding';
var BooleanBB = /** @class */ (function () {
    function BooleanBB() {
    }
    BooleanBB.prototype.bind = function (binding) {
        binding.targetObserver = new BooleanAttributeObserver(binding.target, binding.targetProperty);
    };
    BooleanBB.prototype.unbind = function () {
        // Empty
    };
    BooleanBB = __decorate([
        bindingBehavior('booleanAttr')
    ], BooleanBB);
    return BooleanBB;
}());
export { BooleanBB };
var BooleanAttributeObserver = /** @class */ (function () {
    function BooleanAttributeObserver(element, attr) {
        this.element = element;
        this.attr = attr;
        this.useString = /(?:^data-)|(?:^aria-)|\w+:/.test(attr);
    }
    BooleanAttributeObserver.prototype.getValue = function () {
        var val = this.element.getAttribute(this.attr);
        return val || val === '' ? true : false;
    };
    BooleanAttributeObserver.prototype.setValue = function (newValue) {
        if (newValue || newValue === '') {
            return this.element.setAttribute(this.attr, this.useString ? 'true' : '');
        }
        return this.useString ? this.element.setAttribute(this.attr, 'false') : this.element.removeAttribute(this.attr);
    };
    BooleanAttributeObserver.prototype.subscribe = function () {
        var msg = "Observation of a \"" + this.element.nodeName + "\" element's \"" + this.attr + "\" attribute is not supported.";
        throw new Error(msg);
    };
    return BooleanAttributeObserver;
}());
//# sourceMappingURL=boolean-attr-binding-behavior.js.map