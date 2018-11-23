var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var closeEvent = aurelia_pal_1.DOM.createCustomEvent('close', { bubbles: false });
            this.element.dispatchEvent(closeEvent);
        };
        __decorate([
            aurelia_templating_1.bindable
        ], UxChip.prototype, "theme", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxChip.prototype, "type", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
        ], UxChip.prototype, "value", void 0);
        UxChip = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-chip')
        ], UxChip);
        return UxChip;
    }());
    exports.UxChip = UxChip;
});
