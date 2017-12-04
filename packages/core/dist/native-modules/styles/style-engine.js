var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
var StyleEngine = /** @class */ (function () {
    function StyleEngine(styleController) {
        this.styleController = styleController;
    }
    /**
     * Processes a UxTheme into the corresponding CSS Variables
     * and applies them to the provided element. If no theme is
     * provided then the theme will be setup as a default theme
     * and set CSS Variables in the document head.
     *
     * @param element Element to apply the processed UxTheme to.
     * @param theme UxTheme to process.
     */
    StyleEngine.prototype.applyTheme = function (theme, element) {
        if (theme == null) {
            return;
        }
        if (element != null) {
            this.styleController.updateTheme(theme, element);
        }
        else {
            this.styleController.updateTheme(theme);
        }
    };
    /**
     * Applies an array of themes. This is to enable the creation of
     * large theme sets that can be easily applied with one call.
     *
     * @param themes Array of UxThemes to be applied.
     */
    StyleEngine.prototype.applyThemeGroup = function (themes) {
        for (var _i = 0, themes_1 = themes; _i < themes_1.length; _i++) {
            var theme = themes_1[_i];
            this.applyTheme(theme);
        }
    };
    /**
     * Checks to see if a base theme has been registered.
     * If no base theme is found, the theme is registered,
     * bindings are set up, and a new style element is added
     * with the processed theme to the document head.
     *
     * @param theme A theme derived from the UxTheme base class.
     */
    StyleEngine.prototype.ensureDefaultTheme = function (theme) {
        this.styleController.ensureBaseThemeCreated(theme);
    };
    /**
     * Retrieves the default theme object for the provided key that can then be updated.
     *
     * @param key Key of the theme to be retrieved.
     */
    StyleEngine.prototype.getDefaultTheme = function (key) {
        return this.styleController.themes[key];
    };
    StyleEngine = __decorate([
        inject(StyleController)
    ], StyleEngine);
    return StyleEngine;
}());
export { StyleEngine };
