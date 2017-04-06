var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
import { Web } from './web';
import { PLATFORM } from 'aurelia-pal';
var Electron = (function () {
    function Electron() {
        this.type = 'electron';
    }
    Object.defineProperty(Electron.prototype, "isAvailable", {
        get: function () {
            var p = PLATFORM.global.process;
            return p && p.versions && p.versions.electron;
        },
        enumerable: true,
        configurable: true
    });
    Electron.prototype.start = function (config) {
        return Promise.resolve().then(function () { return config.container.get(Web); });
    };
    return Electron;
}());
Electron = __decorate([
    inject(MaterialDesign)
], Electron);
export { Electron };
