import { __decorate } from "tslib";
import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import { customAttribute, inject, observable, Optional } from 'aurelia-framework';
import './ux-choice.css';
let UxChoiceAttribute = /** @class */ (() => {
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
    return UxChoiceAttribute;
})();
export { UxChoiceAttribute };
//# sourceMappingURL=ux-choice-attribute.js.map