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
var UxInputInfo = (function () {
    function UxInputInfo(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.uxInputCounter = null;
        this.theme = null;
    }
    UxInputInfo.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxInputInfo.prototype.bind = function () {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.target === undefined) {
            this.findAndSetTarget(this.element);
        }
    };
    UxInputInfo.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxInputInfo.prototype.findAndSetTarget = function (element) {
        var inputElement = element.previousElementSibling;
        if (!inputElement) {
            return;
        }
        if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
            this.target = inputElement.au.controller.viewModel;
        }
    };
    return UxInputInfo;
}());
__decorate([
    bindable
], UxInputInfo.prototype, "target", void 0);
__decorate([
    bindable
], UxInputInfo.prototype, "uxInputCounter", void 0);
__decorate([
    bindable
], UxInputInfo.prototype, "theme", void 0);
UxInputInfo = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-input-info'),
    processAttributes(processDesignAttributes)
], UxInputInfo);
export { UxInputInfo };
