import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';
import { GlobalStyleEngine } from './global-style-engine';

@inject(ObserverLocator, GlobalStyleEngine)
export class StyleController {
  public themes: UxTheme[] = [];

  constructor(public observerLocator: ObserverLocator, private globalStyleEngine: GlobalStyleEngine) { }

  /**
   * Checks to see if a base theme has been registered.
   * If no base theme is found, the theme is registered,
   * bindings are set up, and a new style element is added
   * with the processed theme to the document head.
   *
   * @param theme A theme derived from the UxTheme base class.
   */
  public ensureBaseThemeCreated(theme: UxTheme) {
    let baseTheme = this.themes[theme.themeKey as any] as UxTheme | null;

    if (baseTheme != null) {
      return;
    }

    baseTheme = theme;

    this.globalStyleEngine.addOrUpdateGlobalStyle(
      `aurelia-ux theme ${theme.themeKey}`,
      this.processInnerHtml(theme),
      ':root');
    this.setWatches(theme);

    this.themes[theme.themeKey as any] = theme;
  }

  public updateTheme(theme: UxTheme, element?: HTMLElement) {
    const baseTheme: UxTheme = { themeKey: 'base-theme' };
    let defaultTheme: any = this.themes[theme.themeKey as any];

    if (defaultTheme == null) {
      this.ensureBaseThemeCreated(theme);
    }

    defaultTheme = this.themes[theme.themeKey as any];

    if (defaultTheme == null) {
      return;
    }

    for (const key in theme) {
      if (element == null) {
        if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
          defaultTheme[key] = (theme as any)[key];
        }
      } else {
        element.style.setProperty(this.generateCssVariableName(theme.themeKey, key), (theme as any)[key]);
      }
    }
  }

  public getThemeKeys(theme: UxTheme): string[] {
    const baseTheme: UxTheme = { themeKey: 'base-theme' };
    const themeKeys: string[] = [];

    for (const key in theme) {
      if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
        themeKeys.push(key);
      }
    }

    return themeKeys;
  }

  public generateCssVariableName(themeKey: string, propertyKey: string) {
    return `--ux-theme--${themeKey}-${kebabCase(propertyKey)}`;
  }

  public generateCssVariable(themeKey: string, propertyKey: string, value: string | number) {
    return `--ux-theme--${themeKey}-${kebabCase(propertyKey)}: ${value};`;
  }

  private setWatches(theme: UxTheme) {
    for (const key of this.getThemeKeys(theme)) {
      this.observerLocator.getObserver(theme, key).subscribe(() => {
        this.globalStyleEngine.addOrUpdateGlobalStyle(
          `aurelia-ux theme ${theme.themeKey}`,
          this.processInnerHtml(theme),
          ':root');
      });
    }
  }

  private processInnerHtml(theme: UxTheme) {
    let designInnerHtml = '';

    for (const key of this.getThemeKeys(theme)) {
      designInnerHtml += `  ${this.generateCssVariable(theme.themeKey, key, (theme as any)[key])}\r\n`;
    }

    return designInnerHtml;
  }
}

function kebabCase(value: string) {
  value = value.charAt(0).toLowerCase() + value.slice(1);
  return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
