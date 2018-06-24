import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';

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

var UX_BUTTON_VIEW = "<template role=\"button\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/button/ux-button.css\"></require> <button ref=\"button\" class=\"${disabled ? 'disabled' : ''}\" mousedown.trigger=\"onMouseDown($event)\" mouseup.trigger=\"onMouseUp()\" mouseleave.trigger=\"onMouseUp()\"> <slot></slot> <span class=\"ripple\"></span> </button> </template> ";

var UxButton = /** @class */ (function () {
    function UxButton(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.ripple = null;
    }
    UxButton.prototype.bind = function () {
        if (normalizeBooleanAttribute('disabled', this.disabled)) {
            this.button.setAttribute('disabled', '');
        }
        this.themeChanged(this.theme);
        this.typeChanged(this.type);
        this.sizeChanged(this.size);
        this.effectChanged(this.effect);
    };
    UxButton.prototype.typeChanged = function (newValue) {
        var typeClasses = ['text', 'flat', 'outline', 'raised', 'fab'];
        (_a = this.button.classList).remove.apply(_a, typeClasses);
        if (newValue == null || typeClasses.includes(newValue) === false) {
            newValue = 'raised';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.sizeChanged = function (newValue) {
        var sizeClasses = ['small', 'medium', 'large'];
        (_a = this.button.classList).remove.apply(_a, sizeClasses);
        if (newValue == null || sizeClasses.includes(newValue) === false) {
            newValue = 'medium';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.effectChanged = function (newValue) {
        var effectClasses = ['ripple', 'none'];
        (_a = this.button.classList).remove.apply(_a, effectClasses);
        if (newValue == null || effectClasses.includes(newValue) === false) {
            newValue = 'ripple';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'button';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxButton.prototype.disabledChanged = function (newValue) {
        if (normalizeBooleanAttribute('disabled', newValue)) {
            this.button.setAttribute('disabled', '');
        }
        else {
            this.button.removeAttribute('disabled');
        }
    };
    UxButton.prototype.onMouseDown = function (e) {
        if (this.button.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                this.button.appendChild(this.ripple.$);
            }
            if (this.button.classList.contains('fab')) {
                this.ripple.center = true;
                this.ripple.round = true;
            }
            this.ripple.downAction(e);
        }
        return true;
    };
    UxButton.prototype.onMouseUp = function () {
        if (this.button.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
        return true;
    };
    __decorate([
        bindable
    ], UxButton.prototype, "type", void 0);
    __decorate([
        bindable
    ], UxButton.prototype, "size", void 0);
    __decorate([
        bindable
    ], UxButton.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxButton.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxButton.prototype, "theme", void 0);
    UxButton = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-button'),
        inlineView(UX_BUTTON_VIEW)
    ], UxButton);
    return UxButton;
}());

var UxButtonTheme = /** @class */ (function () {
    function UxButtonTheme() {
        this.themeKey = 'button';
    }
    return UxButtonTheme;
}());

function configure(config) {
    config.globalResources(UxButton);
}

export { configure, UxButtonTheme };
