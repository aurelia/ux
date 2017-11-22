import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';

@inject(ObserverLocator)
export class StyleController {
  public themes: UxTheme[] = [];

  constructor(public observerLocator: ObserverLocator) { }

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

    const styleElement = this.createStyleElement(theme);
    this.setWatches(theme, styleElement);

    DOM.appendNode(styleElement, window.document.head);

    this.themes[theme.themeKey as any] = theme;
  }

  public updateTheme(theme: UxTheme) {
    const baseTheme: UxTheme = { themeKey: 'base-theme' };
    const defaultTheme = this.themes[theme.themeKey as any];

    for (const key in theme) {
      if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
        defaultTheme[key] = theme[key];
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

  private createStyleElement(theme: UxTheme) {
    const styleElement = DOM.createElement('style') as HTMLStyleElement;

    styleElement.type = 'text/css';
    styleElement.innerHTML = this.processInnerHtml(theme);

    return styleElement;
  }

  private setWatches(theme: UxTheme, styleElement: HTMLStyleElement) {
    for (const key of this.getThemeKeys(theme)) {
      this.observerLocator.getObserver(theme, key).subscribe(() => {
        styleElement.innerHTML = this.processInnerHtml(theme);
      });
    }
  }

  private processInnerHtml(theme: UxTheme) {
    let designInnerHtml = ':root {\r\n';

    for (const key of this.getThemeKeys(theme)) {
      designInnerHtml += `  ${this.generateCssVariable(theme.themeKey, key, theme[key])}\r\n`;
    }

    designInnerHtml += '}';

    return designInnerHtml;
  }
}

function kebabCase(value: string) {
  value = value.charAt(0).toLowerCase() + value.slice(1);
  return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
