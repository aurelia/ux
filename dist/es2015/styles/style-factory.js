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
import { swatches } from '../colors/swatches';
export class StyleFactory {
    constructor(styleObjectType, styles, expression) {
        this.styleObjectType = styleObjectType;
        this.styles = styles;
        this.expression = expression;
        this.id = camelCase(Origin.get(styleObjectType).moduleMember);
    }
    getOrCreateDefault(container) {
        if (this.defaultController === undefined) {
            this.defaultController = this.create(container);
            this.defaultController.isDefault = true;
        }
        return this.defaultController;
    }
    create(container, destination, bindingContext) {
        let $styles = {};
        let xp = container.get(AureliaXP);
        if (bindingContext) {
            let baseStyles = this.getOrCreateDefault(container).bindingContext;
            Object.setPrototypeOf(bindingContext, baseStyles);
        }
        else {
            bindingContext = container.get(this.styleObjectType);
        }
        Object.keys(this.styles).forEach(key => {
            $styles[key] = generateRandomClass(key);
        });
        return new StyleController(this, bindingContext, new StyleOverrideContext(xp, $styles), this.expression, destination);
    }
}
let currentNumber = 0;
function generateRandomClass(key) {
    return key + '_aurelia_xp_' + nextNumber();
}
function nextNumber() {
    return ++currentNumber;
}
class StyleOverrideContext {
    constructor($xp, $styles) {
        this.$xp = $xp;
        this.$styles = $styles;
        this.$on = '(min-width: 0)';
        this.$off = '(max-width: 0)';
        this.$swatches = swatches;
    }
    get $platform() {
        return this.$xp.platform;
    }
    get $design() {
        return this.$xp.design;
    }
}
__decorate([
    computedFrom('$xp.platform')
], StyleOverrideContext.prototype, "$platform", null);
__decorate([
    computedFrom('$xp.design')
], StyleOverrideContext.prototype, "$design", null);
