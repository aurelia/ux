var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-binding', './hosts/cordova', './hosts/web', './xp-configuration'], function (require, exports, aurelia_dependency_injection_1, aurelia_binding_1, cordova_1, web_1, xp_configuration_1) {
    "use strict";
    var AureliaXP = (function () {
        function AureliaXP(use, container) {
            this.use = use;
            this.availableHosts = [
                container.get(cordova_1.Cordova),
                container.get(web_1.Web)
            ];
        }
        AureliaXP.prototype.platformChanged = function (platform) {
            this.design = platform.design;
        };
        AureliaXP.prototype.start = function (host) {
            var _this = this;
            var found;
            if (typeof host === 'string') {
                found = this.availableHosts.find(function (x) { return x.type === host; });
            }
            else if (!host) {
                found = this.availableHosts.find(function (x) { return x.isAvailable; });
            }
            else {
                found = host;
            }
            if (found === undefined) {
                throw new Error('Could not determine host environment');
            }
            this.host = found;
            return this.host.start().then(function (platform) {
                _this.platform = platform;
            });
        };
        __decorate([
            aurelia_binding_1.observable
        ], AureliaXP.prototype, "platform", void 0);
        __decorate([
            aurelia_binding_1.observable
        ], AureliaXP.prototype, "design", void 0);
        AureliaXP = __decorate([
            aurelia_dependency_injection_1.inject(xp_configuration_1.XpConfiguration, aurelia_dependency_injection_1.Container)
        ], AureliaXP);
        return AureliaXP;
    }());
    exports.AureliaXP = AureliaXP;
});
