import { Origin } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
import { DOM } from 'aurelia-pal';
import { metadata } from 'aurelia-metadata';
export var StyleResource = (function () {
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
        var styleStrategy = container.get(StyleLocator)
            .getStyleStrategy(this.styleObjectType);
        if (!styleStrategy.moduleId) {
            styleStrategy.moduleId = Origin.get(this.styleObjectType).moduleId;
        }
        return styleStrategy.loadStyleFactory(container, this.styleObjectType).then(function (styleFactory) {
            _this.factory = styleFactory;
            _this.hooks.factory = _this.factory;
            return styleFactory;
        });
    };
    return StyleResource;
}());
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
                var destination = view.container.get(DOM.Element);
                view[this.factory.id] = controller = this.factory.create(view.container, destination);
            }
            view[this.factory.id] = controller = this.factory.getOrCreateDefault(this.owner.container);
        }
        return controller;
    };
    return StyleViewEngineHooks;
}());
function injectIntoShadowDOM(view) {
    var behavior = metadata.get(metadata.resource, view.bindingContext.constructor);
    return behavior.usesShadowDOM;
}
