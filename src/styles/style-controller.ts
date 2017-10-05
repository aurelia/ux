import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';

@inject(ObserverLocator, )
export class StyleController {
  public styleElements: any = {};

  constructor(public observerLocator: ObserverLocator) { }

  /**
   * Checks to see if a base theme has been registered.
   * If no base theme is found, the theme is registered,
   * bindings are set up, and a new style element is added
   * with the processed theme to the document head.
   *
   * @param theme A theme derived from the UxTheme base class.
   */
  public EnsureBaseThemeCreated(theme: UxTheme) {
    let baseTheme = this.styleElements[theme.themeKey] as UxTheme | null;

    if (baseTheme != null) {
      return;
    }

    baseTheme = theme;

    const styleElement = this.createStyleElement(theme);
    this.setWatches(theme, styleElement);

    DOM.appendNode(styleElement, window.document.head);

    this.styleElements[theme.themeKey] = theme;
  }

  private createStyleElement(theme: UxTheme) {
    const styleElement = DOM.createElement('style') as HTMLStyleElement;

    styleElement.type = 'text/css';
    styleElement.innerHTML = this.processInnerHtml(theme);

    return styleElement;
  }

  private setWatches(theme: UxTheme, styleElement: HTMLStyleElement) {
    const baseTheme = new UxTheme();

    for (const key in theme) {
      if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
        this.observerLocator.getObserver(theme, key).subscribe(() => {
          styleElement.innerHTML = this.processInnerHtml(theme);
        });
      }
    }
  }

  private processInnerHtml(theme: UxTheme) {
    const baseTheme = new UxTheme();
    let designInnerHtml = ':root {\r\n';

    baseTheme.themeKey = 'theme-base';

    for (const key in theme) {
      if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
        designInnerHtml += `  --ux-theme--${theme.themeKey}-${kebabCase(key)}: ${theme[key]};\r\n`;
      }
    }

    designInnerHtml += '}';

    return designInnerHtml;
  }
}

function kebabCase(value: string) {
  value = value.charAt(0).toLowerCase() + value.slice(1);
  return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
