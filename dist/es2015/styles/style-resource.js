import { Origin } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
import { StyleEngine } from './style-engine';
export class StyleResource {
    initialize(container, target) {
        this.styleObjectType = target;
        this.container = container;
        this.hooks = new StyleViewEngineHooks(container.get(StyleEngine));
    }
    register(registry) {
        registry.registerViewEngineHooks(this.hooks);
    }
    load(container) {
        const styleStrategy = container.get(StyleLocator)
            .getStyleStrategy(this.styleObjectType);
        if (!styleStrategy.moduleId) {
            styleStrategy.moduleId = Origin.get(this.styleObjectType).moduleId;
        }
        return styleStrategy.loadStyleFactory(container, this.styleObjectType).then(styleFactory => {
            this.factory = styleFactory;
            this.hooks.factory = this.factory;
            return this;
        });
    }
}
class StyleViewEngineHooks {
    constructor(engine) {
        this.engine = engine;
    }
    beforeBind(view) {
        this.engine.getOrCreateStyleController(view, this.factory).bind(view);
    }
    beforeUnbind(view) {
        this.engine.getOrCreateStyleController(view, this.factory).unbind();
    }
}
