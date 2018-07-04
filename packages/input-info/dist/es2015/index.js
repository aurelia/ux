import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { DOM } from 'aurelia-framework';

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

var UX_INPUT_INFO_VIEW = "<template> <span class=\"hint-text\"> <slot></slot> </span> <div class=\"counter\" if.bind=\"uxInputCounter !== null\"> <span>${target.value.length ? target.value.length : 0}</span> <span if.bind=\"target.maxlength > 0\">/${target.maxlength}</span> </div> </template> ";

let UxInputInfo = class UxInputInfo {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.uxInputCounter = null;
    }
    bind() {
        if (this.target === undefined) {
            this.findAndSetTarget(this.element);
        }
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input-info';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    findAndSetTarget(element) {
        const inputElement = element.previousElementSibling;
        if (!inputElement) {
            return;
        }
        if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
            this.target = inputElement.au.controller.viewModel;
        }
    }
};
__decorate([
    bindable
], UxInputInfo.prototype, "target", void 0);
__decorate([
    bindable
], UxInputInfo.prototype, "uxInputCounter", void 0);
__decorate([
    bindable
], UxInputInfo.prototype, "theme", void 0);
UxInputInfo = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-input-info'),
    inlineView(UX_INPUT_INFO_VIEW)
], UxInputInfo);

class UxInputInfoTheme {
    constructor() {
        this.themeKey = 'input-info';
    }
}

var css = "ux-input-info{display:flex;font-size:14px;width:100%;color:#909090;color:var(--ux-theme--input-info-foreground, #909090)}ux-input-info>.hint-text,ux-input-info>.error-text{flex-grow:1}ux-input-info>.hint-text:first-child,ux-input-info>.error-text:first-child{display:block}ux-input-info>.hint-text,ux-input-info>.error-text{display:none}ux-input-info>.counter{transition:250ms;flex-wrap:nowrap;display:flex}ux-input.focused+ux-input-info>.counter{color:#ff4081;color:var(--ux-design--accent, #FF4081)}ux-input>input[disabled]+ux-input-info{display:none}.has-error+ux-input-info{color:#f44336;color:var(--ux-theme--input-info-error, #F44336)}";

function configure(config) {
    DOM.injectStyles(css, undefined, false, 'ux-input-info-css');
    config.globalResources(UxInputInfo);
}

export { configure, UxInputInfoTheme };
