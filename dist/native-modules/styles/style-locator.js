import { metadata, Origin } from 'aurelia-metadata';
import { styleStrategy, ConventionalStyleStrategy, RelativeStyleStrategy } from './style-strategy';
/**
 * Locates a style for an object.
 */
var StyleLocator = (function () {
    function StyleLocator() {
    }
    /**
     * Gets the style strategy for the value.
     * @param value The value to locate the style strategy for.
     * @return The located StyleStrategy instance.
     */
    StyleLocator.prototype.getStyleStrategy = function (value) {
        if (typeof value === 'object' && 'getStyleStrategy' in value) {
            var origin_1 = Origin.get(value.constructor);
            value = value.getStyleStrategy();
            if (typeof value === 'string') {
                value = new RelativeStyleStrategy(value);
            }
            styleStrategy.assert(value);
            if (origin_1.moduleId) {
                value.makeRelativeTo(origin_1.moduleId);
            }
            return value;
        }
        if (typeof value === 'string') {
            value = new RelativeStyleStrategy(value);
        }
        if (styleStrategy.validate(value)) {
            return value;
        }
        if (typeof value !== 'function') {
            value = value.constructor;
        }
        var origin = Origin.get(value);
        var strategy = metadata.get(StyleLocator.styleStrategyMetadataKey, value);
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
        return new ConventionalStyleStrategy(this, origin);
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
export { StyleLocator };
/**
 * The metadata key for storing/finding style strategies associated with an class/object.
 */
StyleLocator.styleStrategyMetadataKey = 'aurelia:style-strategy';
