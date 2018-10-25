var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-logging", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-icon-map"], function (require, exports, aurelia_templating_1, aurelia_logging_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, ux_icon_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxIcon = /** @class */ (function () {
        function UxIcon(element, styleEngine, logger) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.logger = logger;
            this.icon = undefined;
        }
        UxIcon.prototype.bind = function () {
            if (this.size) {
                this.theme.size = this.size;
            }
            if (this.icon) {
                this.changeIcon(this.icon);
            }
            this.themeChanged(this.theme);
        };
        UxIcon.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxIcon.prototype.iconChanged = function (newValue) {
            this.changeIcon(newValue);
        };
        UxIcon.prototype.changeIcon = function (icon) {
            var iconSet = ux_icon_map_1.default.Map.find(function (set) { return set.name === icon; });
            if (iconSet) {
                // todo: add logic to switch set being used based on design language
                // after adding icon sets for said languages such as ios
                this.element.innerHTML = iconSet.material;
            }
            else {
                this.logger.error('ux-icon: no matching icon found', this.element);
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
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_logging_1.Logger),
            aurelia_templating_1.customElement('ux-icon'),
            aurelia_templating_1.processAttributes(core_1.processDesignAttributes)
        ], UxIcon);
        return UxIcon;
    }());
    exports.UxIcon = UxIcon;
});
