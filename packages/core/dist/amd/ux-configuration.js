define(["require", "exports", "tslib", "aurelia-dependency-injection", "aurelia-loader", "./styles/global-style-engine", "./styles/normalize.css"], function (require, exports, tslib_1, aurelia_dependency_injection_1, aurelia_loader_1, global_style_engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UXConfiguration = void 0;
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
});
//# sourceMappingURL=ux-configuration.js.map