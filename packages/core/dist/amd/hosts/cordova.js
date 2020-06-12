define(["require", "exports", "tslib", "aurelia-dependency-injection", "aurelia-pal", "../platforms/ios", "../platforms/android"], function (require, exports, tslib_1, aurelia_dependency_injection_1, aurelia_pal_1, ios_1, android_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cordova = void 0;
    var Cordova = /** @class */ (function () {
        function Cordova(container) {
            this.container = container;
            this.type = 'cordova';
        }
        Object.defineProperty(Cordova.prototype, "isAvailable", {
            get: function () {
                return !!aurelia_pal_1.PLATFORM.global.cordova;
            },
            enumerable: false,
            configurable: true
        });
        Cordova.prototype.start = function () {
            var _this = this;
            return new Promise(function (resolve) {
                aurelia_pal_1.DOM.addEventListener('deviceready', function () {
                    switch (_this.getPlatformType()) {
                        case 'ios':
                            resolve(_this.container.get(ios_1.IOS));
                            break;
                        default:
                            resolve(_this.container.get(android_1.Android));
                            break;
                    }
                }, false);
            });
        };
        Cordova.prototype.getPlatformType = function () {
            var device = aurelia_pal_1.PLATFORM.global.device || { platform: 'android' };
            return device.platform.toLowerCase();
        };
        Cordova = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container)
        ], Cordova);
        return Cordova;
    }());
    exports.Cordova = Cordova;
});
//# sourceMappingURL=cordova.js.map