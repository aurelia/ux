define(["require", "exports", "tslib", "aurelia-dependency-injection", "../designs/ios-design"], function (require, exports, tslib_1, aurelia_dependency_injection_1, ios_design_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IOS = void 0;
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
});
//# sourceMappingURL=ios.js.map