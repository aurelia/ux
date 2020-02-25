var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { GlobalStyleEngine } from './global-style-engine';
import { AureliaUX } from '../aurelia-ux';
let StyleController = class StyleController {
    constructor(observerLocator, globalStyleEngine, ux) {
        this.observerLocator = observerLocator;
        this.globalStyleEngine = globalStyleEngine;
        this.ux = ux;
        this.themes = [];
    }
    updateTheme(theme, element) {
        const baseTheme = { themeKey: 'base-theme' };
        if (theme.themeKey == null) {
            throw new Error('Provided theme has no themeKey property.');
        }
        if (theme.themeKey === 'design') {
            for (const key in theme) {
                if (key !== 'themeKey') {
                    this.ux.design[key] = theme[key];
                }
            }
        }
        else if (element != null) {
            for (const key in theme) {
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
            const uxTheme = this.themes.splice(this.themes.indexOf(this.themes[theme.themeKey]))[0];
            if (uxTheme != null) {
                this.removeWatches(uxTheme);
            }
            this.globalStyleEngine.addOrUpdateGlobalStyle(`aurelia-ux theme ${theme.themeKey}`, this.processInnerHtml(theme), ':root');
            this.setWatches(theme);
            this.themes[theme.themeKey] = theme;
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
        return `--aurelia-ux--${themeKey}-${kebabCase(propertyKey)}`;
    }
    generateCssVariable(themeKey, propertyKey, value) {
        if (value === undefined || value === 'undefined') {
            return '';
        }
        return `--aurelia-ux--${themeKey}-${kebabCase(propertyKey)}: ${value};`;
    }
    setWatches(theme) {
        for (const key of this.getThemeKeys(theme)) {
            this.observerLocator.getObserver(theme, key).subscribe(() => this.themePropertyChanged(theme));
        }
    }
    removeWatches(theme) {
        for (const key of this.getThemeKeys(theme)) {
            this.observerLocator.getObserver(theme, key).unsubscribe(() => this.themePropertyChanged(theme));
        }
    }
    themePropertyChanged(theme) {
        this.globalStyleEngine.addOrUpdateGlobalStyle(`aurelia-ux theme ${theme.themeKey}`, this.processInnerHtml(theme), ':root');
    }
    processInnerHtml(theme) {
        let designInnerHtml = '';
        for (const key of this.getThemeKeys(theme)) {
            if (theme[key]) {
                designInnerHtml += `  ${this.generateCssVariable(theme.themeKey, key, theme[key])}\r\n`;
            }
        }
        return designInnerHtml;
    }
};
StyleController = __decorate([
    inject(ObserverLocator, GlobalStyleEngine, AureliaUX)
], StyleController);
export { StyleController };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
//# sourceMappingURL=style-controller.js.map