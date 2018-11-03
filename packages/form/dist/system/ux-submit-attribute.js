System.register(["aurelia-dependency-injection", "aurelia-pal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, aurelia_pal_1, UxSubmitCustomAttribute;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            }
        ],
        execute: function () {
            UxSubmitCustomAttribute = /** @class */ (function () {
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
                            this.submitEvent = aurelia_pal_1.DOM.createCustomEvent('submit', { bubbles: true });
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
                UxSubmitCustomAttribute = __decorate([
                    aurelia_dependency_injection_1.inject(Element)
                ], UxSubmitCustomAttribute);
                return UxSubmitCustomAttribute;
            }());
            exports_1("UxSubmitCustomAttribute", UxSubmitCustomAttribute);
        }
    };
});
