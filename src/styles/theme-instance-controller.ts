import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { StyleController } from './style-controller';
import { UxTheme } from './ux-theme';

@inject(ObserverLocator, StyleController)
export class ThemeInstanceController {
  private registeredThemes: UxThemeInstance[] = [];

  constructor(
    private observerLocator: ObserverLocator,
    private styleController: StyleController) {}

  public registerThemedElement(theme: UxTheme, element: HTMLElement) {
    let themeInstance: UxThemeInstance | null = null;

    for (const instance of this.registeredThemes) {
      if (instance.theme === theme) {
        themeInstance = instance;
      }

      if (instance.theme !== theme && instance.elements.indexOf(element) > -1) {
        instance.elements.splice(
          instance.elements.indexOf(element)
        );
      }
    }

    if (themeInstance == null) {
      themeInstance = new UxThemeInstance(theme);
      this.setWatches(themeInstance);
    }

    if (themeInstance.elements.indexOf(element) === -1) {
      themeInstance.elements.push(element);
    }
  }

  private setWatches(instance: UxThemeInstance) {
    for (const key of this.styleController.getThemeKeys(instance.theme)) {
      this.observerLocator.getObserver(instance.theme, key).subscribe((newValue: string) => {
        for (const element of instance.elements) {
          if (element.parentElement != null) {
          element.style.setProperty(
            this.styleController.generateCssVariableName(instance.theme.themeKey, key),
            newValue);
          } else {
            instance.elements.splice(
              instance.elements.indexOf(element)
            );
          }
        }
      });
    }
  }
}

export class UxThemeInstance {
  public elements: HTMLElement[];

  constructor(public theme: UxTheme) { }
}
