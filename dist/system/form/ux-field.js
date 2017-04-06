System.register(["aurelia-templating", "aurelia-dependency-injection", "../styles/style-engine", "../designs/design-attributes"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_dependency_injection_1, style_engine_1, design_attributes_1, UxField;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
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
            UxField = (function () {
                function UxField(element, resources, styleEngine) {
                    this.element = element;
                    this.resources = resources;
                    this.styleEngine = styleEngine;
                    this.theme = null;
                }
                UxField.prototype.created = function (_, myView) {
                    this.view = myView;
                };
                UxField.prototype.bind = function () {
                    if (this.theme) {
                        this.styleEngine.applyTheme(this, this.theme);
                    }
                };
                UxField.prototype.attached = function () {
                    if (this.label && !this.element.querySelector('label')) {
                        var newLabel = document.createElement('label');
                        newLabel.textContent = this.label;
                        this.element.insertBefore(newLabel, this.element.firstChild);
                    }
                };
                UxField.prototype.themeChanged = function (newValue) {
                    this.styleEngine.applyTheme(this, newValue);
                };
                return UxField;
            }());
            __decorate([
                aurelia_templating_1.bindable
            ], UxField.prototype, "theme", void 0);
            __decorate([
                aurelia_templating_1.bindable
            ], UxField.prototype, "label", void 0);
            UxField = __decorate([
                aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
                aurelia_templating_1.customElement('ux-field'),
                aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
            ], UxField);
            exports_1("UxField", UxField);
        }
    };
});
