System.register(["aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-grid-theme"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_dependency_injection_1, core_1, ux_grid_theme_1, gridTheme, UxGrid;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_grid_theme_1_1) {
                ux_grid_theme_1 = ux_grid_theme_1_1;
            }
        ],
        execute: function () {
            gridTheme = new ux_grid_theme_1.UxGridTheme();
            UxGrid = /** @class */ (function () {
                function UxGrid(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    styleEngine.ensureDefaultTheme(gridTheme);
                }
                UxGrid.prototype.bind = function () {
                    this.themeChanged(this.theme);
                };
                UxGrid.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'grid';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGrid.prototype, "theme", void 0);
                UxGrid = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-grid')
                ], UxGrid);
                return UxGrid;
            }());
            exports_1("UxGrid", UxGrid);
        }
    };
});
