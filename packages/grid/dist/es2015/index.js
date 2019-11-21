import { bindable, customElement, inlineView } from 'aurelia-templating';
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var uxGrid = "<template class=\"ux-grid\"> <require from=\"@aurelia-ux/grid/ux-grid.css\"></require> <slot></slot> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxGrid
});

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
        this.processAttributes();
    }
    processAttributes() {
        const alignAttributes = [
            'align-cells-top',
            'align-cells-middle',
            'align-cells-bottom',
            'fixed',
            'remove-padding'
        ];
        for (const attribute of alignAttributes) {
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add(`ux-grid--${attribute}`);
            }
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
    inlineView(VIEW)
], UxGrid);

var uxGridCell = "<template class=\"ux-grid-cell\"> <slot></slot> </template> ";

var VIEW$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxGridCell
});

let UxGridCell = class UxGridCell {
    constructor(element) {
        this.element = element;
    }
    bind() {
        return __awaiter(this, void 0, void 0, function* () {
            this.processAttributes();
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        });
    }
    processAttributes() {
        const alignAttributes = [
            'align-self-top',
            'align-self-middle',
            'align-self-bottom',
            'align-self-stretch'
        ];
        for (const attribute of alignAttributes) {
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add(`ux-grid-cell--${attribute}`);
            }
        }
    }
    xsChanged(newValue) {
        this.sizeChanged('xs', newValue);
    }
    smChanged(newValue) {
        this.sizeChanged('sm', newValue);
    }
    mdChanged(newValue) {
        this.sizeChanged('md', newValue);
    }
    lgChanged(newValue) {
        this.sizeChanged('lg', newValue);
    }
    xlChanged(newValue) {
        this.sizeChanged('xl', newValue);
    }
    sizeChanged(size, value) {
        for (let i = 0; i < 10; i++) {
            this.element.classList.remove(`ux-grid-cell--${size}-${i}`);
            this.element.classList.remove(`ux-grid-cell--order-${this.order}-${size}-${i}`);
        }
        if (typeof value === 'string') {
            this.element.classList.add(`ux-grid-cell--${size}-${value}`);
            if (typeof this.order === 'string') {
                this.element.classList.add(`ux-grid-cell--order-${this.order}-${size}-${value}`);
            }
        }
    }
    orderChanged() {
        this.xsChanged(this.xs);
        this.smChanged(this.sm);
        this.mdChanged(this.md);
        this.lgChanged(this.lg);
        this.xlChanged(this.xl);
    }
};
__decorate([
    bindable
], UxGridCell.prototype, "xs", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "sm", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "md", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "lg", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "xl", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "order", void 0);
UxGridCell = __decorate([
    inject(Element),
    customElement('ux-grid-cell'),
    inlineView(VIEW$1)
], UxGridCell);

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
        PLATFORM.global.addEventListener('resize', () => this.onResize());
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
        PLATFORM.global.removeEventListener('resize', this.calculateResponsiveValues);
    }
}

class UxGridTheme {
    constructor() {
        this.themeKey = 'grid';
    }
}

function configure(config) {
    config.globalResources([
        UxGrid,
        UxGridCell
    ]);
}

export { UxGrid, UxGridCell, UxGridTheme, UxResponsiveUtilities, configure };
//# sourceMappingURL=index.js.map
