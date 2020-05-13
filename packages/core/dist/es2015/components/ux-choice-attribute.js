var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import { customAttribute, inject, observable, Optional } from 'aurelia-framework';
import './ux-choice.css';
let UxChoiceAttribute = class UxChoiceAttribute {
    constructor(element, container) {
        this.element = element;
        this.container = container;
    }
    bind() {
        this.container.registerChoice(this);
        this.element.classList.add('ux-choice');
    }
    detached() {
        this.container.disposeChoice(this);
    }
    valueChanged(newValue, oldValue) {
        if (!this.container) {
            return;
        }
        const containerValue = this.container.value;
        if (this.container.isMultiple && Array.isArray(containerValue)) {
            for (let value of containerValue) {
                if (value === oldValue) {
                    value = newValue;
                    return;
                }
            }
        }
        else if (!this.container.isMultiple && containerValue === oldValue) {
            this.container.value = newValue;
        }
    }
    selectedChanged() {
        this.element.classList.toggle('ux-choice--selected', this.selected);
    }
};
__decorate([
    observable
], UxChoiceAttribute.prototype, "selected", void 0);
UxChoiceAttribute = __decorate([
    customAttribute('ux-choice', undefined, ['ux-choice-item', 'ux-choice-option']),
    inject(Element, Optional.of(UxChoiceContainerAttribute))
], UxChoiceAttribute);
export { UxChoiceAttribute };
//# sourceMappingURL=ux-choice-attribute.js.map