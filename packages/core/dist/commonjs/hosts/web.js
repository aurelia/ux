"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var material_design_1 = require("../designs/material-design");
var Web = /** @class */ (function () {
    function Web(design) {
        this.design = design;
        this.type = 'web';
        this.isAvailable = true;
    }
    Web.prototype.start = function () {
        var _this = this;
        return Promise.resolve().then(function () { return _this; });
    };
    Web = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(material_design_1.MaterialDesign)
    ], Web);
    return Web;
}());
exports.Web = Web;
//# sourceMappingURL=web.js.map