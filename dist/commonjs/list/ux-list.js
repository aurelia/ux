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
var style_engine_1 = require("../styles/style-engine");
var design_attributes_1 = require("../designs/design-attributes");
var UxList = (function () {
    function UxList(resources, styleEngine) {
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.theme = null;
    }
    UxList.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxList.prototype.bind = function () {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
    };
    UxList.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    return UxList;
}());
__decorate([
    aurelia_templating_1.bindable
], UxList.prototype, "theme", void 0);
UxList = __decorate([
    aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
    aurelia_templating_1.customElement('ux-list'),
    aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
], UxList);
exports.UxList = UxList;
