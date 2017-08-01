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
import { PaperRipple } from '../effects/paper-ripple';
var UxButton = (function () {
    function UxButton(resources, styleEngine) {
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.type = null;
        this.size = null;
        this.effect = null;
        this.disabled = false;
        this.theme = null;
        this.ripple = null;
    }
    UxButton.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxButton.prototype.bind = function () {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        // ensure we cast empty string as true
        if (typeof this.disabled === 'string' && this.disabled === '') {
            this.disabled = true;
        }
        if (this.disabled) {
            this.button.setAttribute('disabled', '');
        }
    };
    UxButton.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxButton.prototype.disabledChanged = function (newValue) {
        // ensure we cast empty string as true
        if (typeof newValue === 'string' && newValue === '') {
            newValue = true;
        }
        if (newValue) {
            this.button.setAttribute('disabled', '');
        }
        else {
            this.button.removeAttribute('disabled');
        }
    };
    UxButton.prototype.onMouseDown = function (e) {
        if (this.button.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                this.button.appendChild(this.ripple.$);
            }
            if (this.button.classList.contains('fab') || this.button.classList.contains('icon')) {
                this.ripple.center = true;
                this.ripple.round = true;
            }
            this.ripple.downAction(e);
        }
        return true;
    };
    UxButton.prototype.onMouseUp = function () {
        if (this.button.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
        return true;
    };
    return UxButton;
}());
__decorate([
    bindable
], UxButton.prototype, "type", void 0);
__decorate([
    bindable
], UxButton.prototype, "size", void 0);
__decorate([
    bindable
], UxButton.prototype, "effect", void 0);
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
export { UxButton };
