import { __decorate } from "tslib";
import { customAttribute, bindingMode, inject, bindable } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
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
        if (typeof PLATFORM.global.ResizeObserver === 'function') {
            return new PLATFORM.global.ResizeObserver(function (records) {
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
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView, primaryProperty: true })
    ], UxSizeCustomAttribute.prototype, "value", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxSizeCustomAttribute.prototype, "width", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxSizeCustomAttribute.prototype, "height", void 0);
    UxSizeCustomAttribute = __decorate([
        customAttribute('ux-size'),
        inject(Element)
    ], UxSizeCustomAttribute);
    return UxSizeCustomAttribute;
}());
export { UxSizeCustomAttribute };
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