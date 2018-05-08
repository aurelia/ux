var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';
let UxCard = class UxCard {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        styleEngine.ensureDefaultTheme(new UxCardTheme());
    }
    bind() {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    }
};
__decorate([
    bindable
], UxCard.prototype, "theme", void 0);
UxCard = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-card')
], UxCard);
export { UxCard };
