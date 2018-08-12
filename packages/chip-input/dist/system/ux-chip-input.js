System.register(["aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, UxChipInput;
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
            }
        ],
        execute: function () {
            UxChipInput = /** @class */ (function () {
                function UxChipInput(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.disabled = false;
                    this.readonly = false;
                    this.separator = ', ';
                    this.value = undefined;
                    this.chips = new Array();
                }
                UxChipInput.prototype.bind = function () {
                    this.themeChanged(this.theme);
                    if (this.element.hasAttribute('placeholder')) {
                        var attributeValue = this.element.getAttribute('placeholder');
                        if (attributeValue) {
                            this.textbox.setAttribute('placeholder', attributeValue);
                            this.element.removeAttribute('placeholder');
                        }
                    }
                    if (this.value) {
                        this.chips = this.value.split(this.separator);
                    }
                    if (core_1.normalizeBooleanAttribute('disabled', this.disabled)) {
                        this.textbox.setAttribute('disabled', '');
                        this.chiprepeat.removeAttribute('deletable');
                        this.tagrepeat.removeAttribute('deletable');
                    }
                    if (core_1.normalizeBooleanAttribute('readonly', this.readonly)) {
                        this.textbox.setAttribute('readonly', '');
                        this.chiprepeat.removeAttribute('deletable');
                        this.tagrepeat.removeAttribute('deletable');
                    }
                };
                UxChipInput.prototype.attached = function () {
                    var _this = this;
                    var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
                    this.textbox.addEventListener('focus', function () {
                        _this.element.classList.add('focused');
                    });
                    this.textbox.addEventListener('blur', function () {
                        _this.addChip();
                        _this.element.classList.remove('focused');
                        _this.element.dispatchEvent(blurEvent);
                    });
                };
                UxChipInput.prototype.detached = function () {
                    var _this = this;
                    var blurEvent = aurelia_pal_1.DOM.createCustomEvent('blur', { bubbles: true });
                    this.textbox.removeEventListener('focus', function () {
                        _this.element.classList.add('focused');
                    });
                    this.textbox.removeEventListener('blur', function () {
                        _this.addChip();
                        _this.element.classList.remove('focused');
                        _this.element.dispatchEvent(blurEvent);
                    });
                };
                UxChipInput.prototype.handleKeyup = function (event) {
                    var key = event.which || event.keyCode;
                    if (key === 13) {
                        this.addChip();
                    }
                    if (key === 37) {
                        if (this.chips && this.textbox.value === '') {
                            var chip = this.chips.pop();
                            if (chip !== undefined) {
                                this.textbox.value = chip;
                            }
                        }
                    }
                };
                UxChipInput.prototype.addChip = function () {
                    if (this.textbox.value.length) {
                        if (!this.chips) {
                            this.chips = new Array();
                        }
                        this.chips.push(this.textbox.value);
                        this.textbox.value = '';
                        this.chipsChanged();
                    }
                };
                UxChipInput.prototype.editChip = function (value) {
                    if (this.textbox.value.length === 0) {
                        this.removeChip(value);
                        this.textbox.value = value;
                        this.chipsChanged();
                    }
                };
                UxChipInput.prototype.removeChip = function (value) {
                    var chipIndex = this.chips.indexOf(value, 0);
                    if (chipIndex > -1) {
                        this.chips.splice(chipIndex, 1);
                        this.chipsChanged();
                    }
                };
                UxChipInput.prototype.chipsChanged = function () {
                    var chipValue = this.chips.join(this.separator);
                    if (chipValue === '') {
                        chipValue = null;
                    }
                    if (chipValue !== this.value) {
                        this.value = chipValue;
                    }
                };
                UxChipInput.prototype.valueChanged = function (newValue) {
                    if (newValue && newValue !== this.chips.join(this.separator)) {
                        this.chips = newValue.split(this.separator);
                    }
                };
                UxChipInput.prototype.disabledChanged = function (newValue) {
                    if (core_1.normalizeBooleanAttribute('disabled', newValue)) {
                        this.textbox.setAttribute('disabled', '');
                        this.chiprepeat.removeAttribute('deletable');
                        this.tagrepeat.removeAttribute('deletable');
                    }
                    else {
                        this.textbox.removeAttribute('disabled');
                        this.chiprepeat.setAttribute('deletable', '');
                        this.tagrepeat.setAttribute('deletable', '');
                    }
                };
                UxChipInput.prototype.readonlyChanged = function (newValue) {
                    if (core_1.normalizeBooleanAttribute('readonly', newValue)) {
                        this.textbox.setAttribute('readonly', '');
                        this.chiprepeat.removeAttribute('deletable');
                        this.tagrepeat.removeAttribute('deletable');
                    }
                    else {
                        this.textbox.removeAttribute('readonly');
                        this.chiprepeat.setAttribute('deletable', '');
                        this.tagrepeat.setAttribute('deletable', '');
                    }
                };
                UxChipInput.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'chip-input';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxChipInput.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxChipInput.prototype, "readonly", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxChipInput.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxChipInput.prototype, "type", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxChipInput.prototype, "separator", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], UxChipInput.prototype, "value", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], UxChipInput.prototype, "chips", void 0);
                UxChipInput = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-chip-input')
                ], UxChipInput);
                return UxChipInput;
            }());
            exports_1("UxChipInput", UxChipInput);
        }
    };
});
