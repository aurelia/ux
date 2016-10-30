import { Origin } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
import { StyleEngine } from './style-engine';
export var StyleResource = (function () {
    function StyleResource() {
    }
    StyleResource.prototype.initialize = function (container, target) {
        this.styleObjectType = target;
        this.container = container;
        this.hooks = new StyleViewEngineHooks(container.get(StyleEngine));
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
    function StyleViewEngineHooks(engine) {
        this.engine = engine;
    }
    StyleViewEngineHooks.prototype.beforeBind = function (view) {
        this.engine.getOrCreateStlyeController(view, this.factory).bind(view);
    };
    StyleViewEngineHooks.prototype.beforeUnbind = function (view) {
        this.engine.getOrCreateStlyeController(view, this.factory).unbind();
    };
    return StyleViewEngineHooks;
}());
