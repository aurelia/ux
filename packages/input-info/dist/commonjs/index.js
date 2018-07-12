'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = require('tslib');
var aureliaTemplating = require('aurelia-templating');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaFramework = require('aurelia-framework');

var UX_INPUT_INFO_VIEW = "<template> <span class=hint-text> <slot></slot> </span> <div class=counter if.bind=\"uxInputCounter !== null\"> <span>${target.value.length ? target.value.length : 0}</span> <span if.bind=\"target.maxlength > 0\">/${target.maxlength}</span> </div> </template> ";

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
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxInputInfo.prototype, "target", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxInputInfo.prototype, "uxInputCounter", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxInputInfo.prototype, "theme", void 0);
    UxInputInfo = tslib_1.__decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-input-info'),
        aureliaTemplating.inlineView(UX_INPUT_INFO_VIEW)
    ], UxInputInfo);
    return UxInputInfo;
}());

var UxInputInfoTheme = /** @class */ (function () {
    function UxInputInfoTheme() {
        this.themeKey = 'input-info';
    }
    return UxInputInfoTheme;
}());

var css = "ux-input-info{display:flex;font-size:14px;width:100%;color:#909090;color:var(--ux-theme--input-info-foreground, #909090)}ux-input-info>.hint-text,ux-input-info>.error-text{flex-grow:1}ux-input-info>.hint-text:first-child,ux-input-info>.error-text:first-child{display:block}ux-input-info>.hint-text,ux-input-info>.error-text{display:none}ux-input-info>.counter{transition:250ms;flex-wrap:nowrap;display:flex}ux-input.focused+ux-input-info>.counter{color:#ff4081;color:var(--ux-design--accent, #FF4081)}ux-input>input[disabled]+ux-input-info{display:none}.has-error+ux-input-info{color:#f44336;color:var(--ux-theme--input-info-error, #F44336)}"

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, false, 'ux-input-info-css');
    config.globalResources(UxInputInfo);
}

exports.configure = configure;
exports.UxInputInfoTheme = UxInputInfoTheme;
