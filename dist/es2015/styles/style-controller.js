var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { ObserverLocator } from 'aurelia-binding';
let StyleController = class StyleController {
    constructor(observerLocator) {
        this.observerLocator = observerLocator;
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
    ensureBaseThemeCreated(theme) {
        let baseTheme = this.themes[theme.themeKey];
        if (baseTheme != null) {
            return;
        }
        baseTheme = theme;
        const styleElement = this.createStyleElement(theme);
        this.setWatches(theme, styleElement);
        DOM.appendNode(styleElement, window.document.head);
        this.themes[theme.themeKey] = theme;
    }
    updateTheme(theme) {
        const baseTheme = { themeKey: 'base-theme' };
        const defaultTheme = this.themes[theme.themeKey];
        for (const key in theme) {
            if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                defaultTheme[key] = theme[key];
            }
        }
    }
    getThemeKeys(theme) {
        const baseTheme = { themeKey: 'base-theme' };
        const themeKeys = [];
        for (const key in theme) {
            if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                themeKeys.push(key);
            }
        }
        return themeKeys;
    }
    generateCssVariableName(themeKey, propertyKey) {
        return `--ux-theme--${themeKey}-${kebabCase(propertyKey)}`;
    }
    generateCssVariable(themeKey, propertyKey, value) {
        return `--ux-theme--${themeKey}-${kebabCase(propertyKey)}: ${value};`;
    }
    createStyleElement(theme) {
        const styleElement = DOM.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = this.processInnerHtml(theme);
        return styleElement;
    }
    setWatches(theme, styleElement) {
        for (const key of this.getThemeKeys(theme)) {
            this.observerLocator.getObserver(theme, key).subscribe(() => {
                styleElement.innerHTML = this.processInnerHtml(theme);
            });
        }
    }
    processInnerHtml(theme) {
        let designInnerHtml = ':root {\r\n';
        for (const key of this.getThemeKeys(theme)) {
            designInnerHtml += `  ${this.generateCssVariable(theme.themeKey, key, theme[key])}\r\n`;
        }
        designInnerHtml += '}';
        return designInnerHtml;
    }
};
StyleController = __decorate([
    inject(ObserverLocator)
], StyleController);
export { StyleController };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
