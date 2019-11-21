import { ElementEvents, bindable, customElement, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { bindingMode, computedFrom } from 'aurelia-binding';

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

let UxSlider = class UxSlider {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        Object.setPrototypeOf(element, uxSliderElementProto);
    }
    get sliderBeforeWidth() {
        return this.percentValue * 100;
    }
    get sliderAfterWidth() {
        return (1 - this.percentValue) * 100;
    }
    bind() {
        this.themeChanged(this.theme);
        this.minChanged();
        this.maxChanged();
        this.valueChanged();
        this.stepChanged();
    }
    stepChanged() {
        if (this.step === undefined || this.step === null) {
            this.step = 1;
            return;
        }
        this.step = Number(this.step);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'slider';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    minChanged() {
        if (this.min === undefined || this.min === null) {
            this.min = 0;
            return;
        }
        this.min = Number(this.min);
    }
    maxChanged() {
        if (this.max === undefined || this.max === null) {
            this.max = 100;
            return;
        }
        this.max = Number(this.max);
    }
    valueChanged() {
        if (this.value === undefined || this.value === null) {
            this.value = this.min;
            this.percentValue = 0;
            return;
        }
        const percentValue = (this.value - this.min) / (this.max - this.min);
        this.percentValue = percentValue > 1
            ? 1
            : percentValue < 0
                ? 0
                : percentValue;
    }
    updateValue(currentMouseX) {
        const normalizedMouseX = currentMouseX - this.element.offsetLeft;
        const percentValue = normalizedMouseX / this.element.clientWidth;
        const rawValue = ((this.max - this.min) * percentValue) + this.min;
        const numSteps = Math.round((rawValue - this.min) / this.step);
        const steppedValue = this.min + (this.step * numSteps);
        this.value = this.boundValue(steppedValue);
    }
    onTrackMouseDown() {
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        const winEvents = new ElementEvents(window);
        const upAction = (e) => {
            if (!this.isActive) {
                return;
            }
            this.updateValue(e.clientX);
            this.isActive = false;
            winEvents.disposeAll();
        };
        winEvents.subscribe('blur', upAction, true);
        winEvents.subscribe('mouseup', upAction, true);
        winEvents.subscribe('mousemove', this.onMouseMove.bind(this), true);
    }
    onKeyDown(e) {
        const steppedValue = e.keyCode === 37 || e.keyCode === 40
            ? this.value - this.step
            : e.keyCode === 38 || e.keyCode === 39
                ? this.value + this.step
                : this.value;
        this.value = this.boundValue(steppedValue);
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    onMouseMove(e) {
        this.updateValue(e.clientX);
    }
    boundValue(potentialValue) {
        return potentialValue > this.max
            ? this.max
            : potentialValue < this.min
                ? this.min
                : potentialValue;
    }
};
__decorate([
    bindable
], UxSlider.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxSlider.prototype, "value", void 0);
__decorate([
    bindable
], UxSlider.prototype, "min", void 0);
__decorate([
    bindable
], UxSlider.prototype, "max", void 0);
__decorate([
    bindable
], UxSlider.prototype, "disabled", void 0);
__decorate([
    bindable
], UxSlider.prototype, "step", void 0);
__decorate([
    computedFrom('percentValue')
], UxSlider.prototype, "sliderBeforeWidth", null);
__decorate([
    computedFrom('percentValue')
], UxSlider.prototype, "sliderAfterWidth", null);
UxSlider = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-slider'),
    inlineView(VIEW)
], UxSlider);
const getVm = (_) => _.au.controller.viewModel;
const uxSliderElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get() {
            return getVm(this).getValue();
        },
        set(value) {
            getVm(this).setValue(value);
        }
    }
});

class UxSliderTheme {
    constructor() {
        this.themeKey = 'slider';
    }
}

function configure(config) {
    config.globalResources(UxSlider);
}

export { UxSlider, UxSliderTheme, configure };
//# sourceMappingURL=index.js.map
