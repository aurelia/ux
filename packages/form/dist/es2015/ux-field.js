var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
let UxField = class UxField {
    constructor(element) {
        this.element = element;
    }
    attached() {
        if (this.label && !this.element.querySelector('label')) {
            this.labelElement = document.createElement('label');
            this.labelElement.textContent = this.label;
            this.element.insertBefore(this.labelElement, this.element.firstChild);
        }
    }
    labelChanged(newValue) {
        if (this.labelElement != null) {
            this.labelElement.textContent = newValue;
        }
    }
};
__decorate([
    bindable
], UxField.prototype, "label", void 0);
UxField = __decorate([
    inject(Element),
    customElement('ux-field')
], UxField);
export { UxField };
//# sourceMappingURL=ux-field.js.map