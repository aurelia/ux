var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { UxTagTheme } from './ux-tag-theme';
const theme = new UxTagTheme();
let UxTag = class UxTag {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = undefined;
        styleEngine.ensureDefaultTheme(theme);
    }
    bind() {
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    }
    closeTag() {
        const closeEvent = DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    }
};
__decorate([
    bindable
], UxTag.prototype, "theme", void 0);
__decorate([
    bindable
], UxTag.prototype, "type", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxTag.prototype, "value", void 0);
UxTag = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-tag')
], UxTag);
export { UxTag };
