"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_binding_1 = require("aurelia-binding");
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
        aurelia_binding_1.bindingBehavior('booleanAttr')
    ], BooleanBB);
    return BooleanBB;
}());
exports.BooleanBB = BooleanBB;
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