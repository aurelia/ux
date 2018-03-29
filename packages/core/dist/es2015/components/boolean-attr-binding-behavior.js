var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindingBehavior } from 'aurelia-binding';
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
