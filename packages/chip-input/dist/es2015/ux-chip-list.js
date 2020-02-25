var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
let UxChipList = class UxChipList {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.type = 'inline';
    }
    bind() {
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip-list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
};
__decorate([
    bindable
], UxChipList.prototype, "theme", void 0);
__decorate([
    bindable
], UxChipList.prototype, "type", void 0);
UxChipList = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-chip-list')
], UxChipList);
export { UxChipList };
//# sourceMappingURL=ux-chip-list.js.map