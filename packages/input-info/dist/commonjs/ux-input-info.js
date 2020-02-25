"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_binding_1 = require("aurelia-binding");
var UxInputInfo = /** @class */ (function () {
    function UxInputInfo(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.uxInputCounter = null;
    }
    UxInputInfo.prototype.bind = function () {
        if (this.target === undefined) {
            this.findAndSetTarget(this.element);
        }
        this.themeChanged(this.theme);
    };
    UxInputInfo.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input-info';
        }
        this.styleEngine.applyTheme(newValue, this.element);
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
    Object.defineProperty(UxInputInfo.prototype, "maxLength", {
        get: function () {
            var target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.maxlength;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UxInputInfo.prototype, "length", {
        get: function () {
            var target = this.target;
            if (target.element.tagName === 'UX-INPUT' || target.element.tagName === 'UX-TEXTAREA') {
                return target.value.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "target", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "uxInputCounter", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "theme", void 0);
    __decorate([
        aurelia_binding_1.computedFrom('target.maxlength')
    ], UxInputInfo.prototype, "maxLength", null);
    __decorate([
        aurelia_binding_1.computedFrom('target.value')
    ], UxInputInfo.prototype, "length", null);
    UxInputInfo = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-input-info')
    ], UxInputInfo);
    return UxInputInfo;
}());
exports.UxInputInfo = UxInputInfo;
//# sourceMappingURL=ux-input-info.js.map