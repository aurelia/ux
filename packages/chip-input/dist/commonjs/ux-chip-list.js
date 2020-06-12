"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxChipList = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_pal_1 = require("aurelia-pal");
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
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxChipList.prototype, "theme", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxChipList.prototype, "type", void 0);
    UxChipList = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-chip-list'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-chip-list.html'))
    ], UxChipList);
    return UxChipList;
}());
exports.UxChipList = UxChipList;
//# sourceMappingURL=ux-chip-list.js.map