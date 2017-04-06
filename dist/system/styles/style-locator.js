System.register(["aurelia-metadata", "./style-strategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_metadata_1, style_strategy_1, StyleLocator;
    return {
        setters: [
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (style_strategy_1_1) {
                style_strategy_1 = style_strategy_1_1;
            }
        ],
        execute: function () {
            /**
             * Locates a style for an object.
             */
            StyleLocator = (function () {
                function StyleLocator() {
                }
                /**
                 * Gets the style strategy for the value.
                 * @param value The value to locate the style strategy for.
                 * @return The located StyleStrategy instance.
                 */
                StyleLocator.prototype.getStyleStrategy = function (value) {
                    if (typeof value === 'object' && 'getStyleStrategy' in value) {
                        var origin_1 = aurelia_metadata_1.Origin.get(value.constructor);
                        value = value.getStyleStrategy();
                        if (typeof value === 'string') {
                            value = new style_strategy_1.RelativeStyleStrategy(value);
                        }
                        style_strategy_1.styleStrategy.assert(value);
                        if (origin_1.moduleId) {
                            value.makeRelativeTo(origin_1.moduleId);
                        }
                        return value;
                    }
                    if (typeof value === 'string') {
                        value = new style_strategy_1.RelativeStyleStrategy(value);
                    }
                    if (style_strategy_1.styleStrategy.validate(value)) {
                        return value;
                    }
                    if (typeof value !== 'function') {
                        value = value.constructor;
                    }
                    var origin = aurelia_metadata_1.Origin.get(value);
                    var strategy = aurelia_metadata_1.metadata.get(StyleLocator.styleStrategyMetadataKey, value);
                    if (!strategy) {
                        if (!origin.moduleId) {
                            throw new Error('Cannot determine default style strategy for object.');
                        }
                        strategy = this.createFallbackStyleStrategy(origin);
                    }
                    else if (origin.moduleId) {
                        strategy.moduleId = origin.moduleId;
                    }
                    return strategy;
                };
                /**
                 * Creates a fallback Style Strategy. Used when unable to locate a configured strategy.
                 * The default implementation returns and instance of ConventionalStyleStrategy.
                 * @param origin The origin of the view model to return the strategy for.
                 * @return The fallback StyleStrategy.
                 */
                StyleLocator.prototype.createFallbackStyleStrategy = function (origin) {
                    return new style_strategy_1.ConventionalStyleStrategy(this, origin);
                };
                /**
                 * Conventionally converts a view model origin to a style url.
                 * Used by the ConventionalStyleStrategy.
                 * @param origin The origin of the view model to convert.
                 * @return The view url.
                 */
                StyleLocator.prototype.convertOriginToStyleUrl = function (origin) {
                    var moduleId = origin.moduleId;
                    var id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts'))
                        ? moduleId.substring(0, moduleId.length - 3)
                        : moduleId;
                    return id + '.css';
                };
                return StyleLocator;
            }());
            /**
             * The metadata key for storing/finding style strategies associated with an class/object.
             */
            StyleLocator.styleStrategyMetadataKey = 'aurelia:style-strategy';
            exports_1("StyleLocator", StyleLocator);
        }
    };
});
