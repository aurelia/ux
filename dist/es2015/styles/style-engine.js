var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Origin, metadata } from 'aurelia-metadata';
import { camelCase } from 'aurelia-binding';
import { TaskQueue } from 'aurelia-task-queue';
import { inject, Container } from 'aurelia-dependency-injection';
export let StyleEngine = class StyleEngine {
    constructor(container, taskQueue) {
        this.container = container;
        this.taskQueue = taskQueue;
    }
    applyTheme(themable, theme) {
        this.taskQueue.queueMicroTask(() => {
            let name = camelCase(Origin.get(themable.constructor).moduleMember + 'Styles');
            let currentController = themable.view[name];
            let bindingContext;
            let newController;
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
                newController = currentController.factory.create(this.container, null, bindingContext);
                currentController.unbind();
                themable.view[name] = newController;
                newController.bind(themable.view);
            }
        });
    }
    renderingInShadowDOM(view) {
        let behavior = metadata.get(metadata.resource, view.bindingContext.constructor);
        return behavior.usesShadowDOM;
    }
};
StyleEngine = __decorate([
    inject(Container, TaskQueue)
], StyleEngine);
