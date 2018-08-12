var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
var UxCard = /** @class */ (function () {
    function UxCard(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxCard.prototype.bind = function () {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
    };
    UxCard.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], UxCard.prototype, "theme", void 0);
    UxCard = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-card')
    ], UxCard);
    return UxCard;
}());
export { UxCard };
