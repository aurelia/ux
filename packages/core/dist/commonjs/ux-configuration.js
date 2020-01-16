"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_loader_1 = require("aurelia-loader");
var aurelia_pal_1 = require("aurelia-pal");
var global_style_engine_1 = require("./styles/global-style-engine");
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
//# sourceMappingURL=ux-configuration.js.map