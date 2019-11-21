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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var uxGrid = "<template class=\"ux-grid\"> <require from=\"@aurelia-ux/grid/ux-grid.css\"></require> <slot></slot> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxGrid
});

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
        this.processAttributes();
    };
    UxGrid.prototype.processAttributes = function () {
        var alignAttributes = [
            'align-cells-top',
            'align-cells-middle',
            'align-cells-bottom',
            'fixed',
            'remove-padding'
        ];
        for (var _i = 0, alignAttributes_1 = alignAttributes; _i < alignAttributes_1.length; _i++) {
            var attribute = alignAttributes_1[_i];
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add("ux-grid--" + attribute);
            }
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
    return UxGrid;
}());

var uxGridCell = "<template class=\"ux-grid-cell\"> <slot></slot> </template> ";

var VIEW$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxGridCell
});

var UxGridCell = /** @class */ (function () {
    function UxGridCell(element) {
        this.element = element;
    }
    UxGridCell.prototype.bind = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.processAttributes();
                this.xsChanged(this.xs);
                this.smChanged(this.sm);
                this.mdChanged(this.md);
                this.lgChanged(this.lg);
                this.xlChanged(this.xl);
                return [2 /*return*/];
            });
        });
    };
    UxGridCell.prototype.processAttributes = function () {
        var alignAttributes = [
            'align-self-top',
            'align-self-middle',
            'align-self-bottom',
            'align-self-stretch'
        ];
        for (var _i = 0, alignAttributes_1 = alignAttributes; _i < alignAttributes_1.length; _i++) {
            var attribute = alignAttributes_1[_i];
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add("ux-grid-cell--" + attribute);
            }
        }
    };
    UxGridCell.prototype.xsChanged = function (newValue) {
        this.sizeChanged('xs', newValue);
    };
    UxGridCell.prototype.smChanged = function (newValue) {
        this.sizeChanged('sm', newValue);
    };
    UxGridCell.prototype.mdChanged = function (newValue) {
        this.sizeChanged('md', newValue);
    };
    UxGridCell.prototype.lgChanged = function (newValue) {
        this.sizeChanged('lg', newValue);
    };
    UxGridCell.prototype.xlChanged = function (newValue) {
        this.sizeChanged('xl', newValue);
    };
    UxGridCell.prototype.sizeChanged = function (size, value) {
        for (var i = 0; i < 10; i++) {
            this.element.classList.remove("ux-grid-cell--" + size + "-" + i);
            this.element.classList.remove("ux-grid-cell--order-" + this.order + "-" + size + "-" + i);
        }
        if (typeof value === 'string') {
            this.element.classList.add("ux-grid-cell--" + size + "-" + value);
            if (typeof this.order === 'string') {
                this.element.classList.add("ux-grid-cell--order-" + this.order + "-" + size + "-" + value);
            }
        }
    };
    UxGridCell.prototype.orderChanged = function () {
        this.xsChanged(this.xs);
        this.smChanged(this.sm);
        this.mdChanged(this.md);
        this.lgChanged(this.lg);
        this.xlChanged(this.xl);
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
    return UxGridCell;
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
        this.calculateResponsiveValues = function () {
            _this.height = PLATFORM.global.innerHeight;
            _this.width = PLATFORM.global.innerWidth;
            _this.xs = _this.width <= 480;
            _this.sm = _this.width > 480 && _this.width <= 960;
            _this.md = _this.width > 960 && _this.width <= 1280;
            _this.lg = _this.width > 1280 && _this.width <= 1925;
            _this.xl = _this.width > 1925;
            _this.updating = false;
        };
        PLATFORM.global.addEventListener('resize', function () { return _this.onResize(); });
        this.calculateResponsiveValues();
    }
    UxResponsiveUtilities.prototype.onResize = function () {
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
    };
    UxResponsiveUtilities.prototype.dispose = function () {
        PLATFORM.global.removeEventListener('resize', this.calculateResponsiveValues);
    };
    return UxResponsiveUtilities;
}());

var UxGridTheme = /** @class */ (function () {
    function UxGridTheme() {
        this.themeKey = 'grid';
    }
    return UxGridTheme;
}());

function configure(config) {
    config.globalResources([
        UxGrid,
        UxGridCell
    ]);
}

export { UxGrid, UxGridCell, UxGridTheme, UxResponsiveUtilities, configure };
//# sourceMappingURL=index.js.map
