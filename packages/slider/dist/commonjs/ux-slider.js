"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxSlider = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_pal_1 = require("aurelia-pal");
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UxSlider.prototype, "sliderAfterWidth", {
        get: function () {
            return (1 - this.percentValue) * 100;
        },
        enumerable: false,
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
        var rect = this.sliderContainer.getBoundingClientRect();
        var normalizedMouseX = currentMouseX - rect.x;
        var percentValue = normalizedMouseX / rect.width;
        var rawValue = ((this.max - this.min) * percentValue) + this.min;
        var numSteps = Math.round((rawValue - this.min) / this.step);
        var steppedValue = this.min + (this.step * numSteps);
        this.value = this.boundValue(steppedValue);
    };
    UxSlider.prototype.onTrackMouseDown = function (e) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        var isMouseEvent = e instanceof MouseEvent;
        var winEvents = new aurelia_templating_1.ElementEvents(window);
        var upAction = function (e) {
            if (!_this.isActive) {
                winEvents.disposeAll();
                return;
            }
            if (isMouseEvent) {
                _this.updateValue(e.clientX);
            }
            else {
                var touches = e.touches;
                if (touches.length === 1) {
                    _this.updateValue(touches[0].clientX);
                }
            }
            _this.isActive = false;
            winEvents.disposeAll();
        };
        var moveAction = function (e) {
            if (!_this.isActive) {
                return;
            }
            _this.updateValue(isMouseEvent ? e.clientX : e.touches[0].clientX);
        };
        winEvents.subscribe('blur', upAction, true);
        if (isMouseEvent) {
            winEvents.subscribe('mouseup', upAction, true);
            winEvents.subscribe('mousemove', moveAction, true);
        }
        else {
            winEvents.subscribe('touchend', upAction, true);
            winEvents.subscribe('touchmove', moveAction, true);
        }
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
    UxSlider.prototype.boundValue = function (potentialValue) {
        return potentialValue > this.max
            ? this.max
            : potentialValue < this.min
                ? this.min
                : potentialValue;
    };
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxSlider.prototype, "theme", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxSlider.prototype, "value", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxSlider.prototype, "min", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxSlider.prototype, "max", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxSlider.prototype, "disabled", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxSlider.prototype, "step", void 0);
    tslib_1.__decorate([
        aurelia_binding_1.computedFrom('percentValue')
    ], UxSlider.prototype, "sliderBeforeWidth", null);
    tslib_1.__decorate([
        aurelia_binding_1.computedFrom('percentValue')
    ], UxSlider.prototype, "sliderAfterWidth", null);
    UxSlider = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-slider'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-slider.html'))
    ], UxSlider);
    return UxSlider;
}());
exports.UxSlider = UxSlider;
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
//# sourceMappingURL=ux-slider.js.map