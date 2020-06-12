define(["require", "exports", "tslib", "aurelia-dependency-injection", "../designs/material-design"], function (require, exports, tslib_1, aurelia_dependency_injection_1, material_design_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Web = void 0;
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
});
//# sourceMappingURL=web.js.map