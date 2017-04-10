var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "../styles/style-engine", "../designs/design-attributes"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, style_engine_1, design_attributes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxTag = (function () {
        function UxTag(element, resources, styleEngine) {
            this.element = element;
            this.resources = resources;
            this.styleEngine = styleEngine;
            this.theme = null;
            this.value = undefined;
        }
        UxTag.prototype.created = function (_, myView) {
            this.view = myView;
        };
        UxTag.prototype.bind = function () {
            if (this.theme) {
                this.styleEngine.applyTheme(this, this.theme);
            }
        };
        UxTag.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(this, newValue);
        };
        UxTag.prototype.closeTag = function () {
            var closeEvent = aurelia_pal_1.DOM.createCustomEvent('close', { bubbles: false });
            this.element.dispatchEvent(closeEvent);
        };
        return UxTag;
    }());
    __decorate([
        aurelia_templating_1.bindable
    ], UxTag.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxTag.prototype, "type", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxTag.prototype, "value", void 0);
    UxTag = __decorate([
        aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
        aurelia_templating_1.customElement('ux-tag'),
        aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
    ], UxTag);
    exports.UxTag = UxTag;
});
