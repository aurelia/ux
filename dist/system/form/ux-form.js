System.register(["aurelia-templating", "aurelia-pal", "aurelia-dependency-injection", "../styles/style-engine", "../designs/design-attributes"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_pal_1, aurelia_dependency_injection_1, style_engine_1, design_attributes_1, UxForm;
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
            function (style_engine_1_1) {
                style_engine_1 = style_engine_1_1;
            },
            function (design_attributes_1_1) {
                design_attributes_1 = design_attributes_1_1;
            }
        ],
        execute: function () {
            UxForm = (function () {
                function UxForm(element, resources, styleEngine) {
                    this.element = element;
                    this.resources = resources;
                    this.styleEngine = styleEngine;
                    this.theme = null;
                    this.bindSubmitToEnter = false;
                }
                UxForm.prototype.created = function (_, myView) {
                    this.view = myView;
                };
                UxForm.prototype.bind = function () {
                    if (this.theme) {
                        this.styleEngine.applyTheme(this, this.theme);
                    }
                    if (this.submitOnEnter !== undefined) {
                        this.bindSubmitToEnter = true;
                    }
                };
                UxForm.prototype.attached = function () {
                    var _this = this;
                    if (this.bindSubmitToEnter) {
                        this.element.addEventListener('keyup', function (e) {
                            if (e.keyCode === 13) {
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
                    this.styleEngine.applyTheme(this, newValue);
                };
                UxForm.prototype.submitForm = function () {
                    var submitEvent = aurelia_pal_1.DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
                    this.element.dispatchEvent(submitEvent);
                };
                return UxForm;
            }());
            __decorate([
                aurelia_templating_1.bindable
            ], UxForm.prototype, "theme", void 0);
            __decorate([
                aurelia_templating_1.bindable
            ], UxForm.prototype, "submitOnEnter", void 0);
            UxForm = __decorate([
                aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
                aurelia_templating_1.customElement('ux-form'),
                aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
            ], UxForm);
            exports_1("UxForm", UxForm);
        }
    };
});
