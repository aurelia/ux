System.register(["./style-resource", "aurelia-templating", "./style-strategy", "aurelia-metadata", "./style-locator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Decorator: Indicates that the target is a styles class.
     */
    function styles() {
        return aurelia_templating_1.resource(new style_resource_1.StyleResource());
    }
    exports_1("styles", styles);
    /**
     * Decorator: Associates a custom style strategy.
     * @param strategy The style strategy instance.
     */
    function useStyleStrategy(strategy) {
        return function (target) {
            aurelia_metadata_1.metadata.define(style_locator_1.StyleLocator.styleStrategyMetadataKey, strategy, target);
        };
    }
    exports_1("useStyleStrategy", useStyleStrategy);
    /**
     * Decorator: Provides a relative path to styles.
     * @param pathOrDesignMap The path to the styles or an object with keys for different
     * designs and values containing the paths to the styles.
     */
    function useStyles(pathOrDesignMap) {
        return useStyleStrategy(new style_strategy_1.RelativeStyleStrategy(pathOrDesignMap));
    }
    exports_1("useStyles", useStyles);
    /**
     * Decorator: Provides a style template, directly inline.
     * @param cssOrDesignmap The css or an object with keys for different designs
     * and values containing the css for each design.
     */
    function inlineStyles(cssOrDesignmap) {
        return useStyleStrategy(new style_strategy_1.InlineStyleStrategy(cssOrDesignmap));
    }
    exports_1("inlineStyles", inlineStyles);
    var style_resource_1, aurelia_templating_1, style_strategy_1, aurelia_metadata_1, style_locator_1;
    return {
        setters: [
            function (style_resource_1_1) {
                style_resource_1 = style_resource_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (style_strategy_1_1) {
                style_strategy_1 = style_strategy_1_1;
            },
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (style_locator_1_1) {
                style_locator_1 = style_locator_1_1;
            }
        ],
        execute: function () {
        }
    };
});
