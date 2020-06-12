define(["require", "exports", "tslib", "aurelia-dependency-injection", "../designs/material-design", "./web", "aurelia-pal"], function (require, exports, tslib_1, aurelia_dependency_injection_1, material_design_1, web_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Electron = void 0;
    var Electron = /** @class */ (function () {
        function Electron() {
            this.type = 'electron';
        }
        Object.defineProperty(Electron.prototype, "isAvailable", {
            get: function () {
                var p = aurelia_pal_1.PLATFORM.global.process;
                return p && p.versions && p.versions.electron;
            },
            enumerable: false,
            configurable: true
        });
        Electron.prototype.start = function (config) {
            return Promise.resolve().then(function () { return config.container.get(web_1.Web); });
        };
        Electron = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(material_design_1.MaterialDesign)
        ], Electron);
        return Electron;
    }());
    exports.Electron = Electron;
});
//# sourceMappingURL=electron.js.map