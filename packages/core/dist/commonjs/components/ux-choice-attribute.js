"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ux_choice_container_attribute_1 = require("./ux-choice-container-attribute");
var aurelia_framework_1 = require("aurelia-framework");
require("./ux-choice.css");
var UxChoiceAttribute = /** @class */ (function () {
    function UxChoiceAttribute(element, container) {
        this.element = element;
        this.container = container;
    }
    UxChoiceAttribute.prototype.bind = function () {
        this.container.registerChoice(this);
        this.element.classList.add('ux-choice');
    };
    UxChoiceAttribute.prototype.detached = function () {
        this.container.disposeChoice(this);
    };
    UxChoiceAttribute.prototype.valueChanged = function (newValue, oldValue) {
        if (!this.container) {
            return;
        }
        var containerValue = this.container.value;
        if (this.container.isMultiple && Array.isArray(containerValue)) {
            for (var _i = 0, containerValue_1 = containerValue; _i < containerValue_1.length; _i++) {
                var value = containerValue_1[_i];
                if (value === oldValue) {
                    value = newValue;
                    return;
                }
            }
        }
        else if (!this.container.isMultiple && containerValue === oldValue) {
            this.container.value = newValue;
        }
    };
    UxChoiceAttribute.prototype.selectedChanged = function () {
        this.element.classList.toggle('ux-choice--selected', this.selected);
    };
    __decorate([
        aurelia_framework_1.observable
    ], UxChoiceAttribute.prototype, "selected", void 0);
    UxChoiceAttribute = __decorate([
        aurelia_framework_1.customAttribute('ux-choice', undefined, ['ux-choice-item', 'ux-choice-option']),
        aurelia_framework_1.inject(Element, aurelia_framework_1.Optional.of(ux_choice_container_attribute_1.UxChoiceContainerAttribute))
    ], UxChoiceAttribute);
    return UxChoiceAttribute;
}());
exports.UxChoiceAttribute = UxChoiceAttribute;
//# sourceMappingURL=ux-choice-attribute.js.map