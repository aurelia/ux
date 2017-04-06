System.register(["aurelia-dependency-injection", "../designs/material-design", "./web", "aurelia-pal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, material_design_1, web_1, aurelia_pal_1, Electron;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (material_design_1_1) {
                material_design_1 = material_design_1_1;
            },
            function (web_1_1) {
                web_1 = web_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            }
        ],
        execute: function () {
            Electron = (function () {
                function Electron() {
                    this.type = 'electron';
                }
                Object.defineProperty(Electron.prototype, "isAvailable", {
                    get: function () {
                        var p = aurelia_pal_1.PLATFORM.global.process;
                        return p && p.versions && p.versions.electron;
                    },
                    enumerable: true,
                    configurable: true
                });
                Electron.prototype.start = function (config) {
                    return Promise.resolve().then(function () { return config.container.get(web_1.Web); });
                };
                return Electron;
            }());
            Electron = __decorate([
                aurelia_dependency_injection_1.inject(material_design_1.MaterialDesign)
            ], Electron);
            exports_1("Electron", Electron);
        }
    };
});
