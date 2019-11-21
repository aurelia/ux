define('@aurelia-ux/card', ['exports', 'aurelia-dependency-injection', 'aurelia-templating', '@aurelia-ux/core'], function (exports, aureliaDependencyInjection, aureliaTemplating, core) { 'use strict';

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

    var uxCard = "<template class=\"ux-card\"> <require from=\"@aurelia-ux/card/ux-card.css\"></require> <slot></slot> </template> ";

    var UX_CARD_VIEW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxCard
    });

    var UxCard = /** @class */ (function () {
        function UxCard(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        UxCard.prototype.bind = function () {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        };
        UxCard.prototype.xsChanged = function (newValue) {
            this.sizeChanged('xs', newValue);
        };
        UxCard.prototype.smChanged = function (newValue) {
            this.sizeChanged('sm', newValue);
        };
        UxCard.prototype.mdChanged = function (newValue) {
            this.sizeChanged('md', newValue);
        };
        UxCard.prototype.lgChanged = function (newValue) {
            this.sizeChanged('lg', newValue);
        };
        UxCard.prototype.xlChanged = function (newValue) {
            this.sizeChanged('xl', newValue);
        };
        UxCard.prototype.sizeChanged = function (size, value) {
            for (var i = 0; i < 10; i++) {
                this.element.classList.remove("ux-card--" + size + "-" + i);
                this.element.classList.remove("ux-card--order-" + this.order + "-" + size + "-" + i);
            }
            if (typeof value === 'string') {
                this.element.classList.add("ux-card--" + size + "-" + value);
                if (typeof this.order === 'string') {
                    this.element.classList.add("ux-card--order-" + this.order + "-" + size + "-" + value);
                }
            }
        };
        UxCard.prototype.orderChanged = function () {
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        };
        UxCard.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(newValue, this.element);
        };
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "xs", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "sm", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "md", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "lg", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "xl", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "order", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxCard.prototype, "theme", void 0);
        UxCard = __decorate([
            aureliaDependencyInjection.inject(Element, core.StyleEngine),
            aureliaTemplating.customElement('ux-card'),
            aureliaTemplating.inlineView(UX_CARD_VIEW)
        ], UxCard);
        return UxCard;
    }());

    var uxCardHeader = "<template class=\"ux-card__header\"> <slot></slot> </template> ";

    var UX_CARD_HEADER_VIEW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxCardHeader
    });

    var UxCardHeader = /** @class */ (function () {
        function UxCardHeader(element) {
            this.element = element;
        }
        UxCardHeader.prototype.bind = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.colorChanged(this.color);
                    return [2 /*return*/];
                });
            });
        };
        UxCardHeader.prototype.colorChanged = function (newValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.element.classList.remove('ux-card__header--accent', 'ux-card__header--primary');
                    if (newValue === 'primary') {
                        this.element.classList.add('ux-card__header--primary');
                    }
                    if (newValue === 'accent') {
                        this.element.classList.add('ux-card__header--accent');
                    }
                    return [2 /*return*/];
                });
            });
        };
        __decorate([
            aureliaTemplating.bindable
        ], UxCardHeader.prototype, "color", void 0);
        UxCardHeader = __decorate([
            aureliaDependencyInjection.inject(Element),
            aureliaTemplating.customElement('ux-card-header'),
            aureliaTemplating.inlineView(UX_CARD_HEADER_VIEW)
        ], UxCardHeader);
        return UxCardHeader;
    }());

    var uxCardActionRow = "<template class=\"ux-card__action-row\"> <slot></slot> </template> ";

    var UX_CARD_ACTION_ROW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxCardActionRow
    });

    var UxCardActionRow = /** @class */ (function () {
        function UxCardActionRow() {
        }
        UxCardActionRow = __decorate([
            aureliaTemplating.customElement('ux-card-action-row'),
            aureliaTemplating.inlineView(UX_CARD_ACTION_ROW)
        ], UxCardActionRow);
        return UxCardActionRow;
    }());

    var uxCardContent = "<template class=\"ux-card__content\"> <slot></slot> </template> ";

    var UX_CARD_CONTENT_VIEW = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxCardContent
    });

    var UxCardContent = /** @class */ (function () {
        function UxCardContent() {
        }
        UxCardContent = __decorate([
            aureliaTemplating.customElement('ux-card-content'),
            aureliaTemplating.inlineView(UX_CARD_CONTENT_VIEW)
        ], UxCardContent);
        return UxCardContent;
    }());

    var uxCardFooter = "<template class=\"ux-card__footer\"> <slot></slot> </template> ";

    var UX_CARD_FOOTER = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxCardFooter
    });

    var UxCardFooter = /** @class */ (function () {
        function UxCardFooter() {
        }
        UxCardFooter = __decorate([
            aureliaTemplating.customElement('ux-card-footer'),
            aureliaTemplating.inlineView(UX_CARD_FOOTER)
        ], UxCardFooter);
        return UxCardFooter;
    }());

    var UxCardTheme = /** @class */ (function () {
        function UxCardTheme() {
            this.themeKey = 'card';
        }
        return UxCardTheme;
    }());

    function configure(config) {
        config.globalResources([
            UxCard,
            UxCardHeader,
            UxCardActionRow,
            UxCardContent,
            UxCardFooter
        ]);
    }

    exports.UxCardTheme = UxCardTheme;
    exports.configure = configure;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map
