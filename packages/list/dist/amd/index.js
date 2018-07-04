define('@aurelia-ux/list', ['exports', 'aurelia-templating', 'aurelia-dependency-injection', '@aurelia-ux/core', 'aurelia-framework'], function (exports, aureliaTemplating, aureliaDependencyInjection, core, aureliaFramework) { 'use strict';

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

    var UX_LIST_VIEW = "<template role=\"list\"> <slot></slot> </template> ";

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
            aureliaTemplating.bindable
        ], UxList.prototype, "theme", void 0);
        UxList = __decorate([
            aureliaDependencyInjection.inject(Element, core.StyleEngine),
            aureliaTemplating.customElement('ux-list'),
            aureliaTemplating.inlineView(UX_LIST_VIEW)
        ], UxList);
        return UxList;
    }());

    var UX_LIST_ITEM_VIEW = "<template role=\"listitem\"> <slot></slot> </template> ";

    var UxListItem = /** @class */ (function () {
        function UxListItem() {
            this.theme = null;
        }
        __decorate([
            aureliaTemplating.bindable
        ], UxListItem.prototype, "theme", void 0);
        UxListItem = __decorate([
            aureliaTemplating.customElement('ux-list-item'),
            aureliaTemplating.inlineView(UX_LIST_ITEM_VIEW)
        ], UxListItem);
        return UxListItem;
    }());

    var css = "ux-list{display:block;background-color:transparent;background-color:var(--ux-theme--list-background, transparent)}ux-list>.ux-list-item,ux-list>ux-list-item{display:flex;align-items:center;padding:16px;font-size:16px;color:inherit;color:var(--ux-theme--list-foreground, inherit);text-decoration:none}ux-list>.ux-list-item>.detail,ux-list>ux-list-item>.detail{margin-right:32px}ux-list>.ux-list-item>.detail.avatar,ux-list>ux-list-item>.detail.avatar{width:40px;height:40px;border-radius:50%;margin-right:16px}ux-list>.ux-list-item>.action-item,ux-list>ux-list-item>.action-item{display:flex;align-items:center;justify-content:center;min-width:24px;min-height:24px;padding-right:0;padding-left:16px}ux-list>.ux-list-item>.list-content,ux-list>ux-list-item>.list-content{display:flex;flex-direction:column;flex-grow:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:.03em}ux-list>.ux-list-item>a.list-content,ux-list>ux-list-item>a.list-content{margin:-16px;padding:16px;text-decoration:none}ux-list>.ux-list-item>.list-content>.secondary,ux-list>ux-list-item>.list-content>.secondary{font-size:14px;color:#888;color:var(--ux-theme--list-secondary-foreground, #888)}ux-list[type=two-line]>.ux-list-item>.list-content,ux-list[type=two-line]>ux-list-item{overflow:inherit;text-overflow:inherit;white-space:inherit}ux-list[type=two-line]>.ux-list-item>.list-content>.secondary,ux-list[type=two-line]>ux-list-item>.list-content>.secondary{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}ux-list[type=three-line]>.ux-list-item,ux-list[type=three-line]>ux-list-item{align-items:flex-start}ux-list[type=three-line]>.ux-list-item>.list-content>.secondary,ux-list[type=three-line]>ux-list-item>.list-content>.secondary{overflow:hidden;text-overflow:ellipsis;white-space:normal;line-height:1.2;height:2.4em}";

    var UxListTheme = /** @class */ (function () {
        function UxListTheme() {
            this.themeKey = 'list';
        }
        return UxListTheme;
    }());

    function configure(config) {
        aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-list-css');
        config.globalResources([
            UxList,
            UxListItem
        ]);
    }

    exports.configure = configure;
    exports.UxListTheme = UxListTheme;

    Object.defineProperty(exports, '__esModule', { value: true });

});
