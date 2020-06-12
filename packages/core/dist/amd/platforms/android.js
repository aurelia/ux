define(["require", "exports", "tslib", "aurelia-dependency-injection", "../designs/material-design"], function (require, exports, tslib_1, aurelia_dependency_injection_1, material_design_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Android = void 0;
    var Android = /** @class */ (function () {
        function Android(design) {
            this.design = design;
            this.type = 'android';
        }
        Android = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(material_design_1.MaterialDesign)
        ], Android);
        return Android;
    }());
    exports.Android = Android;
});
//# sourceMappingURL=android.js.map