"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_resource_1 = require("./style-resource");
var aurelia_templating_1 = require("aurelia-templating");
var style_strategy_1 = require("./style-strategy");
var aurelia_metadata_1 = require("aurelia-metadata");
var style_locator_1 = require("./style-locator");
/**
 * Decorator: Indicates that the target is a styles class.
 */
function styles() {
    return aurelia_templating_1.resource(new style_resource_1.StyleResource());
}
exports.styles = styles;
/**
 * Decorator: Associates a custom style strategy.
 * @param strategy The style strategy instance.
 */
function useStyleStrategy(strategy) {
    return function (target) {
        aurelia_metadata_1.metadata.define(style_locator_1.StyleLocator.styleStrategyMetadataKey, strategy, target);
    };
}
exports.useStyleStrategy = useStyleStrategy;
/**
 * Decorator: Provides a relative path to styles.
 * @param pathOrDesignMap The path to the styles or an object with keys for different
 * designs and values containing the paths to the styles.
 */
function useStyles(pathOrDesignMap) {
    return useStyleStrategy(new style_strategy_1.RelativeStyleStrategy(pathOrDesignMap));
}
exports.useStyles = useStyles;
/**
 * Decorator: Provides a style template, directly inline.
 * @param cssOrDesignmap The css or an object with keys for different designs
 * and values containing the css for each design.
 */
function inlineStyles(cssOrDesignmap) {
    return useStyleStrategy(new style_strategy_1.InlineStyleStrategy(cssOrDesignmap));
}
exports.inlineStyles = inlineStyles;
