import { bindable, customElement, inlineView } from 'aurelia-templating';
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var uxList = "<template role=\"list\" class=\"ux-list\"> <require from=\"@aurelia-ux/list/ux-list.css\"></require> <slot></slot> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxList
});

let UxList = class UxList {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    bind() {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
        this.typeChanged(this.type);
    }
    typeChanged(newValue, oldValue) {
        if (typeof oldValue === 'string') {
            this.element.classList.remove(`ux-list--${oldValue}`);
        }
        if (typeof newValue === 'string') {
            this.element.classList.add(`ux-list--${newValue}`);
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
};
__decorate([
    bindable
], UxList.prototype, "theme", void 0);
__decorate([
    bindable
], UxList.prototype, "type", void 0);
UxList = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-list'),
    inlineView(VIEW)
], UxList);

var uxListItem = "<template role=\"listitem\" class=\"ux-list-item\"> <slot></slot> </template> ";

var VIEW$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxListItem
});

let UxListItem = class UxListItem {
    constructor() {
        this.theme = null;
    }
};
__decorate([
    bindable
], UxListItem.prototype, "theme", void 0);
UxListItem = __decorate([
    customElement('ux-list-item'),
    inlineView(VIEW$1)
], UxListItem);

class UxListTheme {
    constructor() {
        this.themeKey = 'list';
    }
}

function configure(config) {
    config.globalResources([
        UxList,
        UxListItem
    ]);
}

export { UxList, UxListItem, UxListTheme, configure };
//# sourceMappingURL=index.js.map
