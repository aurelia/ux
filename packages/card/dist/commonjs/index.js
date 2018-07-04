'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaDependencyInjection = require('aurelia-dependency-injection');
var aureliaTemplating = require('aurelia-templating');
var core = require('@aurelia-ux/core');
var aureliaFramework = require('aurelia-framework');

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

var UX_CARD_VIEW = "<template> <slot></slot> </template> ";

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

var css = "ux-card{display:flex;position:relative;flex-direction:column;box-sizing:border-box;padding:0;border-radius:2px;background-color:#fff;background-color:var(--ux-theme--card-background, var(--ux-design--control-background, #fff));color:#212121;color:var(--ux-theme--card-foreground, var(--ux-design--control-foreground, #212121));box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--ux-design--elevation2dp, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12))}ux-card ux-card-header,ux-card ux-card-content{padding:16px}ux-card ux-card-header{display:flex;flex-direction:column}ux-card ux-card-header ux-card-header-row{display:flex}ux-card ux-card-header ux-card-title{display:flex;flex-direction:column;font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-weight:400;text-decoration:inherit;text-transform:inherit;font-size:24px;letter-spacing:normal;line-height:24px;margin:0;color:inherit;color:var(--ux-theme--card-title-foreground, inherit)}ux-card ux-card-header ux-card-title[size=small]{font-size:20px;line-height:20px}ux-card ux-card-header ux-card-sub-title{padding-top:8px;font-size:14px;line-height:14px;color:inherit;color:var(--ux-theme--card-sub-title-foreground, inherit);opacity:.8;opacity:var(--ux-theme--card-sub-title-opacity, 0.8)}ux-card ux-card-header[color=primary]{color:#3f51b5;background-color:var(--ux-theme--card-primary-header-background, var(--ux-design--primary, #3F51B5));color:#fff;color:var(--ux-theme--card-primary-header-foreground, var(--ux-design--primary-foreground, #fff))}ux-card ux-card-header[color=accent]{background-color:#ff4081;background-color:var(--ux-theme--card-accent-header-background, var(--ux-design--accent, #ff4081));color:#fff;color:var(--ux-theme--card-accent-header-foreground, var(--ux-design--accent-foreground, #fff))}ux-card ux-card-header[color=primary]+ux-card-content,ux-card ux-card-header[color=accent]+ux-card-content{padding-top:16px}ux-card ux-card-header+ux-card-content{padding-top:0}ux-card ux-card-content:last-child{padding-bottom:24px}ux-card ux-card-action-row{display:flex;margin:8px;flex-wrap:nowrap}ux-card>img{width:100%}ux-card ux-card-footer{padding:8px;display:flex;flex-direction:row;align-items:center;margin-top:auto}ux-card ux-card-footer.align-end{justify-content:flex-end}ux-card .ux-card__action{font-size:14px;height:36px;line-height:36px;color:#3f51b5;color:var(--ux-theme--button-flat-foreground, var(--ux-design--primary, #3F51B5));min-width:88px;padding:0 8px;border-radius:2px;font-weight:500;cursor:pointer;text-decoration:none;text-align:center;font-family:inherit;font-weight:500;font-weight:var(--ux-theme--button-font-weight, 500);text-transform:uppercase;text-transform:var(--ux-theme--button-text-transform, uppercase);letter-spacing:.5px;letter-spacing:var(--ux-theme--button-letter-spacing, 0.5px);user-select:none;-moz-user-select:none;-webkit-user-select:none}ux-card ux-card-footer .ux-card__action:first-child{padding-left:0}ux-card ux-card-footer .ux-card__action:last-child{padding-right:0}ux-card ux-card-spacer{flex:1}ux-grid>ux-card{grid-column:span 12;max-width:100%}ux-grid>ux-card[xs=\"0\"]{display:none}ux-grid>ux-card[xs=\"1\"]{grid-column:span 1}ux-grid>ux-card[xs=\"2\"]{grid-column:span 2}ux-grid>ux-card[xs=\"3\"]{grid-column:span 3}ux-grid>ux-card[xs=\"4\"]{grid-column:span 4}ux-grid>ux-card[xs=\"5\"]{grid-column:span 5}ux-grid>ux-card[xs=\"6\"]{grid-column:span 6}ux-grid>ux-card[xs=\"7\"]{grid-column:span 7}ux-grid>ux-card[xs=\"8\"]{grid-column:span 8}ux-grid>ux-card[xs=\"9\"]{grid-column:span 9}ux-grid>ux-card[xs=\"10\"]{grid-column:span 10}ux-grid>ux-card[xs=\"11\"]{grid-column:span 11}ux-grid>ux-card[xs=\"12\"]{grid-column:span 12}ux-grid>ux-card[order-xs=\"-1\"]{order:-1}ux-grid>ux-card[order-xs=\"0\"]{order:0}ux-grid>ux-card[order-xs=\"1\"]{order:1}ux-grid>ux-card[order-xs=\"2\"]{order:2}ux-grid>ux-card[order-xs=\"3\"]{order:3}ux-grid>ux-card[order-xs=\"4\"]{order:4}ux-grid>ux-card[order-xs=\"5\"]{order:5}ux-grid>ux-card[order-xs=\"6\"]{order:6}ux-grid>ux-card[order-xs=\"7\"]{order:7}ux-grid>ux-card[order-xs=\"8\"]{order:8}ux-grid>ux-card[order-xs=\"9\"]{order:9}ux-grid>ux-card[order-xs=\"10\"]{order:10}@media (min-width:480px){ux-grid>ux-card[sm=\"0\"]{display:none}ux-grid>ux-card[sm=\"1\"]{grid-column:span 1}ux-grid>ux-card[sm=\"2\"]{grid-column:span 2}ux-grid>ux-card[sm=\"3\"]{grid-column:span 3}ux-grid>ux-card[sm=\"4\"]{grid-column:span 4}ux-grid>ux-card[sm=\"5\"]{grid-column:span 5}ux-grid>ux-card[sm=\"6\"]{grid-column:span 6}ux-grid>ux-card[sm=\"7\"]{grid-column:span 7}ux-grid>ux-card[sm=\"8\"]{grid-column:span 8}ux-grid>ux-card[sm=\"9\"]{grid-column:span 9}ux-grid>ux-card[sm=\"10\"]{grid-column:span 10}ux-grid>ux-card[sm=\"11\"]{grid-column:span 11}ux-grid>ux-card[sm=\"12\"]{grid-column:span 12}ux-grid>ux-card[order-sm=\"-1\"]{order:-1}ux-grid>ux-card[order-sm=\"0\"]{order:0}ux-grid>ux-card[order-sm=\"1\"]{order:1}ux-grid>ux-card[order-sm=\"2\"]{order:2}ux-grid>ux-card[order-sm=\"3\"]{order:3}ux-grid>ux-card[order-sm=\"4\"]{order:4}ux-grid>ux-card[order-sm=\"5\"]{order:5}ux-grid>ux-card[order-sm=\"6\"]{order:6}ux-grid>ux-card[order-sm=\"7\"]{order:7}ux-grid>ux-card[order-sm=\"8\"]{order:8}ux-grid>ux-card[order-sm=\"9\"]{order:9}ux-grid>ux-card[order-sm=\"10\"]{order:10}}@media (min-width:960px){ux-grid>ux-card[md=\"0\"]{display:none}ux-grid>ux-card[md=\"1\"]{grid-column:span 1}ux-grid>ux-card[md=\"2\"]{grid-column:span 2}ux-grid>ux-card[md=\"3\"]{grid-column:span 3}ux-grid>ux-card[md=\"4\"]{grid-column:span 4}ux-grid>ux-card[md=\"5\"]{grid-column:span 5}ux-grid>ux-card[md=\"6\"]{grid-column:span 6}ux-grid>ux-card[md=\"7\"]{grid-column:span 7}ux-grid>ux-card[md=\"8\"]{grid-column:span 8}ux-grid>ux-card[md=\"9\"]{grid-column:span 9}ux-grid>ux-card[md=\"10\"]{grid-column:span 10}ux-grid>ux-card[md=\"11\"]{grid-column:span 11}ux-grid>ux-card[md=\"12\"]{grid-column:span 12}ux-grid>ux-card[order-md=\"-1\"]{order:-1}ux-grid>ux-card[order-md=\"0\"]{order:0}ux-grid>ux-card[order-md=\"1\"]{order:1}ux-grid>ux-card[order-md=\"2\"]{order:2}ux-grid>ux-card[order-md=\"3\"]{order:3}ux-grid>ux-card[order-md=\"4\"]{order:4}ux-grid>ux-card[order-md=\"5\"]{order:5}ux-grid>ux-card[order-md=\"6\"]{order:6}ux-grid>ux-card[order-md=\"7\"]{order:7}ux-grid>ux-card[order-md=\"8\"]{order:8}ux-grid>ux-card[order-md=\"9\"]{order:9}ux-grid>ux-card[order-md=\"10\"]{order:10}}@media (min-width:1280px){ux-grid>ux-card[lg=\"0\"]{display:none}ux-grid>ux-card[lg=\"1\"]{grid-column:span 1}ux-grid>ux-card[lg=\"2\"]{grid-column:span 2}ux-grid>ux-card[lg=\"3\"]{grid-column:span 3}ux-grid>ux-card[lg=\"4\"]{grid-column:span 4}ux-grid>ux-card[lg=\"5\"]{grid-column:span 5}ux-grid>ux-card[lg=\"6\"]{grid-column:span 6}ux-grid>ux-card[lg=\"7\"]{grid-column:span 7}ux-grid>ux-card[lg=\"8\"]{grid-column:span 8}ux-grid>ux-card[lg=\"9\"]{grid-column:span 9}ux-grid>ux-card[lg=\"10\"]{grid-column:span 10}ux-grid>ux-card[lg=\"11\"]{grid-column:span 11}ux-grid>ux-card[lg=\"12\"]{grid-column:span 12}ux-grid>ux-card[order-lg=\"-1\"]{order:-1}ux-grid>ux-card[order-lg=\"0\"]{order:0}ux-grid>ux-card[order-lg=\"1\"]{order:1}ux-grid>ux-card[order-lg=\"2\"]{order:2}ux-grid>ux-card[order-lg=\"3\"]{order:3}ux-grid>ux-card[order-lg=\"4\"]{order:4}ux-grid>ux-card[order-lg=\"5\"]{order:5}ux-grid>ux-card[order-lg=\"6\"]{order:6}ux-grid>ux-card[order-lg=\"7\"]{order:7}ux-grid>ux-card[order-lg=\"8\"]{order:8}ux-grid>ux-card[order-lg=\"9\"]{order:9}ux-grid>ux-card[order-lg=\"10\"]{order:10}}@media (min-width:1925px){ux-grid>ux-card[xl=\"0\"]{display:none}ux-grid>ux-card[xl=\"1\"]{grid-column:span 1}ux-grid>ux-card[xl=\"2\"]{grid-column:span 2}ux-grid>ux-card[xl=\"3\"]{grid-column:span 3}ux-grid>ux-card[xl=\"4\"]{grid-column:span 4}ux-grid>ux-card[xl=\"5\"]{grid-column:span 5}ux-grid>ux-card[xl=\"6\"]{grid-column:span 6}ux-grid>ux-card[xl=\"7\"]{grid-column:span 7}ux-grid>ux-card[xl=\"8\"]{grid-column:span 8}ux-grid>ux-card[xl=\"9\"]{grid-column:span 9}ux-grid>ux-card[xl=\"10\"]{grid-column:span 10}ux-grid>ux-card[xl=\"11\"]{grid-column:span 11}ux-grid>ux-card[xl=\"12\"]{grid-column:span 12}ux-grid>ux-card[order-xl=\"-1\"]{order:-1}ux-grid>ux-card[order-xl=\"0\"]{order:0}ux-grid>ux-card[order-xl=\"1\"]{order:1}ux-grid>ux-card[order-xl=\"2\"]{order:2}ux-grid>ux-card[order-xl=\"3\"]{order:3}ux-grid>ux-card[order-xl=\"4\"]{order:4}ux-grid>ux-card[order-xl=\"5\"]{order:5}ux-grid>ux-card[order-xl=\"6\"]{order:6}ux-grid>ux-card[order-xl=\"7\"]{order:7}ux-grid>ux-card[order-xl=\"8\"]{order:8}ux-grid>ux-card[order-xl=\"9\"]{order:9}ux-grid>ux-card[order-xl=\"10\"]{order:10}}";

var UxCardTheme = /** @class */ (function () {
    function UxCardTheme() {
        this.themeKey = 'card';
    }
    return UxCardTheme;
}());

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-card-css');
    config.globalResources(UxCard);
}

exports.configure = configure;
exports.UxCardTheme = UxCardTheme;
