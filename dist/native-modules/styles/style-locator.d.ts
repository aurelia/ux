import { Origin } from 'aurelia-metadata';
import { StyleStrategy } from './style-strategy';
/**
 * Locates a style for an object.
 */
export declare class StyleLocator {
    /**
     * The metadata key for storing/finding style strategies associated with an class/object.
     */
    static styleStrategyMetadataKey: string;
    /**
     * Gets the style strategy for the value.
     * @param value The value to locate the style strategy for.
     * @return The located StyleStrategy instance.
     */
    getStyleStrategy(value: any): StyleStrategy;
    /**
     * Creates a fallback Style Strategy. Used when unable to locate a configured strategy.
     * The default implementation returns and instance of ConventionalStyleStrategy.
     * @param origin The origin of the view model to return the strategy for.
     * @return The fallback StyleStrategy.
     */
    createFallbackStyleStrategy(origin: Origin): StyleStrategy;
    /**
     * Conventionally converts a view model origin to a style url.
     * Used by the ConventionalStyleStrategy.
     * @param origin The origin of the view model to convert.
     * @return The view url.
     */
    convertOriginToStyleUrl(origin: Origin): string;
}
