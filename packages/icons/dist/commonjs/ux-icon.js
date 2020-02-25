"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var ux_icon_theme_1 = require("./ux-icon-theme");
var ux_icon_map_1 = require("./ux-icon-map");
var UxIcon = /** @class */ (function () {
    function UxIcon(element, iconMap, styleEngine, logger) {
        this.element = element;
        this.iconMap = iconMap;
        this.styleEngine = styleEngine;
        this.logger = logger;
        this.icon = undefined;
    }
    UxIcon.prototype.bind = function () {
        if (this.icon) {
            this.changeIcon(this.icon);
        }
        this.sizeChanged(this.size);
        this.themeChanged(this.theme);
    };
    UxIcon.prototype.sizeChanged = function (newValue) {
        if (this.size) {
            if (this.theme === undefined) {
                this.theme = new ux_icon_theme_1.UxIconTheme();
            }
            this.theme.size = newValue;
        }
    };
    UxIcon.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxIcon.prototype.iconChanged = function (newValue) {
        this.changeIcon(newValue);
    };
    UxIcon.prototype.changeIcon = function (icon) {
        var material = this.iconMap.get(icon);
        if (material) {
            this.element.innerHTML = material;
        }
        else {
            this.logger.warn('ux-icon: no matching icon found', this.element);
        }
    };
    __decorate([
        aurelia_templating_1.bindable
    ], UxIcon.prototype, "size", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxIcon.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxIcon.prototype, "icon", void 0);
    UxIcon = __decorate([
        aurelia_dependency_injection_1.inject(Element, ux_icon_map_1.UxIconMap, core_1.StyleEngine, aurelia_logging_1.Logger),
        aurelia_templating_1.customElement('ux-icon'),
        aurelia_templating_1.processAttributes(core_1.processDesignAttributes)
    ], UxIcon);
    return UxIcon;
}());
exports.UxIcon = UxIcon;
//# sourceMappingURL=ux-icon.js.map