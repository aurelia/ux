var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./style-controller", "../aurelia-ux", "aurelia-binding", "aurelia-metadata", "../colors/swatches", "../colors/shadows"], function (require, exports, style_controller_1, aurelia_ux_1, aurelia_binding_1, aurelia_metadata_1, swatches_1, shadows_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleFactory = (function () {
        function StyleFactory(styleObjectType, styles, expression) {
            this.styleObjectType = styleObjectType;
            this.styles = styles;
            this.expression = expression;
            this.themeKey = aurelia_binding_1.camelCase(aurelia_metadata_1.Origin.get(styleObjectType).moduleMember);
        }
        StyleFactory.prototype.getOrCreateDefault = function (container) {
            if (this.defaultController === undefined) {
                this.defaultController = this.create(container);
                this.defaultController.isDefault = true;
            }
            return this.defaultController;
        };
        StyleFactory.prototype.create = function (container, destination, bindingContext) {
            var $styles = {};
            var ux = container.get(aurelia_ux_1.AureliaUX);
            if (bindingContext) {
                var baseStyles = this.getOrCreateDefault(container).bindingContext;
                Object.setPrototypeOf(bindingContext, baseStyles);
            }
            else {
                bindingContext = container.get(this.styleObjectType);
            }
            Object.keys(this.styles).forEach(function (key) {
                $styles[key] = generateRandomClass(key);
            });
            return new style_controller_1.StyleController(this, bindingContext, new StyleOverrideContext(ux, $styles, bindingContext), this.expression, destination);
        };
        return StyleFactory;
    }());
    exports.StyleFactory = StyleFactory;
    var currentNumber = 0;
    function generateRandomClass(key) {
        return key + '_au_ux_' + nextNumber();
    }
    function nextNumber() {
        return ++currentNumber;
    }
    var StyleOverrideContext = (function () {
        function StyleOverrideContext($ux, $styles, bindingContext) {
            this.$ux = $ux;
            this.$styles = $styles;
            this.bindingContext = bindingContext;
            this.$on = '(min-width: 0)';
            this.$off = '(max-width: 0)';
            this.$swatches = swatches_1.swatches;
            this.$shadows = shadows_1.shadows;
        }
        Object.defineProperty(StyleOverrideContext.prototype, "$platform", {
            get: function () {
                return this.$ux.platform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleOverrideContext.prototype, "$design", {
            get: function () {
                return this.$ux.design;
            },
            enumerable: true,
            configurable: true
        });
        return StyleOverrideContext;
    }());
    __decorate([
        aurelia_binding_1.computedFrom('$ux.platform')
    ], StyleOverrideContext.prototype, "$platform", null);
    __decorate([
        aurelia_binding_1.computedFrom('$ux.design')
    ], StyleOverrideContext.prototype, "$design", null);
});
