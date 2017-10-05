import { inject } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { UxTheme } from './ux-theme';

@inject(StyleController)
export class StyleEngine {

  constructor(public styleController: StyleController) { }

  /**
   * Processes a UxTheme into the corresponding CSS Variables
   * and applies them to the provided element.
   *
   * @param element Element to apply the processed UxTheme to.
   * @param theme UxTheme to process.
   */
  public applyTheme(element: HTMLElement, theme: UxTheme) {
    if (UxTheme == null) {
      return;
    }

    const baseTheme = new UxTheme();

    baseTheme.themeKey = 'theme-base';

    for (const key in theme) {

      if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
        if (theme[key] != null) {
          element.style.setProperty(`--ux-theme--${theme.themeKey}-${kebabCase(key)}`, theme[key]);
        }
      }
    }
  }

  public ensureDefaultTheme(theme: UxTheme) {
    this.styleController.EnsureBaseThemeCreated(theme);
  }
}

function kebabCase(value: string) {
  value = value.charAt(0).toLowerCase() + value.slice(1);
  return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
