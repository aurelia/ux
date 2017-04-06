System.register(["aurelia-pal"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_pal_1, StyleController;
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            }
        ],
        execute: function () {
            StyleController = (function () {
                function StyleController(factory, bindingContext, overrideContext, expression, destination) {
                    this.factory = factory;
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                    this.expression = expression;
                    this.destination = destination;
                    this.isDefault = false;
                    this.bindingInstance = null;
                    this.count = 0;
                    this.onRemove = aurelia_pal_1.PLATFORM.noop;
                }
                StyleController.prototype.bind = function (view) {
                    var overrideContext = view.overrideContext;
                    var $styles = overrideContext['$styles'] || {};
                    overrideContext['$' + this.factory.themeKey] = this.bindingContext;
                    overrideContext['$design'] = this.overrideContext.$design;
                    overrideContext['$styles'] = Object.assign($styles, this.overrideContext.$styles);
                    if (this.count === 0) {
                        this.ensureStyleElementIsAddedToDocument();
                        this.count = 1;
                        this.bindingInstance.bind(this);
                    }
                    else {
                        this.count++;
                    }
                };
                StyleController.prototype.unbind = function () {
                    this.count--;
                    if (this.count === 0) {
                        this.removeStyleElement();
                        this.bindingInstance.unbind();
                    }
                };
                StyleController.prototype.ensureStyleElementIsAddedToDocument = function () {
                    if (this.styleElement === undefined) {
                        this.styleElement = aurelia_pal_1.DOM.injectStyles('', this.destination);
                        this.bindingInstance = this.expression.createBinding(this.styleElement);
                    }
                    else if (!this.styleElement.parentNode) {
                        this.styleElementParent.appendChild(this.styleElement);
                    }
                };
                StyleController.prototype.removeStyleElement = function () {
                    this.styleElementParent = this.styleElement.parentNode;
                    aurelia_pal_1.DOM.removeNode(this.styleElement);
                    this.onRemove();
                };
                return StyleController;
            }());
            exports_1("StyleController", StyleController);
        }
    };
});
