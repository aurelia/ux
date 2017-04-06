var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM, PLATFORM } from 'aurelia-pal';
import { IOS } from '../platforms/ios';
import { Android } from '../platforms/android';
var Cordova = (function () {
    function Cordova(container) {
        this.container = container;
        this.type = 'cordova';
    }
    Object.defineProperty(Cordova.prototype, "isAvailable", {
        get: function () {
            return !!PLATFORM.global.cordova;
        },
        enumerable: true,
        configurable: true
    });
    Cordova.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve) {
            DOM.addEventListener('deviceready', function () {
                switch (_this.getPlatformType()) {
                    case 'ios':
                        resolve(_this.container.get(IOS));
                        break;
                    default:
                        resolve(_this.container.get(Android));
                        break;
                }
            }, false);
        });
    };
    Cordova.prototype.getPlatformType = function () {
        var device = PLATFORM.global.device || { platform: 'android' };
        return device.platform.toLowerCase();
    };
    return Cordova;
}());
Cordova = __decorate([
    inject(Container)
], Cordova);
export { Cordova };
