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
let Cordova = class Cordova {
    constructor(container) {
        this.container = container;
        this.type = 'cordova';
    }
    get isAvailable() {
        return !!PLATFORM.global.cordova;
    }
    start() {
        return new Promise((resolve) => {
            DOM.addEventListener('deviceready', () => {
                switch (this.getPlatformType()) {
                    case 'ios':
                        resolve(this.container.get(IOS));
                        break;
                    default:
                        resolve(this.container.get(Android));
                        break;
                }
            }, false);
        });
    }
    getPlatformType() {
        const device = PLATFORM.global.device || { platform: 'android' };
        return device.platform.toLowerCase();
    }
};
Cordova = __decorate([
    inject(Container)
], Cordova);
export { Cordova };
