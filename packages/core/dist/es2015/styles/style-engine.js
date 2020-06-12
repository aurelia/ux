import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
let StyleEngine = /** @class */ (() => {
    let StyleEngine = class StyleEngine {
        constructor(styleController) {
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
        applyTheme(theme, element) {
            if (theme == null || theme.themeKey == null) {
                return;
            }
            this.styleController.updateTheme(theme, element);
        }
        /**
         * Applies an array of themes. This is to enable the creation of
         * large theme sets that can be easily applied with one call.
         *
         * @param themes Array of UxThemes to be applied.
         */
        applyThemeGroup(themes) {
            for (const theme of themes) {
                this.applyTheme(theme);
            }
        }
        /**
         * Retrieves the default theme object for the provided key that can then be updated.
         *
         * @param key Key of the theme to be retrieved.
         */
        getDefaultTheme(key) {
            return this.styleController.themes[key];
        }
    };
    StyleEngine = __decorate([
        inject(StyleController)
    ], StyleEngine);
    return StyleEngine;
})();
export { StyleEngine };
//# sourceMappingURL=style-engine.js.map