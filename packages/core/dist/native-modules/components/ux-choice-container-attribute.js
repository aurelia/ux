import { __decorate } from "tslib";
import { UxChoiceAttribute } from './ux-choice-attribute';
import { customAttribute, bindingMode, bindable, inject, TaskQueue } from 'aurelia-framework';
var UxChoiceContainerAttribute = /** @class */ (function () {
    function UxChoiceContainerAttribute(element, taskQueue) {
        this.element = element;
        this.taskQueue = taskQueue;
        this.multiple = 'auto';
        this.isMultiple = false;
        this.choices = [];
        this.isQueued = false;
    }
    /* Event passed on the click eventListener */
    UxChoiceContainerAttribute.prototype.handleEvent = function (event) {
        if (event.target instanceof Element) {
            var choiceElement = event.target.closest('.ux-choice');
            if (choiceElement !== null &&
                choiceElement.au !== undefined &&
                choiceElement.au['ux-choice'] !== undefined &&
                choiceElement.au['ux-choice'].viewModel instanceof UxChoiceAttribute) {
                var choice = choiceElement.au['ux-choice'].viewModel;
                this.toggleValue(choice.value);
            }
        }
    };
    /* Callback passed on the TaskQueue when registering child choices */
    UxChoiceContainerAttribute.prototype.call = function () {
        this.isQueued = false;
        this.processValue();
    };
    UxChoiceContainerAttribute.prototype.bind = function () {
        this.element.classList.add('ux-choice-container');
        this.multipleChanged();
        this.valueChanged(this.value);
    };
    UxChoiceContainerAttribute.prototype.multipleChanged = function () {
        if (this.multiple === 'auto') {
            this.isMultiple = Array.isArray(this.value) ? true : false;
        }
        else if (typeof this.multiple === 'boolean') {
            this.isMultiple = this.multiple;
        }
        else {
            this.isMultiple = this.multiple === 'multiple' || this.multiple === 'true';
        }
        this.element.classList.toggle('ux-choice-container--multiple', this.isMultiple);
    };
    UxChoiceContainerAttribute.prototype.attached = function () {
        this.element.addEventListener('click', this);
    };
    UxChoiceContainerAttribute.prototype.detached = function () {
        this.element.removeEventListener('click', this);
    };
    UxChoiceContainerAttribute.prototype.requestProcessValue = function () {
        if (!this.isQueued) {
            this.isQueued = true;
            this.taskQueue.queueMicroTask(this);
        }
    };
    UxChoiceContainerAttribute.prototype.registerChoice = function (choice) {
        this.choices.push(choice);
        this.requestProcessValue();
    };
    UxChoiceContainerAttribute.prototype.disposeChoice = function (choice) {
        var index = this.choices.indexOf(choice);
        if (index !== -1) {
            this.choices.splice(index, 1);
            this.requestProcessValue();
        }
    };
    UxChoiceContainerAttribute.prototype.valueChanged = function (newValue) {
        if (this.multiple === 'auto') {
            this.multipleChanged(); // call this to ensure isMultiple respect value type
        }
        // Before to process the value, let's make
        // it's the proper type according to `isMultiple`
        if (this.isMultiple && typeof newValue === 'string') {
            this.value = [];
            return;
        }
        else if (!this.isMultiple && Array.isArray(newValue)) {
            this.value = undefined;
            return;
        }
        // By using requestProcessValue we avoid too many
        // process in case the value changes quickly
        // This can happen if the value type must be fixed (above)
        // or if there are several choice registration in a row
        this.requestProcessValue();
    };
    UxChoiceContainerAttribute.prototype.toggleValue = function (value) {
        if (this.isMultiple && Array.isArray(this.value)) {
            var index = this.value.indexOf(value);
            if (index === -1) {
                this.value.push(value);
            }
            else {
                this.value.splice(index, 1);
            }
        }
        else if (!this.isMultiple) {
            this.value = this.value === value ? undefined : value;
        }
        this.processValue();
    };
    UxChoiceContainerAttribute.prototype.processValue = function () {
        var choicesLength = this.choices.length;
        if (this.isMultiple && Array.isArray(this.value)) {
            for (var index = 0; index < choicesLength; index++) {
                var choice = this.choices[index];
                choice.selected = this.value.indexOf(choice.value) !== -1;
            }
        }
        else if (!this.isMultiple && typeof this.value === 'string') {
            for (var index = 0; index < choicesLength; index++) {
                var choice = this.choices[index];
                choice.selected = this.value === choice.value;
            }
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay, primaryProperty: true })
    ], UxChoiceContainerAttribute.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxChoiceContainerAttribute.prototype, "multiple", void 0);
    UxChoiceContainerAttribute = __decorate([
        customAttribute('ux-choice-container', undefined, ['ux-choice-value']),
        inject(Element, TaskQueue)
    ], UxChoiceContainerAttribute);
    return UxChoiceContainerAttribute;
}());
export { UxChoiceContainerAttribute };
//# sourceMappingURL=ux-choice-container-attribute.js.map