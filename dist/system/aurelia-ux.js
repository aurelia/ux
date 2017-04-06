System.register(["aurelia-dependency-injection", "./hosts/cordova", "./hosts/web", "./hosts/electron", "./ux-configuration"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, cordova_1, web_1, electron_1, ux_configuration_1, AureliaUX;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cordova_1_1) {
                cordova_1 = cordova_1_1;
            },
            function (web_1_1) {
                web_1 = web_1_1;
            },
            function (electron_1_1) {
                electron_1 = electron_1_1;
            },
            function (ux_configuration_1_1) {
                ux_configuration_1 = ux_configuration_1_1;
            }
        ],
        execute: function () {
            AureliaUX = (function () {
                function AureliaUX(use, container) {
                    this.use = use;
                    this.availableHosts = [
                        container.get(cordova_1.Cordova),
                        container.get(electron_1.Electron),
                        container.get(web_1.Web)
                    ];
                }
                AureliaUX.prototype.start = function (config) {
                    var _this = this;
                    var found = this.availableHosts.find(function (x) { return x.isAvailable; });
                    if (found === undefined) {
                        throw new Error('Could not determine host environment');
                    }
                    this.host = found;
                    return this.host.start(config).then(function (platform) {
                        _this.platform = platform;
                        _this.design = platform.design;
                    });
                };
                return AureliaUX;
            }());
            AureliaUX = __decorate([
                aurelia_dependency_injection_1.inject(ux_configuration_1.UXConfiguration, aurelia_dependency_injection_1.Container)
            ], AureliaUX);
            exports_1("AureliaUX", AureliaUX);
        }
    };
});
