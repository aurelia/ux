var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, observable } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
let UxChip = class UxChip {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.variant = 'filled';
        this.selectedIcon = 'check';
        this.focused = false;
        this.selected = undefined;
    }
    bind() {
        this.themeChanged(this.theme);
        if (this.element.hasAttribute('deletable')) {
            this.element.removeAttribute('deletable');
            this.element.classList.add('ux-chip--deletable');
        }
    }
    attached() {
        this.isFocused = () => {
            this.focused = document.activeElement === this.element;
        };
        window.addEventListener('focus', this.isFocused, true);
        window.addEventListener('blur', this.isFocused, true);
    }
    detached() {
        window.removeEventListener('focus', this.isFocused, true);
        window.removeEventListener('blur', this.isFocused, true);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    closeChip(event) {
        if (event) {
            event.stopPropagation();
        }
        const closeEvent = DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    }
};
__decorate([
    bindable
], UxChip.prototype, "theme", void 0);
__decorate([
    bindable
], UxChip.prototype, "variant", void 0);
__decorate([
    bindable
], UxChip.prototype, "selectedIcon", void 0);
__decorate([
    observable
], UxChip.prototype, "focused", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChip.prototype, "selected", void 0);
UxChip = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-chip')
], UxChip);
export { UxChip };
//# sourceMappingURL=ux-chip.js.map