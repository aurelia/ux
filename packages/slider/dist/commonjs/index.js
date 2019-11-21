'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaTemplating = require('aurelia-templating');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var core = require('@aurelia-ux/core');
var aureliaBinding = require('aurelia-binding');

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

var uxSlider = "<template class=\"ux-slider\"> <require from=\"@aurelia-ux/slider/ux-slider.css\"></require> <div class=\"ux-slider__container\" class.bind=\"disabled ? 'ux-slider__container--disabled' : 'ux-slider__container--enabled'\" mousedown.delegate=\"onTrackMouseDown($event)\"> <div class=\"ux-slider__track ux-slider__track-before\" class.bind=\"isActive ? 'ux-slider__track--active' : 'ux-slider__track--inactive'\" css=\"width: ${sliderBeforeWidth}%;\"></div> <div class=\"ux-slider__thumb-container\"> <button class=\"ux-slider__thumb-button\" keydown.delegate=\"onKeyDown($event)\"> </button> </div> <div class=\"ux-slider__track ux-slider__track-after\" class.bind=\"isActive ? 'ux-slider__track--active' : 'ux-slider__track--inactive'\" css=\"width: ${sliderAfterWidth}%;\"></div> </div> </template> ";

var VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxSlider
});

var UxSlider = /** @class */ (function () {
    function UxSlider(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        Object.setPrototypeOf(element, uxSliderElementProto);
    }
    Object.defineProperty(UxSlider.prototype, "sliderBeforeWidth", {
        get: function () {
            return this.percentValue * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UxSlider.prototype, "sliderAfterWidth", {
        get: function () {
            return (1 - this.percentValue) * 100;
        },
        enumerable: true,
        configurable: true
    });
    UxSlider.prototype.bind = function () {
        this.themeChanged(this.theme);
        this.minChanged();
        this.maxChanged();
        this.valueChanged();
        this.stepChanged();
    };
    UxSlider.prototype.stepChanged = function () {
        if (this.step === undefined || this.step === null) {
            this.step = 1;
            return;
        }
        this.step = Number(this.step);
    };
    UxSlider.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'slider';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxSlider.prototype.minChanged = function () {
        if (this.min === undefined || this.min === null) {
            this.min = 0;
            return;
        }
        this.min = Number(this.min);
    };
    UxSlider.prototype.maxChanged = function () {
        if (this.max === undefined || this.max === null) {
            this.max = 100;
            return;
        }
        this.max = Number(this.max);
    };
    UxSlider.prototype.valueChanged = function () {
        if (this.value === undefined || this.value === null) {
            this.value = this.min;
            this.percentValue = 0;
            return;
        }
        var percentValue = (this.value - this.min) / (this.max - this.min);
        this.percentValue = percentValue > 1
            ? 1
            : percentValue < 0
                ? 0
                : percentValue;
    };
    UxSlider.prototype.updateValue = function (currentMouseX) {
        var normalizedMouseX = currentMouseX - this.element.offsetLeft;
        var percentValue = normalizedMouseX / this.element.clientWidth;
        var rawValue = ((this.max - this.min) * percentValue) + this.min;
        var numSteps = Math.round((rawValue - this.min) / this.step);
        var steppedValue = this.min + (this.step * numSteps);
        this.value = this.boundValue(steppedValue);
    };
    UxSlider.prototype.onTrackMouseDown = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        var winEvents = new aureliaTemplating.ElementEvents(window);
        var upAction = function (e) {
            if (!_this.isActive) {
                return;
            }
            _this.updateValue(e.clientX);
            _this.isActive = false;
            winEvents.disposeAll();
        };
        winEvents.subscribe('blur', upAction, true);
        winEvents.subscribe('mouseup', upAction, true);
        winEvents.subscribe('mousemove', this.onMouseMove.bind(this), true);
    };
    UxSlider.prototype.onKeyDown = function (e) {
        var steppedValue = e.keyCode === 37 || e.keyCode === 40
            ? this.value - this.step
            : e.keyCode === 38 || e.keyCode === 39
                ? this.value + this.step
                : this.value;
        this.value = this.boundValue(steppedValue);
        return true;
    };
    UxSlider.prototype.getValue = function () {
        return this.value;
    };
    UxSlider.prototype.setValue = function (value) {
        this.value = value;
    };
    UxSlider.prototype.onMouseMove = function (e) {
        this.updateValue(e.clientX);
    };
    UxSlider.prototype.boundValue = function (potentialValue) {
        return potentialValue > this.max
            ? this.max
            : potentialValue < this.min
                ? this.min
                : potentialValue;
    };
    __decorate([
        aureliaTemplating.bindable
    ], UxSlider.prototype, "theme", void 0);
    __decorate([
        aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.twoWay })
    ], UxSlider.prototype, "value", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxSlider.prototype, "min", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxSlider.prototype, "max", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxSlider.prototype, "disabled", void 0);
    __decorate([
        aureliaTemplating.bindable
    ], UxSlider.prototype, "step", void 0);
    __decorate([
        aureliaBinding.computedFrom('percentValue')
    ], UxSlider.prototype, "sliderBeforeWidth", null);
    __decorate([
        aureliaBinding.computedFrom('percentValue')
    ], UxSlider.prototype, "sliderAfterWidth", null);
    UxSlider = __decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-slider'),
        aureliaTemplating.inlineView(VIEW)
    ], UxSlider);
    return UxSlider;
}());
var getVm = function (_) { return _.au.controller.viewModel; };
var uxSliderElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get: function () {
            return getVm(this).getValue();
        },
        set: function (value) {
            getVm(this).setValue(value);
        }
    }
});

var UxSliderTheme = /** @class */ (function () {
    function UxSliderTheme() {
        this.themeKey = 'slider';
    }
    return UxSliderTheme;
}());

function configure(config) {
    config.globalResources(UxSlider);
}

exports.UxSlider = UxSlider;
exports.UxSliderTheme = UxSliderTheme;
exports.configure = configure;
//# sourceMappingURL=index.js.map
