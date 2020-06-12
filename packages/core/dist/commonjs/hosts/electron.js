"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Electron = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var material_design_1 = require("../designs/material-design");
var web_1 = require("./web");
var aurelia_pal_1 = require("aurelia-pal");
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
//# sourceMappingURL=electron.js.map