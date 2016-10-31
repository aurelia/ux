var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Origin, metadata } from 'aurelia-metadata';
import { camelCase } from 'aurelia-binding';
import { inject, Container } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
export var StyleEngine = (function () {
    function StyleEngine(container) {
        this.container = container;
        this.controllers = new Map();
    }
    StyleEngine.prototype.applyTheme = function (themable, theme) {
        var _this = this;
        var name = camelCase(Origin.get(themable.constructor).moduleMember + 'Styles');
        var currentController = themable.view[name];
        var bindingContext;
        var newController;
        if (!theme) {
            if (currentController !== currentController.factory.defaultController) {
                currentController.unbind();
                newController = currentController.factory.defaultController;
                themable.view[name] = newController;
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
            themable.view[name] = newController;
            newController.bind(themable.view);
            this.controllers.set(bindingContext, newController);
            newController.onRemove = function () {
                _this.controllers.delete(bindingContext);
            };
        }
    };
    StyleEngine.prototype.getOrCreateStlyeController = function (view, factory) {
        var controller = view[factory.id];
        if (controller === undefined) {
            if (this.renderingInShadowDOM(view)) {
                var destination = view.container.get(DOM.boundary);
                view[factory.id] = controller = factory.create(view.container, destination);
            }
            view[factory.id] = controller = factory.getOrCreateDefault(this.container);
        }
        return controller;
    };
    StyleEngine.prototype.renderingInShadowDOM = function (view) {
        var behavior = metadata.get(metadata.resource, view.bindingContext.constructor);
        return behavior.usesShadowDOM;
    };
    StyleEngine = __decorate([
        inject(Container)
    ], StyleEngine);
    return StyleEngine;
}());
