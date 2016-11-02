var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container, inject } from 'aurelia-dependency-injection';
import { observable } from 'aurelia-binding';
import { Cordova } from './hosts/cordova';
import { Web } from './hosts/web';
import { Electron } from './hosts/electron';
import { XpConfiguration } from './xp-configuration';
export let AureliaXP = class AureliaXP {
    constructor(use, container) {
        this.use = use;
        this.availableHosts = [
            container.get(Cordova),
            container.get(Electron),
            container.get(Web)
        ];
    }
    platformChanged(platform) {
        this.design = platform.design;
    }
    start(config) {
        let found = this.availableHosts.find(x => x.isAvailable);
        if (found === undefined) {
            throw new Error('Could not determine host environment');
        }
        this.host = found;
        return this.host.start(config).then(platform => {
            this.platform = platform;
        });
    }
};
__decorate([
    observable
], AureliaXP.prototype, "platform", void 0);
__decorate([
    observable
], AureliaXP.prototype, "design", void 0);
AureliaXP = __decorate([
    inject(XpConfiguration, Container)
], AureliaXP);
