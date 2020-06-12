import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { GlobalStyleEngine } from './global-style-engine';
import { AureliaUX } from '../aurelia-ux';
var StyleController = /** @class */ (function () {
    function StyleController(observerLocator, globalStyleEngine, ux) {
        this.observerLocator = observerLocator;
        this.globalStyleEngine = globalStyleEngine;
        this.ux = ux;
        this.themes = [];
    }
    StyleController.prototype.updateTheme = function (theme, element) {
        var baseTheme = { themeKey: 'base-theme' };
        if (theme.themeKey == null) {
            throw new Error('Provided theme has no themeKey property.');
        }
        if (theme.themeKey === 'design') {
            for (var key in theme) {
                if (key !== 'themeKey') {
                    this.ux.design[key] = theme[key];
                }
            }
        }
        else if (element != null) {
            for (var key in theme) {
                if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                    if (theme[key]) {
                        element.style.setProperty(this.generateCssVariableName(theme.themeKey, key), theme[key]);
                    }
                    else {
                        element.style.removeProperty(this.generateCssVariableName(theme.themeKey, key));
                    }
                }
            }
        }
        else {
            var uxTheme = this.themes.splice(this.themes.indexOf(this.themes[theme.themeKey]))[0];
            if (uxTheme != null) {
                this.removeWatches(uxTheme);
            }
            this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, this.processInnerHtml(theme), ':root');
            this.setWatches(theme);
            this.themes[theme.themeKey] = theme;
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
        return "--aurelia-ux--" + themeKey + "-" + kebabCase(propertyKey);
    };
    StyleController.prototype.generateCssVariable = function (themeKey, propertyKey, value) {
        if (value === undefined || value === 'undefined') {
            return '';
        }
        return "--aurelia-ux--" + themeKey + "-" + kebabCase(propertyKey) + ": " + value + ";";
    };
    StyleController.prototype.setWatches = function (theme) {
        var _this = this;
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            this.observerLocator.getObserver(theme, key).subscribe(function () { return _this.themePropertyChanged(theme); });
        }
    };
    StyleController.prototype.removeWatches = function (theme) {
        var _this = this;
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            this.observerLocator.getObserver(theme, key).unsubscribe(function () { return _this.themePropertyChanged(theme); });
        }
    };
    StyleController.prototype.themePropertyChanged = function (theme) {
        this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, this.processInnerHtml(theme), ':root');
    };
    StyleController.prototype.processInnerHtml = function (theme) {
        var designInnerHtml = '';
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            if (theme[key]) {
                designInnerHtml += "  " + this.generateCssVariable(theme.themeKey, key, theme[key]) + "\r\n";
            }
        }
        return designInnerHtml;
    };
    StyleController = __decorate([
        inject(ObserverLocator, GlobalStyleEngine, AureliaUX)
    ], StyleController);
    return StyleController;
}());
export { StyleController };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}
//# sourceMappingURL=style-controller.js.map