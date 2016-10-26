"use strict";
var aurelia_pal_1 = require('aurelia-pal');
var StyleController = (function () {
    function StyleController(factory, bindingContext, overrideContext, expression, destination) {
        this.factory = factory;
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.expression = expression;
        this.destination = destination;
        this.isDefault = false;
        this.styleElement = null;
        this.bindingInstance = null;
        this.count = 0;
    }
    StyleController.prototype.bind = function (view) {
        var overrideContext = view.overrideContext;
        var $styles = overrideContext['$styles'] || {};
        overrideContext['$' + this.factory.id] = this.bindingContext;
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
        if (this.styleElement === null) {
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
    };
    return StyleController;
}());
exports.StyleController = StyleController;
