var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
let UxSubmitCustomAttribute = class UxSubmitCustomAttribute {
    constructor(element) {
        this.element = element;
        this.canSubmit = false;
    }
    attached() {
        let currentParent = this.element.parentElement;
        while (currentParent != null) {
            if (currentParent.tagName === 'UX-FORM') {
                this.canSubmit = true;
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });
                this.element.addEventListener('mouseup', () => {
                    this.element.dispatchEvent(this.submitEvent);
                });
                break;
            }
            currentParent = currentParent.parentElement;
        }
    }
    detached() {
        if (this.canSubmit) {
            this.element.removeEventListener('mouseup', () => {
                this.element.dispatchEvent(this.submitEvent);
            });
        }
    }
};
UxSubmitCustomAttribute = __decorate([
    inject(Element)
], UxSubmitCustomAttribute);
export { UxSubmitCustomAttribute };
