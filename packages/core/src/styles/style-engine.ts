import { inject } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { UxTheme } from './ux-theme';

@inject(StyleController)
export class StyleEngine {
  constructor(public styleController: StyleController) { }

  /**
   * Processes a UxTheme into the corresponding CSS Variables
   * and applies them to the provided element. If no theme is
   * provided then the theme will be setup as a default theme
   * and set CSS Variables in the document head.
   *
   * @param element Element to apply the processed UxTheme to.
   * @param theme UxTheme to process.
   */
  public applyTheme(theme: UxTheme, element?: HTMLElement) {
    if (theme == null) {
      return;
    }

    if (element != null) {
      this.styleController.updateTheme(theme, element);
    } else {
      this.styleController.updateTheme(theme);
    }
  }

  /**
   * Applies an array of themes. This is to enable the creation of
   * large theme sets that can be easily applied with one call.
   *
   * @param themes Array of UxThemes to be applied.
   */
  public applyThemeGroup(themes: UxTheme[]) {
    for (const theme of themes) {
      this.applyTheme(theme);
    }
  }

  /**
   * Checks to see if a base theme has been registered.
   * If no base theme is found, the theme is registered,
   * bindings are set up, and a new style element is added
   * with the processed theme to the document head.
   *
   * @param theme A theme derived from the UxTheme base class.
   */
  public ensureDefaultTheme(theme: UxTheme) {
    this.styleController.ensureBaseThemeCreated(theme);
  }

  /**
   * Retrieves the default theme object for the provided key that can then be updated.
   *
   * @param key Key of the theme to be retrieved.
   */
  public getDefaultTheme(key: string) {
    return this.styleController.themes[key as any];
  }
}
