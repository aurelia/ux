var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-logging", "aurelia-binding", "aurelia-dependency-injection", "../styles/style-engine", "../designs/design-attributes", "./ux-icon-map"], function (require, exports, aurelia_templating_1, aurelia_logging_1, aurelia_binding_1, aurelia_dependency_injection_1, style_engine_1, design_attributes_1, ux_icon_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxIcon = (function () {
        function UxIcon(element, resources, styleEngine, logger) {
            this.element = element;
            this.resources = resources;
            this.styleEngine = styleEngine;
            this.logger = logger;
            this.icon = undefined;
        }
        UxIcon.prototype.created = function (_, myView) {
            this.view = myView;
        };
        UxIcon.prototype.bind = function () {
            if (this.size) {
                this.theme.size = this.size;
            }
            if (this.theme) {
                this.styleEngine.applyTheme(this, this.theme);
            }
            if (this.icon) {
                this.changeIcon(this.icon);
            }
        };
        UxIcon.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(this, newValue);
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
        return UxIcon;
    }());
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
        aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, style_engine_1.StyleEngine, aurelia_logging_1.Logger),
        aurelia_templating_1.customElement('ux-icon'),
        aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
    ], UxIcon);
    exports.UxIcon = UxIcon;
});
