"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Android = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var material_design_1 = require("../designs/material-design");
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
//# sourceMappingURL=android.js.map