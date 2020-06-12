"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxInputInfo = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_pal_1 = require("aurelia-pal");
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
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "target", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "uxInputCounter", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxInputInfo.prototype, "theme", void 0);
    tslib_1.__decorate([
        aurelia_binding_1.computedFrom('target.maxlength')
    ], UxInputInfo.prototype, "maxLength", null);
    tslib_1.__decorate([
        aurelia_binding_1.computedFrom('target.value')
    ], UxInputInfo.prototype, "length", null);
    UxInputInfo = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-input-info'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-input-info.html'))
    ], UxInputInfo);
    return UxInputInfo;
}());
exports.UxInputInfo = UxInputInfo;
//# sourceMappingURL=ux-input-info.js.map