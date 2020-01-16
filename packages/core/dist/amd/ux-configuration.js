var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-dependency-injection", "aurelia-logging", "aurelia-loader", "aurelia-pal", "./styles/global-style-engine"], function (require, exports, aurelia_dependency_injection_1, aurelia_logging_1, aurelia_loader_1, aurelia_pal_1, global_style_engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UXConfiguration = /** @class */ (function () {
        function UXConfiguration(loader, globalStyleEngine) {
            this.loader = loader;
            this.globalStyleEngine = globalStyleEngine;
            this.logger = aurelia_logging_1.getLogger('aurelia-ux');
        }
        UXConfiguration.prototype.defaultConfiguration = function () {
            this.cssNormalize();
            return this;
        };
        UXConfiguration.prototype.cssNormalize = function () {
            var _this = this;
            aurelia_pal_1.PLATFORM.moduleName('./styles/normalize.css');
            var fullCssPath = '@aurelia-ux/core/styles/normalize.css';
            this
                .loader
                .loadText(fullCssPath)
                .catch(function (err) {
                _this.logger.warn('Aurelia-UX Core failed to load normalize.css, some visual errors may appear.', err);
            })
                .then(function (text) {
                if (text) {
                    _this.globalStyleEngine.addOrUpdateGlobalStyle(fullCssPath, text);
                }
            });
            return this;
        };
        UXConfiguration = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_loader_1.Loader, global_style_engine_1.GlobalStyleEngine)
        ], UXConfiguration);
        return UXConfiguration;
    }());
    exports.UXConfiguration = UXConfiguration;
});
//# sourceMappingURL=ux-configuration.js.map