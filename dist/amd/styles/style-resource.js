define(["require", "exports", 'aurelia-metadata', './style-locator', 'aurelia-pal', 'aurelia-metadata'], function (require, exports, aurelia_metadata_1, style_locator_1, aurelia_pal_1, aurelia_metadata_2) {
    "use strict";
    var StyleResource = (function () {
        function StyleResource() {
        }
        StyleResource.prototype.initialize = function (container, target) {
            this.styleObjectType = target;
            this.container = container;
            this.hooks = new StyleViewEngineHooks(this);
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
                return styleFactory;
            });
        };
        return StyleResource;
    }());
    exports.StyleResource = StyleResource;
    var StyleViewEngineHooks = (function () {
        function StyleViewEngineHooks(owner) {
            this.owner = owner;
        }
        StyleViewEngineHooks.prototype.beforeBind = function (view) {
            this.locateController(view).bind(view);
        };
        StyleViewEngineHooks.prototype.beforeUnbind = function (view) {
            this.locateController(view).unbind();
        };
        StyleViewEngineHooks.prototype.locateController = function (view) {
            var controller = view[this.factory.id];
            if (controller === undefined) {
                if (injectIntoShadowDOM(view)) {
                    var destination = view.container.get(aurelia_pal_1.DOM.Element);
                    view[this.factory.id] = controller = this.factory.create(view.container, destination);
                }
                view[this.factory.id] = controller = this.factory.getOrCreateDefault(this.owner.container);
            }
            return controller;
        };
        return StyleViewEngineHooks;
    }());
    function injectIntoShadowDOM(view) {
        var behavior = aurelia_metadata_2.metadata.get(aurelia_metadata_2.metadata.resource, view.bindingContext.constructor);
        return behavior.usesShadowDOM;
    }
});
