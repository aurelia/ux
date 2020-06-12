define(["require", "exports", "tslib", "aurelia-templating", "aurelia-pal", "aurelia-dependency-injection", "@aurelia-ux/core"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_pal_1, aurelia_dependency_injection_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxForm = void 0;
    var UxForm = /** @class */ (function () {
        function UxForm(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.bindSubmitToEnter = false;
        }
        UxForm.prototype.bind = function () {
            if (this.theme != null) {
                this.themeChanged(this.theme);
            }
            if (this.submitOnEnter !== undefined) {
                this.bindSubmitToEnter = true;
            }
        };
        UxForm.prototype.attached = function () {
            var _this = this;
            if (this.bindSubmitToEnter) {
                this.element.addEventListener('keyup', function (e) {
                    var canSubmit = true;
                    if (e.srcElement != null && e.srcElement.tagName === 'TEXTAREA') {
                        canSubmit = false;
                    }
                    if (e.keyCode === 13 && canSubmit) {
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
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'form';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxForm.prototype.submitForm = function () {
            var submitEvent = aurelia_pal_1.DOM.createCustomEvent('submit', { bubbles: true, target: this.element });
            this.element.dispatchEvent(submitEvent);
        };
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxForm.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxForm.prototype, "submitOnEnter", void 0);
        UxForm = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ux-form'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-form.html'))
        ], UxForm);
        return UxForm;
    }());
    exports.UxForm = UxForm;
});
//# sourceMappingURL=ux-form.js.map