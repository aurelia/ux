var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
let UxGrid = class UxGrid {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    bind() {
        this.themeChanged(this.theme);
        if (this.columns != null) {
            this.columnsChanged(this.columns);
        }
        this.processAttributes();
    }
    processAttributes() {
        const alignAttributes = [
            'align-cells-top',
            'align-cells-middle',
            'align-cells-bottom',
            'fixed',
            'remove-padding'
        ];
        for (const attribute of alignAttributes) {
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add(`ux-grid--${attribute}`);
            }
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'grid';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    columnsChanged(newValue) {
        if (newValue != null) {
            this.element.style.setProperty('grid-template-columns', `repeat(${newValue}, 1fr)`);
        }
    }
};
__decorate([
    bindable
], UxGrid.prototype, "theme", void 0);
__decorate([
    bindable
], UxGrid.prototype, "columns", void 0);
UxGrid = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-grid')
], UxGrid);
export { UxGrid };
