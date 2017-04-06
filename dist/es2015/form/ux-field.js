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
let UxField = class UxField {
    constructor(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
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
    attached() {
        if (this.label && !this.element.querySelector('label')) {
            const newLabel = document.createElement('label');
            newLabel.textContent = this.label;
            this.element.insertBefore(newLabel, this.element.firstChild);
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(this, newValue);
    }
};
__decorate([
    bindable
], UxField.prototype, "theme", void 0);
__decorate([
    bindable
], UxField.prototype, "label", void 0);
UxField = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-field'),
    processAttributes(processDesignAttributes)
], UxField);
export { UxField };
