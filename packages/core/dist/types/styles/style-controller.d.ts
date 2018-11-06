import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';
import { GlobalStyleEngine } from './global-style-engine';
import { AureliaUX } from '../aurelia-ux';
export declare class StyleController {
    private observerLocator;
    private globalStyleEngine;
    private ux;
    themes: UxTheme[];
    constructor(observerLocator: ObserverLocator, globalStyleEngine: GlobalStyleEngine, ux: AureliaUX);
    updateTheme(theme: UxTheme, element?: HTMLElement): void;
    getThemeKeys(theme: UxTheme): string[];
    generateCssVariableName(themeKey: string, propertyKey: string): string;
    generateCssVariable(themeKey: string, propertyKey: string, value: string | number): string;
    private setWatches;
    private removeWatches;
    private themePropertyChanged;
    private processInnerHtml;
}
