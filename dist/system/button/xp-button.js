System.register(['aurelia-templating', 'aurelia-dependency-injection', '../styles/style-engine'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, style_engine_1;
    var XpButton, StyleResolveValueConverter;
    return {
        setters:[
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (style_engine_1_1) {
                style_engine_1 = style_engine_1_1;
            }],
        execute: function() {
            XpButton = (function () {
                function XpButton(resources, styleEngine) {
                    this.resources = resources;
                    this.styleEngine = styleEngine;
                    this.raised = null;
                    this.disabled = false;
                    this.theme = null;
                }
                XpButton.prototype.created = function (_, myView) {
                    this.view = myView;
                };
                XpButton.prototype.bind = function () {
                    if (this.theme) {
                        this.styleEngine.applyTheme(this, this.theme);
                    }
                };
                XpButton.prototype.themeChanged = function (newValue) {
                    this.styleEngine.applyTheme(this, newValue);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], XpButton.prototype, "raised", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], XpButton.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], XpButton.prototype, "theme", void 0);
                XpButton = __decorate([
                    aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
                    aurelia_templating_1.customElement('xp-button')
                ], XpButton);
                return XpButton;
            }());
            exports_1("XpButton", XpButton);
            StyleResolveValueConverter = (function () {
                function StyleResolveValueConverter() {
                }
                StyleResolveValueConverter.prototype.toView = function (className, styleValue, elementValue) {
                    if (elementValue === null) {
                        return styleValue ? className : '';
                    }
                    if (typeof elementValue === 'string') {
                        if (elementValue === 'true') {
                            return className;
                        }
                        return '';
                    }
                    return elementValue ? className : '';
                };
                return StyleResolveValueConverter;
            }());
            exports_1("StyleResolveValueConverter", StyleResolveValueConverter);
        }
    }
});
