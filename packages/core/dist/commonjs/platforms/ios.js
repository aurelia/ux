"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOS = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var ios_design_1 = require("../designs/ios-design");
var IOS = /** @class */ (function () {
    function IOS(design) {
        this.design = design;
        this.type = 'ios';
    }
    IOS = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(ios_design_1.IOSDesign)
    ], IOS);
    return IOS;
}());
exports.IOS = IOS;
//# sourceMappingURL=ios.js.map