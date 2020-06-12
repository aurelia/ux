"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UXConfiguration = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_loader_1 = require("aurelia-loader");
var global_style_engine_1 = require("./styles/global-style-engine");
require("./styles/normalize.css");
var UXConfiguration = /** @class */ (function () {
    function UXConfiguration() {
    }
    UXConfiguration.prototype.defaultConfiguration = function () {
        return this;
    };
    UXConfiguration = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(aurelia_loader_1.Loader, global_style_engine_1.GlobalStyleEngine)
    ], UXConfiguration);
    return UXConfiguration;
}());
exports.UXConfiguration = UXConfiguration;
//# sourceMappingURL=ux-configuration.js.map