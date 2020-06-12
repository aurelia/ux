"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxIcon = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var ux_icon_theme_1 = require("./ux-icon-theme");
var ux_icon_map_1 = require("./ux-icon-map");
var aurelia_pal_1 = require("aurelia-pal");
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
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxIcon.prototype, "size", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxIcon.prototype, "theme", void 0);
    tslib_1.__decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxIcon.prototype, "icon", void 0);
    UxIcon = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(Element, ux_icon_map_1.UxIconMap, core_1.StyleEngine, aurelia_logging_1.Logger),
        aurelia_templating_1.customElement('ux-icon'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-icon.html')),
        aurelia_templating_1.processAttributes(core_1.processDesignAttributes)
    ], UxIcon);
    return UxIcon;
}());
exports.UxIcon = UxIcon;
//# sourceMappingURL=ux-icon.js.map