'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaPal = require('aurelia-pal');
var aureliaBinding = require('aurelia-binding');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var uxChip = "<template role=\"textbox\" class=\"ux-chip\"> <require from=\"@aurelia-ux/chip-input/ux-chip.css\"></require> <span class=\"ux-chip__content\"> <slot></slot> </span> <span class=\"ux-chip__close\" click.delegate=\"closeChip()\"> </span> </template> ";

var UX_CHIP_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxChip
});

var UxChip = /** @class */ (function () {
    function UxChip(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = undefined;
    }
    UxChip.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.element.hasAttribute('deletable')) {
            this.element.removeAttribute('deletable');
            this.element.classList.add('ux-chip--deletable');
        }
    };
    UxChip.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxChip.prototype.closeChip = function () {
        var closeEvent = aureliaPal.DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    };
    __decorate([
        aureliaTemplating.bindable
    ], UxChip.prototype, "theme", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxChip.prototype, "type", void 0);
    __decorate([
        aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.twoWay })
    ], UxChip.prototype, "value", void 0);
    UxChip = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-chip'),
        aureliaTemplating.inlineView(UX_CHIP_VIEW)
    ], UxChip);
    return UxChip;
}());

var uxChipInput = "<template role=\"textbox\" class=\"ux-chip-input\"> <require from=\"@aurelia-ux/chip-input/ux-chip-input.css\"></require> <ux-chip deletable ref=\"chiprepeat\" close.trigger=\"removeChip(chip)\" dblclick.trigger=\"editChip(chip)\" repeat.for=\"chip of chips\"> ${chip} </ux-chip> <input class=\"ux-chip-input__inner-input\" ref=\"textbox\" keyup.delegate=\"handleKeyup($event)\"> <div class=\"ux-chip-input__bottom-border\"></div> </template> ";

var UX_CHIP_INPUT_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxChipInput
});

var UxChipInput = /** @class */ (function () {
    function UxChipInput(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.readonly = false;
        this.separator = ', ';
        this.value = undefined;
        this.chips = new Array();
    }
    UxChipInput.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.element.hasAttribute('placeholder')) {
            var attributeValue = this.element.getAttribute('placeholder');
            if (attributeValue) {
                this.textbox.setAttribute('placeholder', attributeValue);
                this.element.removeAttribute('placeholder');
            }
        }
        if (this.value) {
            this.chips = this.value.split(this.separator);
        }
        if (core.normalizeBooleanAttribute('disabled', this.disabled)) {
            this.textbox.setAttribute('disabled', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        if (core.normalizeBooleanAttribute('readonly', this.readonly)) {
            this.textbox.setAttribute('readonly', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
    };
    UxChipInput.prototype.attached = function () {
        var _this = this;
        var blurEvent = aureliaPal.DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.addEventListener('focus', function () {
            _this.element.classList.add('ux-chip-input--focused');
        });
        this.textbox.addEventListener('blur', function () {
            _this.addChip();
            _this.element.classList.remove('ux-chip-input--focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxChipInput.prototype.detached = function () {
        var _this = this;
        var blurEvent = aureliaPal.DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.removeEventListener('focus', function () {
            _this.element.classList.add('ux-chip-input--focused');
        });
        this.textbox.removeEventListener('blur', function () {
            _this.addChip();
            _this.element.classList.remove('ux-chip-input--focused');
            _this.element.dispatchEvent(blurEvent);
        });
    };
    UxChipInput.prototype.handleKeyup = function (event) {
        var key = event.which || event.keyCode;
        if (key === 13) {
            this.addChip();
        }
        if (key === 37) {
            if (this.chips && this.textbox.value === '') {
                var chip = this.chips.pop();
                if (chip !== undefined) {
                    this.textbox.value = chip;
                }
            }
        }
    };
    UxChipInput.prototype.addChip = function () {
        if (this.textbox.value.length) {
            if (!this.chips) {
                this.chips = new Array();
            }
            this.chips.push(this.textbox.value);
            this.textbox.value = '';
            this.chipsChanged();
        }
    };
    UxChipInput.prototype.editChip = function (value) {
        if (this.textbox.value.length === 0) {
            this.removeChip(value);
            this.textbox.value = value;
            this.chipsChanged();
        }
    };
    UxChipInput.prototype.removeChip = function (value) {
        var chipIndex = this.chips.indexOf(value, 0);
        if (chipIndex > -1) {
            this.chips.splice(chipIndex, 1);
            this.chipsChanged();
        }
    };
    UxChipInput.prototype.chipsChanged = function () {
        var chipValue = this.chips.join(this.separator);
        if (chipValue === '') {
            chipValue = null;
        }
        if (chipValue !== this.value) {
            this.value = chipValue;
        }
    };
    UxChipInput.prototype.valueChanged = function (newValue) {
        if (newValue && newValue !== this.chips.join(this.separator)) {
            this.chips = newValue.split(this.separator);
        }
    };
    UxChipInput.prototype.disabledChanged = function (newValue) {
        if (core.normalizeBooleanAttribute('disabled', newValue)) {
            this.textbox.setAttribute('disabled', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        else {
            this.textbox.removeAttribute('disabled');
            this.chiprepeat.setAttribute('deletable', '');
            this.tagrepeat.setAttribute('deletable', '');
        }
    };
    UxChipInput.prototype.readonlyChanged = function (newValue) {
        if (core.normalizeBooleanAttribute('readonly', newValue)) {
            this.textbox.setAttribute('readonly', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        else {
            this.textbox.removeAttribute('readonly');
            this.chiprepeat.setAttribute('deletable', '');
            this.tagrepeat.setAttribute('deletable', '');
        }
    };
    UxChipInput.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip-input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        aureliaTemplating.bindable
    ], UxChipInput.prototype, "disabled", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxChipInput.prototype, "readonly", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxChipInput.prototype, "theme", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxChipInput.prototype, "label", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxChipInput.prototype, "separator", void 0);
    __decorate([
        aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.twoWay })
    ], UxChipInput.prototype, "value", void 0);
    __decorate([
        aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.twoWay })
    ], UxChipInput.prototype, "chips", void 0);
    UxChipInput = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-chip-input'),
        aureliaTemplating.inlineView(UX_CHIP_INPUT_VIEW)
    ], UxChipInput);
    return UxChipInput;
}());

var UxChipInputTheme = /** @class */ (function () {
    function UxChipInputTheme() {
        this.themeKey = 'chip-input';
    }
    return UxChipInputTheme;
}());

var UxChipTheme = /** @class */ (function () {
    function UxChipTheme() {
        this.themeKey = 'chip';
    }
    return UxChipTheme;
}());

function configure(config) {
    config.globalResources([
        UxChipInput,
        UxChip
    ]);
}

exports.UxChipInputTheme = UxChipInputTheme;
exports.UxChipTheme = UxChipTheme;
exports.configure = configure;
//# sourceMappingURL=index.js.map
