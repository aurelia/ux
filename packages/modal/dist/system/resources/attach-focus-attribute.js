System.register(["aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, AttachFocusAttribute;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            AttachFocusAttribute = /** @class */ (function () {
                function AttachFocusAttribute(element) {
                    this.element = element;
                }
                AttachFocusAttribute.prototype.attached = function () {
                    if (this.value === '' || this.value === 'attach-focus' || (this.value && this.value !== 'false')) {
                        this.element.focus();
                    }
                };
                AttachFocusAttribute = __decorate([
                    aurelia_framework_1.inject(Element),
                    aurelia_framework_1.customAttribute('attach-focus')
                ], AttachFocusAttribute);
                return AttachFocusAttribute;
            }());
            exports_1("AttachFocusAttribute", AttachFocusAttribute);
        }
    };
});
