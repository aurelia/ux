var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { processDesignAttributes } from '../designs/design-attributes';
export let UxButton = class UxButton {
    constructor(resources, styleEngine) {
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.theme = null;
    }
    created(_, myView) {
        this.view = myView;
    }
    bind() {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(this, newValue);
    }
};
__decorate([
    bindable
], UxButton.prototype, "disabled", void 0);
__decorate([
    bindable
], UxButton.prototype, "theme", void 0);
UxButton = __decorate([
    inject(ViewResources, StyleEngine),
    customElement('ux-button'),
    processAttributes(processDesignAttributes)
], UxButton);
