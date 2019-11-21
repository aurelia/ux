import { StyleController } from './style-controller';
import { UxTheme } from './ux-theme';
export declare class StyleEngine {
    private styleController;
    constructor(styleController: StyleController);
    /**
     * Processes a UxTheme into the corresponding CSS Variables
     * and applies them to the provided element. If no theme is
     * provided then the theme will be setup as a default theme
     * and set CSS Variables in the document head.
     *
     * @param element Element to apply the processed UxTheme to.
     * @param theme UxTheme to process.
     */
    applyTheme(theme: UxTheme, element?: HTMLElement): void;
    /**
     * Applies an array of themes. This is to enable the creation of
     * large theme sets that can be easily applied with one call.
     *
     * @param themes Array of UxThemes to be applied.
     */
    applyThemeGroup(themes: UxTheme[]): void;
    /**
     * Retrieves the default theme object for the provided key that can then be updated.
     *
     * @param key Key of the theme to be retrieved.
     */
    getDefaultTheme(key: string): UxTheme;
}
