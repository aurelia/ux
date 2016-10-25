var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { StyleController } from './style-controller';
import { AureliaXP } from '../aurelia-xp';
import { computedFrom, camelCase } from 'aurelia-binding';
import { Origin } from 'aurelia-metadata';
export var StyleFactory = (function () {
    function StyleFactory(styleObjectType, styles, expression) {
        this.styleObjectType = styleObjectType;
        this.styles = styles;
        this.expression = expression;
        this.defaultController = null;
        this.id = camelCase(Origin.get(styleObjectType).moduleMember);
    }
    StyleFactory.prototype.getOrCreateDefault = function (container) {
        if (this.defaultController === null) {
            this.defaultController = this.create(container);
            this.defaultController.isDefault = true;
        }
        return this.defaultController;
    };
    StyleFactory.prototype.create = function (container, destination, bindingContext) {
        var $styles = {};
        var xp = container.get(AureliaXP);
        if (bindingContext) {
            var baseStyles = this.getOrCreateDefault(container).bindingContext;
            Object.setPrototypeOf(bindingContext, baseStyles);
        }
        else {
            bindingContext = container.get(this.styleObjectType);
        }
        Object.keys(this.styles).forEach(function (key) {
            $styles[key] = generateRandomClass(key);
        });
        return new StyleController(this, bindingContext, new StyleOverrideContext(xp, $styles), this.expression, destination);
    };
    return StyleFactory;
}());
var currentNumber = 0;
function generateRandomClass(key) {
    return key + '_aurelia_xp_' + nextNumber();
}
function nextNumber() {
    return ++currentNumber;
}
var StyleOverrideContext = (function () {
    function StyleOverrideContext($xp, $styles) {
        this.$xp = $xp;
        this.$styles = $styles;
        this.$on = '(min-width: 0)';
        this.$off = '(max-width: 0)';
    }
    Object.defineProperty(StyleOverrideContext.prototype, "$platform", {
        get: function () {
            return this.$xp.platform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleOverrideContext.prototype, "$design", {
        get: function () {
            return this.$xp.design;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        computedFrom('$xp.platform')
    ], StyleOverrideContext.prototype, "$platform", null);
    __decorate([
        computedFrom('$xp.design')
    ], StyleOverrideContext.prototype, "$design", null);
    return StyleOverrideContext;
}());
