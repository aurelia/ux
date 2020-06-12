import { __decorate } from "tslib";
import { customAttribute, bindingMode, inject, bindable } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
let UxSizeCustomAttribute = /** @class */ (() => {
    let UxSizeCustomAttribute = class UxSizeCustomAttribute {
        constructor(element) {
            this.element = element;
            this.value = { width: 0, height: 0 };
            this.width = 0;
            this.height = 0;
        }
        bind() {
            this.observer = this.getObserver();
            this.observer.observe(this.element);
        }
        unbind() {
            this.observer.disconnect();
            this.observer = void 0;
        }
        getObserver() {
            if (typeof PLATFORM.global.ResizeObserver === 'function') {
                return new PLATFORM.global.ResizeObserver((records) => {
                    const rect = records[0].contentRect;
                    this.value = { width: rect.width, height: rect.height };
                });
            }
            else {
                return new ElementSizeDirtyChecker((size) => {
                    this.value = size;
                });
            }
        }
        valueChanged(size) {
            this.value = size;
            this.width = size.width;
            this.height = size.height;
        }
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
})();
export { UxSizeCustomAttribute };
class ElementSizeDirtyChecker {
    constructor(callback, rate = 330 /*3 times a second*/) {
        this.callback = callback;
        this.rate = rate;
        this.size = { width: 0, height: 0 };
    }
    observe(element) {
        this.timerId = setInterval(() => {
            const { width, height } = element.getBoundingClientRect();
            const currentSize = this.size;
            if (width !== currentSize.width || height !== currentSize.height) {
                this.size = { width, height };
                if (typeof this.callback === 'function') {
                    this.callback(this.size);
                }
            }
        }, this.rate);
    }
    disconnect() {
        clearInterval(this.timerId);
    }
}
//# sourceMappingURL=ux-size-attribute.js.map