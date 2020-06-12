define(["require", "exports", "tslib", "aurelia-templating", "aurelia-logging", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-icon-theme", "./ux-icon-map", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_logging_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, ux_icon_theme_1, ux_icon_map_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxIcon = void 0;
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
});
//# sourceMappingURL=ux-icon.js.map