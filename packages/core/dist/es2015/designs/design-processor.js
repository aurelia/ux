import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { swatches } from '../colors/swatches';
import { GlobalStyleEngine } from '../styles/global-style-engine';
let DesignProcessor = /** @class */ (() => {
    let DesignProcessor = class DesignProcessor {
        constructor(observerLocator, globalStyleEngine) {
            this.observerLocator = observerLocator;
            this.globalStyleEngine = globalStyleEngine;
        }
        setSwatchVariables() {
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
            this.globalStyleEngine.addOrUpdateGlobalStyle(`aurelia-ux swatches`, swatchClasses, ':root');
        }
        setDesignVariables(design) {
            this.globalStyleEngine.addOrUpdateGlobalStyle(`aurelia-ux design styles`, this.buildInnerHTML(design), ':root');
        }
        setDesignWatches(design) {
            for (const key in design) {
                if (design.hasOwnProperty(key)) {
                    this.observerLocator.getObserver(design, key)
                        .subscribe(() => {
                        this.globalStyleEngine.addOrUpdateGlobalStyle(`aurelia-ux design styles`, this.buildInnerHTML(design), ':root');
                    });
                }
            }
        }
        buildInnerHTML(design) {
            let designInnerHtml = '';
            for (const key in design) {
                if (design.hasOwnProperty(key) && typeof design[key] === 'string' && design[key] !== '') {
                    designInnerHtml += `  --aurelia-ux--design-${kebabCase(key)}: ${design[key]};\r\n`;
                }
            }
            return designInnerHtml;
        }
    };
    DesignProcessor = __decorate([
        inject(ObserverLocator, GlobalStyleEngine)
    ], DesignProcessor);
    return DesignProcessor;
})();
export { DesignProcessor };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`);
}
//# sourceMappingURL=design-processor.js.map