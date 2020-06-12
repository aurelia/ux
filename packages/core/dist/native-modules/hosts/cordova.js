import { __decorate } from "tslib";
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM, PLATFORM } from 'aurelia-pal';
import { IOS } from '../platforms/ios';
import { Android } from '../platforms/android';
var Cordova = /** @class */ (function () {
    function Cordova(container) {
        this.container = container;
        this.type = 'cordova';
    }
    Object.defineProperty(Cordova.prototype, "isAvailable", {
        get: function () {
            return !!PLATFORM.global.cordova;
        },
        enumerable: false,
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
    Cordova = __decorate([
        inject(Container)
    ], Cordova);
    return Cordova;
}());
export { Cordova };
//# sourceMappingURL=cordova.js.map