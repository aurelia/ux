System.register(["aurelia-dependency-injection", "../designs/material-design"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, material_design_1, Android;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (material_design_1_1) {
                material_design_1 = material_design_1_1;
            }
        ],
        execute: function () {
            Android = (function () {
                function Android(design) {
                    this.design = design;
                    this.type = 'android';
                }
                return Android;
            }());
            Android = __decorate([
                aurelia_dependency_injection_1.inject(material_design_1.MaterialDesign)
            ], Android);
            exports_1("Android", Android);
        }
    };
});
