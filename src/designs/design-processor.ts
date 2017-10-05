import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { Design } from '../designs/design';
import { swatches } from '../colors/swatches';

@inject(ObserverLocator)
export class DesignProcessor {
  private designStyleElement: HTMLStyleElement;

  constructor(private observerLocator: ObserverLocator) { }

  public setSwatchVariables() {
    let swatchClasses = `:root {\r\n`;

    for (const swatch in swatches) {
      if (swatches.hasOwnProperty(swatch)) {
        if (typeof swatches[swatch] === 'string') {
          swatchClasses += `  --swatch-${kebabCase(swatch)}: ${swatches[swatch]};\r\n`;
          continue;
        }

        for (const key in swatches[swatch]) {
          if (swatches[swatch].hasOwnProperty(key)) {
            swatchClasses += `  --swatch-${kebabCase(swatch)}-${kebabCase(key)}: ${swatches[swatch][key]};\r\n`;
          }
        }
      }
    }

    swatchClasses += '}';
    DOM.injectStyles(swatchClasses);
  }

  public setDesignVariables(design: Design) {
    this.designStyleElement = DOM.createElement('style') as HTMLStyleElement;

    this.designStyleElement.type = 'text/css';

    this.designStyleElement.innerHTML = this.buildInnerHTML(design);

    DOM.appendNode(this.designStyleElement, window.document.head);
  }

  public setDesignWatches(design: Design) {
    for (const key in design) {
      if (design.hasOwnProperty(key)) {
        this.observerLocator.getObserver(design, key)
          .subscribe(() => {
            this.designStyleElement.innerHTML = this.buildInnerHTML(design);
          });
      }
    }
  }

  private buildInnerHTML(design: Design) {
    let designInnerHtml = ':root {\r\n';

    for (const key in design) {
      if (design.hasOwnProperty(key)) {
        designInnerHtml += `  --design-${kebabCase(key)}: ${design[key]};\r\n`;
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
