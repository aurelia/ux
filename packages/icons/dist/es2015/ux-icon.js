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
import IconMap from './ux-icon-map';
let UxIcon = class UxIcon {
    constructor(element, styleEngine, logger) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.logger = logger;
        this.icon = undefined;
    }
    bind() {
        if (this.size) {
            this.theme.size = this.size;
        }
        if (this.icon) {
            this.changeIcon(this.icon);
        }
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    }
    iconChanged(newValue) {
        this.changeIcon(newValue);
    }
    changeIcon(icon) {
        const iconSet = IconMap.Map.find(set => set.name === icon);
        if (iconSet) {
            // todo: add logic to switch set being used based on design language
            // after adding icon sets for said languages such as ios
            this.element.innerHTML = iconSet.material;
        }
        else {
            this.logger.error('ux-icon: no matching icon found', this.element);
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
    inject(Element, StyleEngine, Logger),
    customElement('ux-icon'),
    processAttributes(processDesignAttributes)
], UxIcon);
export { UxIcon };
