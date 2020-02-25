var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ElementEvents } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { computedFrom, bindingMode } from 'aurelia-binding';
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
        const rect = this.element.getBoundingClientRect();
        const normalizedMouseX = currentMouseX - rect.x;
        const percentValue = normalizedMouseX / rect.width;
        const rawValue = ((this.max - this.min) * percentValue) + this.min;
        const numSteps = Math.round((rawValue - this.min) / this.step);
        const steppedValue = this.min + (this.step * numSteps);
        this.value = this.boundValue(steppedValue);
    }
    onTrackMouseDown(e) {
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        const isMouseEvent = e instanceof MouseEvent;
        const isTouchEvent = Array.isArray(e.touches) && e.touches.length > 0;
        const winEvents = new ElementEvents(window);
        const upAction = (e) => {
            if (!this.isActive) {
                winEvents.disposeAll();
                return;
            }
            if (isMouseEvent) {
                this.updateValue(e.clientX);
            }
            if (isTouchEvent) {
                const touches = e.touches;
                if (touches.length === 1) {
                    this.updateValue(touches[0].clientX);
                }
            }
            this.isActive = false;
            winEvents.disposeAll();
        };
        const moveAction = (e) => {
            if (!this.isActive) {
                return;
            }
            this.updateValue(isMouseEvent ? e.clientX : e.touches[0].clientX);
        };
        winEvents.subscribe('blur', upAction, true);
        if (isMouseEvent) {
            winEvents.subscribe('mouseup', upAction, true);
            winEvents.subscribe('mousemove', moveAction, true);
        }
        else if (isTouchEvent) {
            winEvents.subscribe('touchend', upAction, true);
            winEvents.subscribe('touchmove', moveAction, true);
        }
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
    customElement('ux-slider')
], UxSlider);
export { UxSlider };
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
//# sourceMappingURL=ux-slider.js.map