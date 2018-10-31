import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { Design } from '../designs/design';
import { swatches } from '../colors/swatches';
import { GlobalStyleEngine } from '../styles/global-style-engine';

@inject(ObserverLocator, GlobalStyleEngine)
export class DesignProcessor {
  constructor(private observerLocator: ObserverLocator, private globalStyleEngine: GlobalStyleEngine) { }

  public setSwatchVariables() {
    let swatchClasses = '';

    for (const swatch in swatches) {
      if (swatches.hasOwnProperty(swatch)) {
        if (typeof swatches[swatch] === 'string') {
          swatchClasses += `  --ux-swatch--${kebabCase(swatch)}: ${swatches[swatch]};\r\n`;
          continue;
        }

        for (const key in swatches[swatch]) {
          if (swatches[swatch].hasOwnProperty(key)) {
            swatchClasses += `  --ux-swatch--${kebabCase(swatch)}-${kebabCase(key)}: ${swatches[swatch][key]};\r\n`;
          }
        }
      }
    }

    this.globalStyleEngine.addOrUpdateGlobalStyle(
      `aurelia-ux swatches`,
      swatchClasses,
      ':root');
  }

  public setDesignVariables(design: Design) {
    this.globalStyleEngine.addOrUpdateGlobalStyle(
      `aurelia-ux design styles`,
      this.buildInnerHTML(design),
      ':root');
  }

  public setDesignWatches(design: Design) {
    for (const key in design) {
      if (design.hasOwnProperty(key)) {
        this.observerLocator.getObserver(design, key)
          .subscribe(() => {
            this.globalStyleEngine.addOrUpdateGlobalStyle(
              `aurelia-ux design styles`,
              this.buildInnerHTML(design),
              ':root');
          });
      }
    }
  }

  private buildInnerHTML(design: Design) {
    let designInnerHtml = '';

    for (const key in design) {
      if (design.hasOwnProperty(key)) {
        designInnerHtml += `  --aurelia-ux--design-${kebabCase(key)}: ${(design as any)[key]};\r\n`;
      }
    }

    return designInnerHtml;
  }
}

function kebabCase(value: string) {
  value = value.charAt(0).toLowerCase() + value.slice(1);
  return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
