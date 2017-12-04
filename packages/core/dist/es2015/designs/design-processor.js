var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { swatches } from '../colors/swatches';
let DesignProcessor = class DesignProcessor {
    constructor(observerLocator) {
        this.observerLocator = observerLocator;
    }
    setSwatchVariables() {
        let swatchClasses = `:root {\r\n`;
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
        swatchClasses += '}';
        DOM.injectStyles(swatchClasses);
    }
    setDesignVariables(design) {
        this.designStyleElement = DOM.createElement('style');
        this.designStyleElement.type = 'text/css';
        this.designStyleElement.innerHTML = this.buildInnerHTML(design);
        DOM.appendNode(this.designStyleElement, window.document.head);
    }
    setDesignWatches(design) {
        for (const key in design) {
            if (design.hasOwnProperty(key)) {
                this.observerLocator.getObserver(design, key)
                    .subscribe(() => {
                    this.designStyleElement.innerHTML = this.buildInnerHTML(design);
                });
            }
        }
    }
    buildInnerHTML(design) {
        let designInnerHtml = ':root {\r\n';
        for (const key in design) {
            if (design.hasOwnProperty(key)) {
                designInnerHtml += `  --ux-design--${kebabCase(key)}: ${design[key]};\r\n`;
            }
        }
        designInnerHtml += '}';
        return designInnerHtml;
    }
};
DesignProcessor = __decorate([
    inject(ObserverLocator)
], DesignProcessor);
export { DesignProcessor };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
