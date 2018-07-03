'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaPal = require('aurelia-pal');
var aureliaFramework = require('aurelia-framework');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var UX_GRID_VIEW = "<template> <slot></slot> </template> ";

var UxGrid = /** @class */ (function () {
    function UxGrid(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxGrid.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.columns != null) {
            this.columnsChanged(this.columns);
        }
    };
    UxGrid.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'grid';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxGrid.prototype.columnsChanged = function (newValue) {
        if (newValue != null) {
            this.element.style.setProperty('grid-template-columns', "repeat(" + newValue + ", 1fr)");
        }
    };
    __decorate([
        aureliaTemplating.bindable
    ], UxGrid.prototype, "theme", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxGrid.prototype, "columns", void 0);
    UxGrid = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-grid'),
        aureliaTemplating.inlineView(UX_GRID_VIEW)
    ], UxGrid);
    return UxGrid;
}());

var css = "ux-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-gap:16px;grid-gap:var(--ux-theme--grid-gutter-spacing, 16px);margin-left:auto;margin-right:auto;padding:16px;padding:var(--ux-theme--grid-outer-padding, 16px);box-sizing:border-box;width:100%;align-items:stretch;max-width:none}ux-grid+ux-grid{padding-top:0}ux-grid.remove-padding,ux-grid[remove-padding]{padding:0}ux-grid.align-cells-top,ux-grid[align-cells-top]{align-items:flex-start}ux-grid.align-cells-middle,ux-grid[align-cells-middle]{align-items:center}ux-grid.align-cells-bottom,ux-grid[align-cells-bottom]{align-items:flex-end}ux-grid>ux-grid-cell.align-self-top,ux-grid>ux-grid-cell[align-self-top]{align-self:flex-start}ux-grid>ux-grid-cell.align-self-middle,ux-grid>ux-grid-cell[align-self-middle]{align-self:center}ux-grid>ux-grid-cell.align-self-bottom,ux-grid>ux-grid-cell[align-self-bottom]{align-self:flex-end}ux-grid>ux-grid-cell.align-self-stretch,ux-grid>ux-grid-cell[align-self-stretch]{align-self:stretch}ux-grid>ux-grid-cell{display:block;grid-column:span 12;max-width:100%}ux-grid>ux-grid-cell[xs=\"0\"]{display:none}ux-grid>ux-grid-cell[xs=\"1\"]{grid-column:span 1}ux-grid>ux-grid-cell[xs=\"2\"]{grid-column:span 2}ux-grid>ux-grid-cell[xs=\"3\"]{grid-column:span 3}ux-grid>ux-grid-cell[xs=\"4\"]{grid-column:span 4}ux-grid>ux-grid-cell[xs=\"5\"]{grid-column:span 5}ux-grid>ux-grid-cell[xs=\"6\"]{grid-column:span 6}ux-grid>ux-grid-cell[xs=\"7\"]{grid-column:span 7}ux-grid>ux-grid-cell[xs=\"8\"]{grid-column:span 8}ux-grid>ux-grid-cell[xs=\"9\"]{grid-column:span 9}ux-grid>ux-grid-cell[xs=\"10\"]{grid-column:span 10}ux-grid>ux-grid-cell[xs=\"11\"]{grid-column:span 11}ux-grid>ux-grid-cell[xs=\"12\"]{grid-column:span 12}ux-grid>ux-grid-cell[order-xs=\"-1\"]{order:-1}ux-grid>ux-grid-cell[order-xs=\"0\"]{order:0}ux-grid>ux-grid-cell[order-xs=\"1\"]{order:1}ux-grid>ux-grid-cell[order-xs=\"2\"]{order:2}ux-grid>ux-grid-cell[order-xs=\"3\"]{order:3}ux-grid>ux-grid-cell[order-xs=\"4\"]{order:4}ux-grid>ux-grid-cell[order-xs=\"5\"]{order:5}ux-grid>ux-grid-cell[order-xs=\"6\"]{order:6}ux-grid>ux-grid-cell[order-xs=\"7\"]{order:7}ux-grid>ux-grid-cell[order-xs=\"8\"]{order:8}ux-grid>ux-grid-cell[order-xs=\"9\"]{order:9}ux-grid>ux-grid-cell[order-xs=\"10\"]{order:10}@media (min-width:480px){ux-grid>ux-grid-cell[sm=\"0\"]{display:none}ux-grid>ux-grid-cell[sm=\"1\"]{grid-column:span 1}ux-grid>ux-grid-cell[sm=\"2\"]{grid-column:span 2}ux-grid>ux-grid-cell[sm=\"3\"]{grid-column:span 3}ux-grid>ux-grid-cell[sm=\"4\"]{grid-column:span 4}ux-grid>ux-grid-cell[sm=\"5\"]{grid-column:span 5}ux-grid>ux-grid-cell[sm=\"6\"]{grid-column:span 6}ux-grid>ux-grid-cell[sm=\"7\"]{grid-column:span 7}ux-grid>ux-grid-cell[sm=\"8\"]{grid-column:span 8}ux-grid>ux-grid-cell[sm=\"9\"]{grid-column:span 9}ux-grid>ux-grid-cell[sm=\"10\"]{grid-column:span 10}ux-grid>ux-grid-cell[sm=\"11\"]{grid-column:span 11}ux-grid>ux-grid-cell[sm=\"12\"]{grid-column:span 12}ux-grid>ux-grid-cell[order-sm=\"-1\"]{order:-1}ux-grid>ux-grid-cell[order-sm=\"0\"]{order:0}ux-grid>ux-grid-cell[order-sm=\"1\"]{order:1}ux-grid>ux-grid-cell[order-sm=\"2\"]{order:2}ux-grid>ux-grid-cell[order-sm=\"3\"]{order:3}ux-grid>ux-grid-cell[order-sm=\"4\"]{order:4}ux-grid>ux-grid-cell[order-sm=\"5\"]{order:5}ux-grid>ux-grid-cell[order-sm=\"6\"]{order:6}ux-grid>ux-grid-cell[order-sm=\"7\"]{order:7}ux-grid>ux-grid-cell[order-sm=\"8\"]{order:8}ux-grid>ux-grid-cell[order-sm=\"9\"]{order:9}ux-grid>ux-grid-cell[order-sm=\"10\"]{order:10}}@media (min-width:960px){ux-grid.fixed,ux-grid[fixed]{max-width:calc(960px - 32px)}ux-grid>ux-grid-cell[md=\"0\"]{display:none}ux-grid>ux-grid-cell[md=\"1\"]{grid-column:span 1}ux-grid>ux-grid-cell[md=\"2\"]{grid-column:span 2}ux-grid>ux-grid-cell[md=\"3\"]{grid-column:span 3}ux-grid>ux-grid-cell[md=\"4\"]{grid-column:span 4}ux-grid>ux-grid-cell[md=\"5\"]{grid-column:span 5}ux-grid>ux-grid-cell[md=\"6\"]{grid-column:span 6}ux-grid>ux-grid-cell[md=\"7\"]{grid-column:span 7}ux-grid>ux-grid-cell[md=\"8\"]{grid-column:span 8}ux-grid>ux-grid-cell[md=\"9\"]{grid-column:span 9}ux-grid>ux-grid-cell[md=\"10\"]{grid-column:span 10}ux-grid>ux-grid-cell[md=\"11\"]{grid-column:span 11}ux-grid>ux-grid-cell[md=\"12\"]{grid-column:span 12}ux-grid>ux-grid-cell[order-md=\"-1\"]{order:-1}ux-grid>ux-grid-cell[order-md=\"0\"]{order:0}ux-grid>ux-grid-cell[order-md=\"1\"]{order:1}ux-grid>ux-grid-cell[order-md=\"2\"]{order:2}ux-grid>ux-grid-cell[order-md=\"3\"]{order:3}ux-grid>ux-grid-cell[order-md=\"4\"]{order:4}ux-grid>ux-grid-cell[order-md=\"5\"]{order:5}ux-grid>ux-grid-cell[order-md=\"6\"]{order:6}ux-grid>ux-grid-cell[order-md=\"7\"]{order:7}ux-grid>ux-grid-cell[order-md=\"8\"]{order:8}ux-grid>ux-grid-cell[order-md=\"9\"]{order:9}ux-grid>ux-grid-cell[order-md=\"10\"]{order:10}}@media (min-width:1280px){ux-grid.fixed,ux-grid[fixed]{max-width:calc(1280px - 32px)}ux-grid>ux-grid-cell[lg=\"0\"]{display:none}ux-grid>ux-grid-cell[lg=\"1\"]{grid-column:span 1}ux-grid>ux-grid-cell[lg=\"2\"]{grid-column:span 2}ux-grid>ux-grid-cell[lg=\"3\"]{grid-column:span 3}ux-grid>ux-grid-cell[lg=\"4\"]{grid-column:span 4}ux-grid>ux-grid-cell[lg=\"5\"]{grid-column:span 5}ux-grid>ux-grid-cell[lg=\"6\"]{grid-column:span 6}ux-grid>ux-grid-cell[lg=\"7\"]{grid-column:span 7}ux-grid>ux-grid-cell[lg=\"8\"]{grid-column:span 8}ux-grid>ux-grid-cell[lg=\"9\"]{grid-column:span 9}ux-grid>ux-grid-cell[lg=\"10\"]{grid-column:span 10}ux-grid>ux-grid-cell[lg=\"11\"]{grid-column:span 11}ux-grid>ux-grid-cell[lg=\"12\"]{grid-column:span 12}ux-grid>ux-grid-cell[order-lg=\"-1\"]{order:-1}ux-grid>ux-grid-cell[order-lg=\"0\"]{order:0}ux-grid>ux-grid-cell[order-lg=\"1\"]{order:1}ux-grid>ux-grid-cell[order-lg=\"2\"]{order:2}ux-grid>ux-grid-cell[order-lg=\"3\"]{order:3}ux-grid>ux-grid-cell[order-lg=\"4\"]{order:4}ux-grid>ux-grid-cell[order-lg=\"5\"]{order:5}ux-grid>ux-grid-cell[order-lg=\"6\"]{order:6}ux-grid>ux-grid-cell[order-lg=\"7\"]{order:7}ux-grid>ux-grid-cell[order-lg=\"8\"]{order:8}ux-grid>ux-grid-cell[order-lg=\"9\"]{order:9}ux-grid>ux-grid-cell[order-lg=\"10\"]{order:10}}@media (min-width:1925px){ux-grid.fixed,ux-grid[fixed]{max-width:calc(1920px - 32px)}ux-grid>ux-grid-cell[xl=\"0\"]{display:none}ux-grid>ux-grid-cell[xl=\"1\"]{grid-column:span 1}ux-grid>ux-grid-cell[xl=\"2\"]{grid-column:span 2}ux-grid>ux-grid-cell[xl=\"3\"]{grid-column:span 3}ux-grid>ux-grid-cell[xl=\"4\"]{grid-column:span 4}ux-grid>ux-grid-cell[xl=\"5\"]{grid-column:span 5}ux-grid>ux-grid-cell[xl=\"6\"]{grid-column:span 6}ux-grid>ux-grid-cell[xl=\"7\"]{grid-column:span 7}ux-grid>ux-grid-cell[xl=\"8\"]{grid-column:span 8}ux-grid>ux-grid-cell[xl=\"9\"]{grid-column:span 9}ux-grid>ux-grid-cell[xl=\"10\"]{grid-column:span 10}ux-grid>ux-grid-cell[xl=\"11\"]{grid-column:span 11}ux-grid>ux-grid-cell[xl=\"12\"]{grid-column:span 12}ux-grid>ux-grid-cell[order-xl=\"-1\"]{order:-1}ux-grid>ux-grid-cell[order-xl=\"0\"]{order:0}ux-grid>ux-grid-cell[order-xl=\"1\"]{order:1}ux-grid>ux-grid-cell[order-xl=\"2\"]{order:2}ux-grid>ux-grid-cell[order-xl=\"3\"]{order:3}ux-grid>ux-grid-cell[order-xl=\"4\"]{order:4}ux-grid>ux-grid-cell[order-xl=\"5\"]{order:5}ux-grid>ux-grid-cell[order-xl=\"6\"]{order:6}ux-grid>ux-grid-cell[order-xl=\"7\"]{order:7}ux-grid>ux-grid-cell[order-xl=\"8\"]{order:8}ux-grid>ux-grid-cell[order-xl=\"9\"]{order:9}ux-grid>ux-grid-cell[order-xl=\"10\"]{order:10}}"

var UxGridTheme = /** @class */ (function () {
    function UxGridTheme() {
        this.themeKey = 'grid';
    }
    return UxGridTheme;
}());

/** Utility class that assists with designing a responsive site. */
var UxResponsiveUtilities = /** @class */ (function () {
    function UxResponsiveUtilities() {
        var _this = this;
        /** Visible on screens smaller than 480px. */
        this.xs = false;
        /** Visible on screens larger than 480px, and smaller than 960px. */
        this.sm = false;
        /** Visible on screens larger than 960px, and smaller than 1280px. */
        this.md = false;
        /** Visible on screens larger than 1280px, and smaller than 1925px. */
        this.lg = false;
        /** Visible on screens larger than 1925px. */
        this.xl = false;
        this.updating = false;
        this.resizeHandler = function () { return _this.onResize(); };
        this.calculateResponsiveValues = function () {
            _this.height = aureliaPal.PLATFORM.global.innerHeight;
            _this.width = aureliaPal.PLATFORM.global.innerWidth;
            _this.xs = _this.width <= 480;
            _this.sm = _this.width > 480 && _this.width <= 960;
            _this.md = _this.width > 960 && _this.width <= 1280;
            _this.lg = _this.width > 1280 && _this.width <= 1925;
            _this.xl = _this.width > 1925;
            _this.updating = false;
        };
        aureliaPal.PLATFORM.global.addEventListener('resize', this.resizeHandler);
        this.calculateResponsiveValues();
    }
    UxResponsiveUtilities.prototype.onResize = function () {
        if (this.updating) {
            return;
        }
        this.updating = true;
        if (aureliaPal.PLATFORM.global.requestAnimationFrame) {
            aureliaPal.PLATFORM.global.requestAnimationFrame(this.calculateResponsiveValues);
        }
        else {
            setTimeout(this.calculateResponsiveValues, 100);
        }
    };
    UxResponsiveUtilities.prototype.dispose = function () {
        aureliaPal.PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    };
    return UxResponsiveUtilities;
}());

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-grid-css');
    config.globalResources(UxGrid);
}

exports.configure = configure;
exports.UxGridTheme = UxGridTheme;
exports.UxResponsiveUtilities = UxResponsiveUtilities;
