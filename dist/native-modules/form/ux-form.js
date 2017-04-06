var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { processDesignAttributes } from '../designs/design-attributes';
var UxForm = (function () {
    function UxForm(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.theme = null;
        this.bindSubmitToEnter = false;
    }
    UxForm.prototype.created = function (_, myView) {
        this.view = myView;
    };
    UxForm.prototype.bind = function () {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.submitOnEnter !== undefined) {
            this.bindSubmitToEnter = true;
        }
    };
    UxForm.prototype.attached = function () {
        var _this = this;
        if (this.bindSubmitToEnter) {
            this.element.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    _this.submitForm();
                }
            });
        }
    };
    UxForm.prototype.detached = function () {
        var _this = this;
        if (this.bindSubmitToEnter) {
            this.element.removeEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    _this.submitForm();
                }
            });
        }
    };
    UxForm.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(this, newValue);
    };
    UxForm.prototype.submitForm = function () {
        var submitEvent = DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
        this.element.dispatchEvent(submitEvent);
    };
    return UxForm;
}());
__decorate([
    bindable
], UxForm.prototype, "theme", void 0);
__decorate([
    bindable
], UxForm.prototype, "submitOnEnter", void 0);
UxForm = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-form'),
    processAttributes(processDesignAttributes)
], UxForm);
export { UxForm };
