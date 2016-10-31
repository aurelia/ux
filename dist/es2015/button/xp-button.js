var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
export let XpButton = class XpButton {
    constructor(resources, styleEngine) {
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.raised = null;
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
], XpButton.prototype, "raised", void 0);
__decorate([
    bindable
], XpButton.prototype, "disabled", void 0);
__decorate([
    bindable
], XpButton.prototype, "theme", void 0);
XpButton = __decorate([
    inject(ViewResources, StyleEngine),
    customElement('xp-button')
], XpButton);
export class StyleResolveValueConverter {
    toView(className, styleValue, elementValue) {
        if (elementValue === null) {
            return styleValue ? className : '';
        }
        if (typeof elementValue === 'string') {
            if (elementValue === 'true') {
                return className;
            }
            return '';
        }
        return elementValue ? className : '';
    }
}
