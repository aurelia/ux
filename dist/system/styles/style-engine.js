System.register(['aurelia-metadata', 'aurelia-binding', 'aurelia-task-queue', 'aurelia-dependency-injection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_metadata_1, aurelia_binding_1, aurelia_task_queue_1, aurelia_dependency_injection_1;
    var StyleEngine;
    return {
        setters:[
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_task_queue_1_1) {
                aurelia_task_queue_1 = aurelia_task_queue_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            }],
        execute: function() {
            StyleEngine = (function () {
                function StyleEngine(container, taskQueue) {
                    this.container = container;
                    this.taskQueue = taskQueue;
                }
                StyleEngine.prototype.applyTheme = function (themable, theme) {
                    var _this = this;
                    this.taskQueue.queueMicroTask(function () {
                        var name = aurelia_binding_1.camelCase(aurelia_metadata_1.Origin.get(themable.constructor).moduleMember + 'Styles');
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
                    aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container, aurelia_task_queue_1.TaskQueue)
                ], StyleEngine);
                return StyleEngine;
            }());
            exports_1("StyleEngine", StyleEngine);
        }
    }
});
