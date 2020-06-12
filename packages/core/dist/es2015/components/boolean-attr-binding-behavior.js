import { __decorate } from "tslib";
import { bindingBehavior } from 'aurelia-binding';
let BooleanBB = /** @class */ (() => {
    let BooleanBB = class BooleanBB {
        bind(binding) {
            binding.targetObserver = new BooleanAttributeObserver(binding.target, binding.targetProperty);
        }
        unbind() {
            // Empty
        }
    };
    BooleanBB = __decorate([
        bindingBehavior('booleanAttr')
    ], BooleanBB);
    return BooleanBB;
})();
export { BooleanBB };
class BooleanAttributeObserver {
    constructor(element, attr) {
        this.element = element;
        this.attr = attr;
        this.useString = /(?:^data-)|(?:^aria-)|\w+:/.test(attr);
    }
    getValue() {
        const val = this.element.getAttribute(this.attr);
        return val || val === '' ? true : false;
    }
    setValue(newValue) {
        if (newValue || newValue === '') {
            return this.element.setAttribute(this.attr, this.useString ? 'true' : '');
        }
        return this.useString ? this.element.setAttribute(this.attr, 'false') : this.element.removeAttribute(this.attr);
    }
    subscribe() {
        const msg = `Observation of a "${this.element.nodeName}" element\'s "${this.attr}" attribute is not supported.`;
        throw new Error(msg);
    }
}
//# sourceMappingURL=boolean-attr-binding-behavior.js.map