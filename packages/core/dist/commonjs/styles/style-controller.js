"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_binding_1 = require("aurelia-binding");
var global_style_engine_1 = require("./global-style-engine");
var StyleController = /** @class */ (function () {
    function StyleController(observerLocator, globalStyleEngine) {
        this.observerLocator = observerLocator;
        this.globalStyleEngine = globalStyleEngine;
        this.themes = [];
    }
    /**
     * Checks to see if a base theme has been registered.
     * If no base theme is found, the theme is registered,
     * bindings are set up, and a new style element is added
     * with the processed theme to the document head.
     *
     * @param theme A theme derived from the UxTheme base class.
     */
    StyleController.prototype.ensureBaseThemeCreated = function (theme) {
        var baseTheme = this.themes[theme.themeKey];
        if (baseTheme != null) {
            return;
        }
        baseTheme = theme;
        this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, this.processInnerHtml(theme), ':root');
        this.setWatches(theme);
        this.themes[theme.themeKey] = theme;
    };
    StyleController.prototype.updateTheme = function (theme, element) {
        var baseTheme = { themeKey: 'base-theme' };
        var defaultTheme = this.themes[theme.themeKey];
        if (defaultTheme == null) {
            this.ensureBaseThemeCreated(theme);
        }
        for (var key in theme) {
            if (element == null) {
                if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                    defaultTheme[key] = theme[key];
                }
            }
            else {
                element.style.setProperty(this.generateCssVariableName(theme.themeKey, key), theme[key]);
            }
        }
    };
    StyleController.prototype.getThemeKeys = function (theme) {
        var baseTheme = { themeKey: 'base-theme' };
        var themeKeys = [];
        for (var key in theme) {
            if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                themeKeys.push(key);
            }
        }
        return themeKeys;
    };
    StyleController.prototype.generateCssVariableName = function (themeKey, propertyKey) {
        return "--ux-theme--" + themeKey + "-" + kebabCase(propertyKey);
    };
    StyleController.prototype.generateCssVariable = function (themeKey, propertyKey, value) {
        return "--ux-theme--" + themeKey + "-" + kebabCase(propertyKey) + ": " + value + ";";
    };
    StyleController.prototype.setWatches = function (theme) {
        var _this = this;
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            this.observerLocator.getObserver(theme, key).subscribe(function () {
                _this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, _this.processInnerHtml(theme), ':root');
            });
        }
    };
    StyleController.prototype.processInnerHtml = function (theme) {
        var designInnerHtml = '';
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            designInnerHtml += "  " + this.generateCssVariable(theme.themeKey, key, theme[key]) + "\r\n";
        }
        return designInnerHtml;
    };
    StyleController = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_binding_1.ObserverLocator, global_style_engine_1.GlobalStyleEngine)
    ], StyleController);
    return StyleController;
}());
exports.StyleController = StyleController;
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}
