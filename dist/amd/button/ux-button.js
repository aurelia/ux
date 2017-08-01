var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "../styles/style-engine", "../designs/design-attributes", "../effects/paper-ripple"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, style_engine_1, design_attributes_1, paper_ripple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxButton = (function () {
        function UxButton(resources, styleEngine) {
            this.resources = resources;
            this.styleEngine = styleEngine;
            this.type = null;
            this.size = null;
            this.effect = null;
            this.disabled = false;
            this.theme = null;
            this.ripple = null;
        }
        UxButton.prototype.created = function (_, myView) {
            this.view = myView;
        };
        UxButton.prototype.bind = function () {
            if (this.theme) {
                this.styleEngine.applyTheme(this, this.theme);
            }
            // ensure we cast empty string as true
            if (typeof this.disabled === 'string' && this.disabled === '') {
                this.disabled = true;
            }
            if (this.disabled) {
                this.button.setAttribute('disabled', '');
            }
        };
        UxButton.prototype.themeChanged = function (newValue) {
            this.styleEngine.applyTheme(this, newValue);
        };
        UxButton.prototype.disabledChanged = function (newValue) {
            // ensure we cast empty string as true
            if (typeof newValue === 'string' && newValue === '') {
                newValue = true;
            }
            if (newValue) {
                this.button.setAttribute('disabled', '');
            }
            else {
                this.button.removeAttribute('disabled');
            }
        };
        UxButton.prototype.onMouseDown = function (e) {
            if (this.button.classList.contains('ripple')) {
                if (this.ripple === null) {
                    this.ripple = new paper_ripple_1.PaperRipple();
                    this.button.appendChild(this.ripple.$);
                }
                if (this.button.classList.contains('fab') || this.button.classList.contains('icon')) {
                    this.ripple.center = true;
                    this.ripple.round = true;
                }
                this.ripple.downAction(e);
            }
            return true;
        };
        UxButton.prototype.onMouseUp = function () {
            if (this.button.classList.contains('ripple') && this.ripple !== null) {
                this.ripple.upAction();
            }
            return true;
        };
        return UxButton;
    }());
    __decorate([
        aurelia_templating_1.bindable
    ], UxButton.prototype, "type", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxButton.prototype, "size", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxButton.prototype, "effect", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxButton.prototype, "disabled", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxButton.prototype, "theme", void 0);
    UxButton = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_templating_1.ViewResources, style_engine_1.StyleEngine),
        aurelia_templating_1.customElement('ux-button'),
        aurelia_templating_1.processAttributes(design_attributes_1.processDesignAttributes)
    ], UxButton);
    exports.UxButton = UxButton;
});
