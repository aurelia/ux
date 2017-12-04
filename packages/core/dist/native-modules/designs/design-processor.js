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
var DesignProcessor = /** @class */ (function () {
    function DesignProcessor(observerLocator) {
        this.observerLocator = observerLocator;
    }
    DesignProcessor.prototype.setSwatchVariables = function () {
        var swatchClasses = ":root {\r\n";
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch)) {
                if (typeof swatches[swatch] === 'string') {
                    swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + ": " + swatches[swatch] + ";\r\n";
                    continue;
                }
                for (var key in swatches[swatch]) {
                    if (swatches[swatch].hasOwnProperty(key)) {
                        swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + "-" + kebabCase(key) + ": " + swatches[swatch][key] + ";\r\n";
                    }
                }
            }
        }
        swatchClasses += '}';
        DOM.injectStyles(swatchClasses);
    };
    DesignProcessor.prototype.setDesignVariables = function (design) {
        this.designStyleElement = DOM.createElement('style');
        this.designStyleElement.type = 'text/css';
        this.designStyleElement.innerHTML = this.buildInnerHTML(design);
        DOM.appendNode(this.designStyleElement, window.document.head);
    };
    DesignProcessor.prototype.setDesignWatches = function (design) {
        var _this = this;
        for (var key in design) {
            if (design.hasOwnProperty(key)) {
                this.observerLocator.getObserver(design, key)
                    .subscribe(function () {
                    _this.designStyleElement.innerHTML = _this.buildInnerHTML(design);
                });
            }
        }
    };
    DesignProcessor.prototype.buildInnerHTML = function (design) {
        var designInnerHtml = ':root {\r\n';
        for (var key in design) {
            if (design.hasOwnProperty(key)) {
                designInnerHtml += "  --ux-design--" + kebabCase(key) + ": " + design[key] + ";\r\n";
            }
        }
        designInnerHtml += '}';
        return designInnerHtml;
    };
    DesignProcessor = __decorate([
        inject(ObserverLocator)
    ], DesignProcessor);
    return DesignProcessor;
}());
export { DesignProcessor };
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}
