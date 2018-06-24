import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { PLATFORM } from 'aurelia-pal';

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

let UxGrid = class UxGrid {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    bind() {
        this.themeChanged(this.theme);
        if (this.columns != null) {
            this.columnsChanged(this.columns);
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'grid';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    columnsChanged(newValue) {
        if (newValue != null) {
            this.element.style.setProperty('grid-template-columns', `repeat(${newValue}, 1fr)`);
        }
    }
};
__decorate([
    bindable
], UxGrid.prototype, "theme", void 0);
__decorate([
    bindable
], UxGrid.prototype, "columns", void 0);
UxGrid = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-grid'),
    inlineView(UX_GRID_VIEW)
], UxGrid);

class UxGridTheme {
    constructor() {
        this.themeKey = 'grid';
    }
}

/** Utility class that assists with designing a responsive site. */
class UxResponsiveUtilities {
    constructor() {
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
        this.resizeHandler = () => this.onResize();
        this.calculateResponsiveValues = () => {
            this.height = PLATFORM.global.innerHeight;
            this.width = PLATFORM.global.innerWidth;
            this.xs = this.width <= 480;
            this.sm = this.width > 480 && this.width <= 960;
            this.md = this.width > 960 && this.width <= 1280;
            this.lg = this.width > 1280 && this.width <= 1925;
            this.xl = this.width > 1925;
            this.updating = false;
        };
        PLATFORM.global.addEventListener('resize', this.resizeHandler);
        this.calculateResponsiveValues();
    }
    onResize() {
        if (this.updating) {
            return;
        }
        this.updating = true;
        if (PLATFORM.global.requestAnimationFrame) {
            PLATFORM.global.requestAnimationFrame(this.calculateResponsiveValues);
        }
        else {
            setTimeout(this.calculateResponsiveValues, 100);
        }
    }
    dispose() {
        PLATFORM.global.removeEventListener('resize', this.resizeHandler);
    }
}

function configure(config) {
    config.globalResources(UxGrid);
}

export { configure, UxGridTheme, UxResponsiveUtilities };
