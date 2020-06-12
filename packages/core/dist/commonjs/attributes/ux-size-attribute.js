"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxSizeCustomAttribute = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_pal_1 = require("aurelia-pal");
var UxSizeCustomAttribute = /** @class */ (function () {
    function UxSizeCustomAttribute(element) {
        this.element = element;
        this.value = { width: 0, height: 0 };
        this.width = 0;
        this.height = 0;
    }
    UxSizeCustomAttribute.prototype.bind = function () {
        this.observer = this.getObserver();
        this.observer.observe(this.element);
    };
    UxSizeCustomAttribute.prototype.unbind = function () {
        this.observer.disconnect();
        this.observer = void 0;
    };
    UxSizeCustomAttribute.prototype.getObserver = function () {
        var _this = this;
        if (typeof aurelia_pal_1.PLATFORM.global.ResizeObserver === 'function') {
            return new aurelia_pal_1.PLATFORM.global.ResizeObserver(function (records) {
                var rect = records[0].contentRect;
                _this.value = { width: rect.width, height: rect.height };
            });
        }
        else {
            return new ElementSizeDirtyChecker(function (size) {
                _this.value = size;
            });
        }
    };
    UxSizeCustomAttribute.prototype.valueChanged = function (size) {
        this.value = size;
        this.width = size.width;
        this.height = size.height;
    };
    tslib_1.__decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView, primaryProperty: true })
    ], UxSizeCustomAttribute.prototype, "value", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView })
    ], UxSizeCustomAttribute.prototype, "width", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView })
    ], UxSizeCustomAttribute.prototype, "height", void 0);
    UxSizeCustomAttribute = tslib_1.__decorate([
        aurelia_framework_1.customAttribute('ux-size'),
        aurelia_framework_1.inject(Element)
    ], UxSizeCustomAttribute);
    return UxSizeCustomAttribute;
}());
exports.UxSizeCustomAttribute = UxSizeCustomAttribute;
var ElementSizeDirtyChecker = /** @class */ (function () {
    function ElementSizeDirtyChecker(callback, rate /*3 times a second*/) {
        if (rate === void 0) { rate = 330; }
        this.callback = callback;
        this.rate = rate;
        this.size = { width: 0, height: 0 };
    }
    ElementSizeDirtyChecker.prototype.observe = function (element) {
        var _this = this;
        this.timerId = setInterval(function () {
            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
            var currentSize = _this.size;
            if (width !== currentSize.width || height !== currentSize.height) {
                _this.size = { width: width, height: height };
                if (typeof _this.callback === 'function') {
                    _this.callback(_this.size);
                }
            }
        }, this.rate);
    };
    ElementSizeDirtyChecker.prototype.disconnect = function () {
        clearInterval(this.timerId);
    };
    return ElementSizeDirtyChecker;
}());
//# sourceMappingURL=ux-size-attribute.js.map