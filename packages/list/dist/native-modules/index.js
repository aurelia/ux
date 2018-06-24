import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';

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

var UX_LIST_VIEW = "<template role=\"list\"> <require from=\"@aurelia-ux/list/ux-list.css\"></require> <slot></slot> </template> ";

var UxList = /** @class */ (function () {
    function UxList(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    UxList.prototype.bind = function () {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
    };
    UxList.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], UxList.prototype, "theme", void 0);
    UxList = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-list'),
        inlineView(UX_LIST_VIEW)
    ], UxList);
    return UxList;
}());

var UX_LIST_ITEM_VIEW = "<template role=\"listitem\"> <slot></slot> </template> ";

var UxListItem = /** @class */ (function () {
    function UxListItem() {
        this.theme = null;
    }
    __decorate([
        bindable
    ], UxListItem.prototype, "theme", void 0);
    UxListItem = __decorate([
        customElement('ux-list-item'),
        inlineView(UX_LIST_ITEM_VIEW)
    ], UxListItem);
    return UxListItem;
}());

var UxListTheme = /** @class */ (function () {
    function UxListTheme() {
        this.themeKey = 'list';
    }
    return UxListTheme;
}());

function configure(config) {
    config.globalResources([
        UxList,
        UxListItem
    ]);
}

export { configure, UxListTheme };
