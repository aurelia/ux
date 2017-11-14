import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';
export declare class StyleController {
    observerLocator: ObserverLocator;
    themes: UxTheme[];
    constructor(observerLocator: ObserverLocator);
    /**
     * Checks to see if a base theme has been registered.
     * If no base theme is found, the theme is registered,
     * bindings are set up, and a new style element is added
     * with the processed theme to the document head.
     *
     * @param theme A theme derived from the UxTheme base class.
     */
    ensureBaseThemeCreated(theme: UxTheme): void;
    updateTheme(theme: UxTheme): void;
    getThemeKeys(theme: UxTheme): string[];
    generateCssVariableName(themeKey: string, propertyKey: string): string;
    generateCssVariable(themeKey: string, propertyKey: string, value: string | number): string;
    private createStyleElement(theme);
    private setWatches(theme, styleElement);
    private processInnerHtml(theme);
}
