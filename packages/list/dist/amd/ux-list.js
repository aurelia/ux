var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxList = /** @class */ (function () {
        function UxList(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
        }
        UxList.prototype.bind = function () {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            this.typeChanged(this.type);
        };
        UxList.prototype.typeChanged = function (newValue, oldValue) {
            if (typeof oldValue === 'string') {
                this.element.classList.remove("ux-list--" + oldValue);
            }
            if (typeof newValue === 'string') {
                this.element.classList.add("ux-list--" + newValue);
            }
        };
        UxList.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'list';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        __decorate([
            aurelia_templating_1.bindable
        ], UxList.prototype, "theme", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxList.prototype, "type", void 0);
        UxList = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-list')
        ], UxList);
        return UxList;
    }());
    exports.UxList = UxList;
});
