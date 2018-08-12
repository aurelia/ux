System.register(["aurelia-templating", "aurelia-pal", "aurelia-dependency-injection", "@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_pal_1, aurelia_dependency_injection_1, core_1, UxForm;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxForm = /** @class */ (function () {
                function UxForm(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.bindSubmitToEnter = false;
                }
                UxForm.prototype.bind = function () {
                    if (this.theme != null) {
                        this.themeChanged(this.theme);
                    }
                    if (this.submitOnEnter !== undefined) {
                        this.bindSubmitToEnter = true;
                    }
                };
                UxForm.prototype.attached = function () {
                    var _this = this;
                    if (this.bindSubmitToEnter) {
                        this.element.addEventListener('keyup', function (e) {
                            var canSubmit = true;
                            if (e.srcElement != null && e.srcElement.tagName === 'TEXTAREA') {
                                canSubmit = false;
                            }
                            if (e.keyCode === 13 && canSubmit) {
                                _this.submitForm();
                            }
                        });
                    }
                };
                UxForm.prototype.detached = function () {
                    var _this = this;
                    if (this.bindSubmitToEnter) {
                        this.element.removeEventListener('keyup', function (e) {
                            if (e.keyCode === 13) {
                                _this.submitForm();
                            }
                        });
                    }
                };
                UxForm.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'form';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxForm.prototype.submitForm = function () {
                    var submitEvent = aurelia_pal_1.DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
                    this.element.dispatchEvent(submitEvent);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxForm.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxForm.prototype, "submitOnEnter", void 0);
                UxForm = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-form')
                ], UxForm);
                return UxForm;
            }());
            exports_1("UxForm", UxForm);
        }
    };
});
