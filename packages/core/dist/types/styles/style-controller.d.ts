import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';
import { GlobalStyleEngine } from './global-style-engine';
export declare class StyleController {
    observerLocator: ObserverLocator;
    private globalStyleEngine;
    themes: UxTheme[];
    constructor(observerLocator: ObserverLocator, globalStyleEngine: GlobalStyleEngine);
    updateTheme(theme: UxTheme, element?: HTMLElement): void;
    getThemeKeys(theme: UxTheme): string[];
    generateCssVariableName(themeKey: string, propertyKey: string): string;
    generateCssVariable(themeKey: string, propertyKey: string, value: string | number): string;
    private setWatches(theme);
    private removeWatches(theme);
    private themePropertyChanged(theme);
    private processInnerHtml(theme);
}
