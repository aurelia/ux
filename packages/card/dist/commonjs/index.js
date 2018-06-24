'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaDependencyInjection = require('aurelia-dependency-injection');
var aureliaTemplating = require('aurelia-templating');
var core = require('@aurelia-ux/core');

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

var UX_CARD_VIEW = "<template> <require from=\"@aurelia-ux/card/ux-card.css\"></require> <slot></slot> </template> ";

var UxCard = /** @class */ (function () {
    function UxCard(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxCard.prototype.bind = function () {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
    };
    UxCard.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    };
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

var UxCardTheme = /** @class */ (function () {
    function UxCardTheme() {
        this.themeKey = 'card';
    }
    return UxCardTheme;
}());

function configure(config) {
    config.globalResources(UxCard);
}

exports.configure = configure;
exports.UxCardTheme = UxCardTheme;
