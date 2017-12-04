System.register(["aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-textarea-theme"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, ux_textarea_theme_1, theme, UxTextarea;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_textarea_theme_1_1) {
                ux_textarea_theme_1 = ux_textarea_theme_1_1;
            }
        ],
        execute: function () {
            theme = new ux_textarea_theme_1.UxTextareaTheme();
            UxTextarea = /** @class */ (function () {
                function UxTextarea(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.autofocus = null;
                    this.autoResize = null;
                    this.disabled = false;
                    this.readonly = false;
                    this.value = undefined;
                    styleEngine.ensureDefaultTheme(theme);
                }
                UxTextarea.prototype.bind = function () {
                    var _this = this;
                    if (this.theme != null) {
                        this.themeChanged(this.theme);
                    }
                    if (this.autofocus || this.autofocus === '') {
                        setTimeout(function () {
                            _this.textbox.focus();
                        }, 0);
                    }
                    if (this.element.hasAttribute('placeholder')) {
                        var attributeValue = this.element.getAttribute('placeholder');
                        if (attributeValue) {
                            this.textbox.setAttribute('placeholder', attributeValue);
                            this.element.removeAttribute('placeholder');
                        }
                    }
                    if (this.element.hasAttribute('required')) {
                        this.textbox.setAttribute('required', '');
                        this.element.removeAttribute('required');
                    }
                    if (this.cols) {
                        this.textbox.setAttribute('cols', this.cols.toString());
                        this.element.removeAttribute('cols');
                    }
                    if (this.rows) {
                        this.textbox.setAttribute('rows', this.rows.toString());
                        this.element.removeAttribute('rows');
                    }
                    if (this.minlength) {
                        this.textbox.setAttribute('minlength', this.minlength.toString());
                    }
                    if (this.maxlength) {
                        this.textbox.setAttribute('maxlength', this.maxlength.toString());
                    }
                    if (core_1.normalizeBooleanAttribute('disabled', this.disabled)) {
                        this.textbox.setAttribute('disabled', '');
                    }
                    if (core_1.normalizeBooleanAttribute('readonly', this.readonly)) {
                        this.textbox.setAttribute('readonly', '');
                    }
                };
                UxTextarea.prototype.attached = function () {
                    var _this = this;
                    var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
                    this.textbox.addEventListener('focus', function () {
                        _this.element.classList.add('focused');
                    });
                    this.textbox.addEventListener('blur', function () {
                        _this.element.classList.remove('focused');
                        _this.element.dispatchEvent(blurEvent);
                    });
                };
                UxTextarea.prototype.detached = function () {
                    var _this = this;
                    var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
                    this.textbox.removeEventListener('focus', function () {
                        _this.element.classList.add('focused');
                    });
                    this.textbox.removeEventListener('blur', function () {
                        _this.element.classList.remove('focused');
                        _this.element.dispatchEvent(blurEvent);
                    });
                };
                UxTextarea.prototype.disabledChanged = function (newValue) {
                    if (core_1.normalizeBooleanAttribute('disabled', newValue)) {
                        this.textbox.setAttribute('disabled', '');
                    }
                    else {
                        this.textbox.removeAttribute('disabled');
                    }
                };
                UxTextarea.prototype.readonlyChanged = function (newValue) {
                    if (core_1.normalizeBooleanAttribute('readonly', newValue)) {
                        this.textbox.setAttribute('readonly', '');
                    }
                    else {
                        this.textbox.removeAttribute('readonly');
                    }
                };
                UxTextarea.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'textarea';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxTextarea.prototype.valueChanged = function () {
                    if (this.autoResize !== null) {
                        this.textbox.style.height = 'auto';
                        this.textbox.style.height = this.textbox.scrollHeight + 2 + "px";
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "autofocus", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "autoResize", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "cols", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "maxlength", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "minlength", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "readonly", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "rows", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxTextarea.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], UxTextarea.prototype, "value", void 0);
                UxTextarea = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-textarea')
                ], UxTextarea);
                return UxTextarea;
            }());
            exports_1("UxTextarea", UxTextarea);
        }
    };
});
