var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container, inject } from 'aurelia-dependency-injection';
import { Cordova } from './hosts/cordova';
import { Web } from './hosts/web';
import { Electron } from './hosts/electron';
import { UXConfiguration } from './ux-configuration';
var AureliaUX = (function () {
    function AureliaUX(use, container) {
        this.use = use;
        this.availableHosts = [
            container.get(Cordova),
            container.get(Electron),
            container.get(Web)
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
    inject(UXConfiguration, Container)
], AureliaUX);
export { AureliaUX };
