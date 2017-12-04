var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-pal", "aurelia-dependency-injection", "aurelia-binding", "../colors/swatches"], function (require, exports, aurelia_pal_1, aurelia_dependency_injection_1, aurelia_binding_1, swatches_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DesignProcessor = /** @class */ (function () {
        function DesignProcessor(observerLocator) {
            this.observerLocator = observerLocator;
        }
        DesignProcessor.prototype.setSwatchVariables = function () {
            var swatchClasses = ":root {\r\n";
            for (var swatch in swatches_1.swatches) {
                if (swatches_1.swatches.hasOwnProperty(swatch)) {
                    if (typeof swatches_1.swatches[swatch] === 'string') {
                        swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + ": " + swatches_1.swatches[swatch] + ";\r\n";
                        continue;
                    }
                    for (var key in swatches_1.swatches[swatch]) {
                        if (swatches_1.swatches[swatch].hasOwnProperty(key)) {
                            swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + "-" + kebabCase(key) + ": " + swatches_1.swatches[swatch][key] + ";\r\n";
                        }
                    }
                }
            }
            swatchClasses += '}';
            aurelia_pal_1.DOM.injectStyles(swatchClasses);
        };
        DesignProcessor.prototype.setDesignVariables = function (design) {
            this.designStyleElement = aurelia_pal_1.DOM.createElement('style');
            this.designStyleElement.type = 'text/css';
            this.designStyleElement.innerHTML = this.buildInnerHTML(design);
            aurelia_pal_1.DOM.appendNode(this.designStyleElement, window.document.head);
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
            aurelia_dependency_injection_1.inject(aurelia_binding_1.ObserverLocator)
        ], DesignProcessor);
        return DesignProcessor;
    }());
    exports.DesignProcessor = DesignProcessor;
    function kebabCase(value) {
        value = value.charAt(0).toLowerCase() + value.slice(1);
        return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
    }
});
