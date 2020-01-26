"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_pal_1 = require("aurelia-pal");
var ios_1 = require("../platforms/ios");
var android_1 = require("../platforms/android");
var Cordova = /** @class */ (function () {
    function Cordova(container) {
        this.container = container;
        this.type = 'cordova';
    }
    Object.defineProperty(Cordova.prototype, "isAvailable", {
        get: function () {
            return !!aurelia_pal_1.PLATFORM.global.cordova;
        },
        enumerable: true,
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
    Cordova = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container)
    ], Cordova);
    return Cordova;
}());
exports.Cordova = Cordova;
//# sourceMappingURL=cordova.js.map