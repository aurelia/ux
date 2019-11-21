define('@aurelia-ux/list', ['exports', 'aurelia-templating', 'aurelia-dependency-injection', '@aurelia-ux/core'], function (exports, aureliaTemplating, aureliaDependencyInjection, core) { 'use strict';

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

    var UxList = /** @class */ (function () {
        function UxList(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        UxList.prototype.bind = function () {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.typeChanged(this.type);
        };
        UxList.prototype.typeChanged = function (newValue, oldValue) {
            if (typeof oldValue === 'string') {
                this.element.classList.remove("ux-list--" + oldValue);
            }
            if (typeof newValue === 'string') {
                this.element.classList.add("ux-list--" + newValue);
            }
        };
        UxList.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'list';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        __decorate([
            aureliaTemplating.bindable
        ], UxList.prototype, "theme", void 0);
        __decorate([
            aureliaTemplating.bindable
        ], UxList.prototype, "type", void 0);
        UxList = __decorate([
            aureliaDependencyInjection.inject(Element, core.StyleEngine),
            aureliaTemplating.customElement('ux-list'),
            aureliaTemplating.inlineView(VIEW)
        ], UxList);
        return UxList;
    }());

    var uxListItem = "<template role=\"listitem\" class=\"ux-list-item\"> <slot></slot> </template> ";

    var VIEW$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uxListItem
    });

    var UxListItem = /** @class */ (function () {
        function UxListItem() {
            this.theme = null;
        }
        __decorate([
            aureliaTemplating.bindable
        ], UxListItem.prototype, "theme", void 0);
        UxListItem = __decorate([
            aureliaTemplating.customElement('ux-list-item'),
            aureliaTemplating.inlineView(VIEW$1)
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

    exports.UxList = UxList;
    exports.UxListItem = UxListItem;
    exports.UxListTheme = UxListTheme;
    exports.configure = configure;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map
