System.register(['./style-controller', '../aurelia-xp', 'aurelia-binding', 'aurelia-metadata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var style_controller_1, aurelia_xp_1, aurelia_binding_1, aurelia_metadata_1;
    var StyleFactory, currentNumber, StyleOverrideContext;
    function generateRandomClass(key) {
        return key + '_aurelia_xp_' + nextNumber();
    }
    function nextNumber() {
        return ++currentNumber;
    }
    return {
        setters:[
            function (style_controller_1_1) {
                style_controller_1 = style_controller_1_1;
            },
            function (aurelia_xp_1_1) {
                aurelia_xp_1 = aurelia_xp_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            }],
        execute: function() {
            StyleFactory = (function () {
                function StyleFactory(styleObjectType, styles, expression) {
                    this.styleObjectType = styleObjectType;
                    this.styles = styles;
                    this.expression = expression;
                    this.defaultController = null;
                    this.id = aurelia_binding_1.camelCase(aurelia_metadata_1.Origin.get(styleObjectType).moduleMember);
                }
                StyleFactory.prototype.getOrCreateDefault = function (container) {
                    if (this.defaultController === null) {
                        this.defaultController = this.create(container);
                        this.defaultController.isDefault = true;
                    }
                    return this.defaultController;
                };
                StyleFactory.prototype.create = function (container, destination, bindingContext) {
                    var $styles = {};
                    var xp = container.get(aurelia_xp_1.AureliaXP);
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
                    return new style_controller_1.StyleController(this, bindingContext, new StyleOverrideContext(xp, $styles), this.expression, destination);
                };
                return StyleFactory;
            }());
            exports_1("StyleFactory", StyleFactory);
            currentNumber = 0;
            StyleOverrideContext = (function () {
                function StyleOverrideContext($xp, $styles) {
                    this.$xp = $xp;
                    this.$styles = $styles;
                    this.$on = '(min-width: 0)';
                    this.$off = '(max-width: 0)';
                }
                Object.defineProperty(StyleOverrideContext.prototype, "$platform", {
                    get: function () {
                        return this.$xp.platform;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StyleOverrideContext.prototype, "$design", {
                    get: function () {
                        return this.$xp.design;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    aurelia_binding_1.computedFrom('$xp.platform')
                ], StyleOverrideContext.prototype, "$platform", null);
                __decorate([
                    aurelia_binding_1.computedFrom('$xp.design')
                ], StyleOverrideContext.prototype, "$design", null);
                return StyleOverrideContext;
            }());
        }
    }
});
