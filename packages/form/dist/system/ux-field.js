System.register(["aurelia-templating", "aurelia-dependency-injection"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, UxField;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            }
        ],
        execute: function () {
            UxField = /** @class */ (function () {
                function UxField(element) {
                    this.element = element;
                }
                UxField.prototype.attached = function () {
                    if (this.label && !this.element.querySelector('label')) {
                        this.labelElement = document.createElement('label');
                        this.labelElement.textContent = this.label;
                        this.element.insertBefore(this.labelElement, this.element.firstChild);
                    }
                };
                UxField.prototype.labelChanged = function (newValue) {
                    if (this.labelElement != null) {
                        this.labelElement.textContent = newValue;
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxField.prototype, "label", void 0);
                UxField = __decorate([
                    aurelia_dependency_injection_1.inject(Element),
                    aurelia_templating_1.customElement('ux-field')
                ], UxField);
                return UxField;
            }());
            exports_1("UxField", UxField);
        }
    };
});
