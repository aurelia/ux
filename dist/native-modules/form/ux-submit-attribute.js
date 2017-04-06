var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
var UxSubmitCustomAttribute = (function () {
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
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
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
    return UxSubmitCustomAttribute;
}());
UxSubmitCustomAttribute = __decorate([
    inject(Element)
], UxSubmitCustomAttribute);
export { UxSubmitCustomAttribute };
