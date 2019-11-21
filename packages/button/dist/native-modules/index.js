import { bindable, customElement, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { normalizeBooleanAttribute, PaperRipple, StyleEngine } from '@aurelia-ux/core';

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

var uxButton = "<template role=\"button\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/button/ux-button.css\"></require> <button ref=\"button\" class=\"ux-button ${disabled ? 'ux-button--disabled' : ''}\" mousedown.trigger=\"onMouseDown($event)\" mouseup.trigger=\"onMouseUp()\" mouseleave.trigger=\"onMouseUp()\"> <slot></slot> <span class=\"ripple\"></span> </button> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxButton
});

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
        var _a;
        var typeClasses = [
            'ux-button--text',
            'ux-button--flat',
            'ux-button--outline',
            'ux-button--raised',
            'ux-button--fab'
        ];
        (_a = this.button.classList).remove.apply(_a, typeClasses);
        if (newValue === 'fab') {
            this.element.classList.add('ux-fab-button');
        }
        else {
            this.element.classList.remove('ux-fab-button');
        }
        if (newValue == null || typeClasses.includes("ux-button--" + newValue) === false) {
            newValue = 'raised';
        }
        this.button.classList.add("ux-button--" + newValue);
    };
    UxButton.prototype.sizeChanged = function (newValue) {
        var _a;
        var sizeClasses = ['ux-button--small', 'ux-button--medium', 'ux-button--large'];
        (_a = this.element.classList).remove.apply(_a, sizeClasses);
        if (newValue == null || sizeClasses.includes("ux-button--" + newValue) === false) {
            newValue = 'medium';
        }
        this.element.classList.add("ux-button--" + newValue);
    };
    UxButton.prototype.effectChanged = function (newValue) {
        var _a;
        var effectClasses = ['ux-button--ripple'];
        (_a = this.button.classList).remove.apply(_a, effectClasses);
        if (newValue == null || effectClasses.includes("ux-button--" + newValue) === false) {
            newValue = 'ripple';
        }
        this.button.classList.add("ux-button--" + newValue);
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
        if (this.button.classList.contains('ux-button--ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                this.button.appendChild(this.ripple.$);
            }
            if (this.button.classList.contains('ux-button--fab')) {
                this.ripple.center = true;
                this.ripple.round = true;
            }
            this.ripple.downAction(e);
        }
        return true;
    };
    UxButton.prototype.onMouseUp = function () {
        if (this.button.classList.contains('ux-button--ripple') && this.ripple !== null) {
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
        inlineView(VIEW)
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

export { UxButton, UxButtonTheme, configure };
//# sourceMappingURL=index.js.map
