'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaPal = require('aurelia-pal');

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

var UX_GRID_VIEW = "<template> <require from=\"@aurelia-ux/grid/ux-grid.css\"></require> <slot></slot> </template> ";

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
    config.globalResources(UxGrid);
}

exports.configure = configure;
exports.UxGridTheme = UxGridTheme;
exports.UxResponsiveUtilities = UxResponsiveUtilities;
