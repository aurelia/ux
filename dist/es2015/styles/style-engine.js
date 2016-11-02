var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { metadata, Origin } from 'aurelia-metadata';
import { inject, Container } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { camelCase } from 'aurelia-binding';
export let StyleEngine = class StyleEngine {
    constructor(container) {
        this.container = container;
        this.controllers = new Map();
    }
    getThemeKeyForComponent(obj) {
        return camelCase(Origin.get(obj.constructor).moduleMember + 'Theme');
    }
    applyTheme(themable, theme) {
        let themeKey = this.getThemeKeyForComponent(themable);
        let currentController = themable.view[themeKey];
        let bindingContext;
        let newController;
        if (!theme) {
            if (currentController !== currentController.factory.defaultController) {
                currentController.unbind();
                newController = currentController.factory.defaultController;
                themable.view[themeKey] = newController;
                newController.bind(themable.view);
            }
            return;
        }
        if (typeof theme === 'string') {
            bindingContext = themable.resources.getValue(theme) || themable.view.container.get(theme);
        }
        else {
            bindingContext = theme;
        }
        if (this.renderingInShadowDOM(themable.view)) {
            currentController.unbind();
            currentController.bindingContext = bindingContext;
            currentController.bind(themable.view);
        }
        else {
            newController = this.controllers.get(bindingContext);
            if (!newController) {
                newController = currentController.factory.create(this.container, null, bindingContext);
            }
            currentController.unbind();
            themable.view[themeKey] = newController;
            newController.bind(themable.view);
            this.controllers.set(bindingContext, newController);
            newController.onRemove = () => {
                this.controllers.delete(bindingContext);
            };
        }
    }
    getOrCreateStlyeController(view, factory) {
        let controller = view[factory.themeKey];
        if (controller === undefined) {
            if (this.renderingInShadowDOM(view)) {
                let destination = view.container.get(DOM.boundary);
                view[factory.themeKey] = controller = factory.create(view.container, destination);
            }
            view[factory.themeKey] = controller = factory.getOrCreateDefault(this.container);
        }
        return controller;
    }
    renderingInShadowDOM(view) {
        let behavior = metadata.get(metadata.resource, view.bindingContext.constructor);
        return behavior.usesShadowDOM;
    }
};
StyleEngine = __decorate([
    inject(Container)
], StyleEngine);
