import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { UxTheme } from './ux-theme';
import { GlobalStyleEngine } from './global-style-engine';
import { AureliaUX } from '../aurelia-ux';

@inject(ObserverLocator, GlobalStyleEngine, AureliaUX)
export class StyleController {
  public themes: UxTheme[] = [];

  constructor(
    private observerLocator: ObserverLocator,
    private globalStyleEngine: GlobalStyleEngine,
    private ux: AureliaUX) { }

  public updateTheme(theme: UxTheme, element?: HTMLElement) {
    const baseTheme: UxTheme = { themeKey: 'base-theme' };

    if (theme.themeKey == null) {
      throw new Error('Provided theme has no themeKey property.');
    }

    if (theme.themeKey === 'design') {
      for (const key in theme) {
        if (key !== 'themeKey') {
          (this.ux.design as any)[key] = (theme as any)[key];
        }
      }
    } else if (element != null) {
      for (const key in theme) {
        if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
          element.style.setProperty(this.generateCssVariableName(theme.themeKey, key), (theme as any)[key]);
        }
      }
    } else {
      const uxTheme: any = this.themes.splice(this.themes.indexOf(this.themes[theme.themeKey as any]))[0];

      if (uxTheme != null) {
        this.removeWatches(uxTheme);
      }

      this.globalStyleEngine.addOrUpdateGlobalStyle(
        `aurelia-ux theme ${theme.themeKey}`,
        this.processInnerHtml(theme),
        ':root');

      this.setWatches(theme);

      this.themes[theme.themeKey as any] = theme;
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
    return `--aurelia-ux--${themeKey}-${kebabCase(propertyKey)}`;
  }

  public generateCssVariable(themeKey: string, propertyKey: string, value: string | number) {
    return `--aurelia-ux--${themeKey}-${kebabCase(propertyKey)}: ${value};`;
  }

  private setWatches(theme: UxTheme) {
    for (const key of this.getThemeKeys(theme)) {
      this.observerLocator.getObserver(theme, key).subscribe(() => this.themePropertyChanged(theme));
    }
  }

  private removeWatches(theme: UxTheme) {
    for (const key of this.getThemeKeys(theme)) {
      this.observerLocator.getObserver(theme, key).unsubscribe(() => this.themePropertyChanged(theme));
    }
  }

  private themePropertyChanged(theme: UxTheme) {
    this.globalStyleEngine.addOrUpdateGlobalStyle(
      `aurelia-ux theme ${theme.themeKey}`,
      this.processInnerHtml(theme),
      ':root');
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
