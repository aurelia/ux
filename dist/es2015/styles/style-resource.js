import { Origin } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
import { DOM } from 'aurelia-pal';
import { metadata } from 'aurelia-metadata';
export class StyleResource {
    initialize(container, target) {
        this.styleObjectType = target;
        this.container = container;
        this.hooks = new StyleViewEngineHooks(this);
    }
    register(registry) {
        registry.registerViewEngineHooks(this.hooks);
    }
    load(container) {
        let styleStrategy = container.get(StyleLocator)
            .getStyleStrategy(this.styleObjectType);
        if (!styleStrategy.moduleId) {
            styleStrategy.moduleId = Origin.get(this.styleObjectType).moduleId;
        }
        return styleStrategy.loadStyleFactory(container, this.styleObjectType).then(styleFactory => {
            this.factory = styleFactory;
            this.hooks.factory = this.factory;
            return styleFactory;
        });
    }
}
class StyleViewEngineHooks {
    constructor(owner) {
        this.owner = owner;
    }
    beforeBind(view) {
        this.locateController(view).bind(view);
    }
    beforeUnbind(view) {
        this.locateController(view).unbind();
    }
    locateController(view) {
        let controller = view[this.factory.id];
        if (controller === undefined) {
            if (injectIntoShadowDOM(view)) {
                let destination = view.container.get(DOM.Element);
                view[this.factory.id] = controller = this.factory.create(view.container, destination);
            }
            view[this.factory.id] = controller = this.factory.getOrCreateDefault(this.owner.container);
        }
        return controller;
    }
}
function injectIntoShadowDOM(view) {
    let behavior = metadata.get(metadata.resource, view.bindingContext.constructor);
    return behavior.usesShadowDOM;
}
