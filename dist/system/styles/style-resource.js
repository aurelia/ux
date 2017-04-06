System.register(["aurelia-metadata", "./style-locator", "./style-engine"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_metadata_1, style_locator_1, style_engine_1, StyleResource, StyleViewEngineHooks;
    return {
        setters: [
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (style_locator_1_1) {
                style_locator_1 = style_locator_1_1;
            },
            function (style_engine_1_1) {
                style_engine_1 = style_engine_1_1;
            }
        ],
        execute: function () {
            StyleResource = (function () {
                function StyleResource() {
                }
                StyleResource.prototype.initialize = function (container, target) {
                    this.styleObjectType = target;
                    this.container = container;
                    this.hooks = new StyleViewEngineHooks(container.get(style_engine_1.StyleEngine));
                };
                StyleResource.prototype.register = function (registry) {
                    registry.registerViewEngineHooks(this.hooks);
                };
                StyleResource.prototype.load = function (container) {
                    var _this = this;
                    var styleStrategy = container.get(style_locator_1.StyleLocator)
                        .getStyleStrategy(this.styleObjectType);
                    if (!styleStrategy.moduleId) {
                        styleStrategy.moduleId = aurelia_metadata_1.Origin.get(this.styleObjectType).moduleId;
                    }
                    return styleStrategy.loadStyleFactory(container, this.styleObjectType).then(function (styleFactory) {
                        _this.factory = styleFactory;
                        _this.hooks.factory = _this.factory;
                        return _this;
                    });
                };
                return StyleResource;
            }());
            exports_1("StyleResource", StyleResource);
            StyleViewEngineHooks = (function () {
                function StyleViewEngineHooks(engine) {
                    this.engine = engine;
                }
                StyleViewEngineHooks.prototype.beforeBind = function (view) {
                    this.engine.getOrCreateStyleController(view, this.factory).bind(view);
                };
                StyleViewEngineHooks.prototype.beforeUnbind = function (view) {
                    this.engine.getOrCreateStyleController(view, this.factory).unbind();
                };
                return StyleViewEngineHooks;
            }());
        }
    };
});
