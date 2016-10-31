import { StyleResource } from './style-resource';
import { resource } from 'aurelia-templating';
import { RelativeStyleStrategy, InlineStyleStrategy } from './style-strategy';
import { metadata } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
/**
 * Decorator: Indicates that the target is a styles class.
 */
export function styles() {
    return resource(new StyleResource());
}
/**
 * Decorator: Associates a custom style strategy.
 * @param strategy The style strategy instance.
 */
export function useStyleStrategy(strategy) {
    return (target) => {
        metadata.define(StyleLocator.styleStrategyMetadataKey, strategy, target);
    };
}
/**
 * Decorator: Provides a relative path to styles.
 * @param pathOrDesignMap The path to the styles or an object with keys for different
 * designs and values containing the paths to the styles.
 */
export function useStyles(pathOrDesignMap) {
    return useStyleStrategy(new RelativeStyleStrategy(pathOrDesignMap));
}
/**
 * Decorator: Provides a style template, directly inline.
 * @param cssOrDesignmap The css or an object with keys for different designs
 * and values containing the css for each design.
 */
export function inlineStyles(cssOrDesignmap) {
    return useStyleStrategy(new InlineStyleStrategy(cssOrDesignmap));
}
