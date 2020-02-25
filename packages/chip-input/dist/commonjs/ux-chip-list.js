"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var UxChipList = /** @class */ (function () {
    function UxChipList(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.type = 'inline';
    }
    UxChipList.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    UxChipList.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip-list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        aurelia_templating_1.bindable
    ], UxChipList.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxChipList.prototype, "type", void 0);
    UxChipList = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-chip-list')
    ], UxChipList);
    return UxChipList;
}());
exports.UxChipList = UxChipList;
//# sourceMappingURL=ux-chip-list.js.map