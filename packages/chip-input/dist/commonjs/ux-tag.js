"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var UxTag = /** @class */ (function () {
    function UxTag(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = undefined;
    }
    UxTag.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    UxTag.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'tag';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxTag.prototype.closeTag = function () {
        var closeEvent = aurelia_pal_1.DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    };
    __decorate([
        aurelia_templating_1.bindable
    ], UxTag.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxTag.prototype, "type", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxTag.prototype, "value", void 0);
    UxTag = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-tag')
    ], UxTag);
    return UxTag;
}());
exports.UxTag = UxTag;
