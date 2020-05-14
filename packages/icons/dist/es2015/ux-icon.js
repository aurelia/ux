var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, processAttributes } from 'aurelia-templating';
import { Logger } from 'aurelia-logging';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, processDesignAttributes } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
import { UxIconMap } from './ux-icon-map';
let UxIcon = class UxIcon {
    constructor(element, iconMap, styleEngine, logger) {
        this.element = element;
        this.iconMap = iconMap;
        this.styleEngine = styleEngine;
        this.logger = logger;
        this.icon = undefined;
    }
    bind() {
        if (this.icon) {
            this.changeIcon(this.icon);
        }
        this.sizeChanged(this.size);
        this.themeChanged(this.theme);
    }
    sizeChanged(newValue) {
        if (this.size) {
            if (this.theme === undefined) {
                this.theme = new UxIconTheme();
            }
            this.theme.size = newValue;
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    }
    iconChanged(newValue) {
        this.changeIcon(newValue);
    }
    changeIcon(icon) {
        const material = this.iconMap.get(icon);
        if (material) {
            this.element.innerHTML = material;
        }
        else {
            this.logger.warn('ux-icon: no matching icon found', this.element);
        }
    }
};
__decorate([
    bindable
], UxIcon.prototype, "size", void 0);
__decorate([
    bindable
], UxIcon.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxIcon.prototype, "icon", void 0);
UxIcon = __decorate([
    inject(Element, UxIconMap, StyleEngine, Logger),
    customElement('ux-icon'),
    processAttributes(processDesignAttributes)
], UxIcon);
export { UxIcon };
//# sourceMappingURL=ux-icon.js.map