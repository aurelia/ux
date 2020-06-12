import { __decorate } from "tslib";
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM, PLATFORM } from 'aurelia-pal';
import { IOS } from '../platforms/ios';
import { Android } from '../platforms/android';
let Cordova = /** @class */ (() => {
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
    return Cordova;
})();
export { Cordova };
//# sourceMappingURL=cordova.js.map