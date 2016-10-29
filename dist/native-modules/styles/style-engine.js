var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Origin } from 'aurelia-metadata';
import { camelCase } from 'aurelia-binding';
import { TaskQueue } from 'aurelia-task-queue';
import { inject, Container } from 'aurelia-dependency-injection';
export var StyleEngine = (function () {
    function StyleEngine(container, taskQueue) {
        this.container = container;
        this.taskQueue = taskQueue;
    }
    StyleEngine.prototype.applyTheme = function (themable, theme) {
        var _this = this;
        this.taskQueue.queueMicroTask(function () {
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
            newController = currentController.factory.create(_this.container, null, bindingContext);
            currentController.unbind();
            themable.view[name] = newController;
            newController.bind(themable.view);
        });
    };
    StyleEngine = __decorate([
        inject(Container, TaskQueue)
    ], StyleEngine);
    return StyleEngine;
}());
