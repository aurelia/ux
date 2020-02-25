var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { bindingMode, observable, computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
let UxChipInput = class UxChipInput {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.readonly = false;
        this.separator = ', ';
        this.variant = 'filled';
        this.chipVariant = 'filled';
        this.dense = false;
        this.focused = false;
        this.value = undefined;
        this.chips = new Array();
    }
    bind() {
        this.themeChanged(this.theme);
        this.dense = normalizeBooleanAttribute('dense', this.dense);
        if (this.value) {
            this.chips = this.value.split(this.separator);
        }
        if (normalizeBooleanAttribute('disabled', this.disabled)) {
            this.textbox.setAttribute('disabled', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        if (normalizeBooleanAttribute('readonly', this.readonly)) {
            this.textbox.setAttribute('readonly', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        this.chipsChanged();
    }
    attached() {
        this.variantChanged(this.variant);
    }
    focus() {
        this.focused = true;
    }
    focusedChanged() {
        this.element.classList.toggle('ux-input-component--focused', this.focused);
        if (!this.focused) {
            // blur
            this.addChip();
        }
    }
    handleKeyup(event) {
        const key = event.which || event.keyCode;
        if (key === 13) {
            this.addChip();
        }
        if (key === 37) {
            if (this.chips && this.textbox.value === '') {
                const chip = this.chips.pop();
                if (chip !== undefined) {
                    this.textbox.value = chip;
                }
            }
        }
    }
    addChip() {
        if (!this.textbox) {
            return;
        }
        if (this.textbox.value.length) {
            if (!this.chips) {
                this.chips = new Array();
            }
            this.chips.push(this.textbox.value);
            this.textbox.value = '';
            this.chipsChanged();
        }
    }
    editChip(value) {
        if (this.textbox.value.length === 0) {
            this.removeChip(value);
            this.textbox.value = value;
            this.chipsChanged();
        }
    }
    removeChip(value) {
        const chipIndex = this.chips.indexOf(value, 0);
        if (chipIndex > -1) {
            this.chips.splice(chipIndex, 1);
            this.chipsChanged();
        }
    }
    chipsChanged() {
        let chipValue = this.chips.join(this.separator);
        if (chipValue === '') {
            chipValue = null;
        }
        if (chipValue !== this.value) {
            this.value = chipValue;
        }
        this.element.classList.toggle('ux-input-component--has-value', this.chips.length > 0);
    }
    valueChanged(newValue) {
        if (newValue && newValue !== this.chips.join(this.separator)) {
            this.chips = newValue.split(this.separator);
        }
    }
    disabledChanged(newValue) {
        if (normalizeBooleanAttribute('disabled', newValue)) {
            this.textbox.setAttribute('disabled', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        else {
            this.textbox.removeAttribute('disabled');
            this.chiprepeat.setAttribute('deletable', '');
            this.tagrepeat.setAttribute('deletable', '');
        }
    }
    readonlyChanged(newValue) {
        if (normalizeBooleanAttribute('readonly', newValue)) {
            this.textbox.setAttribute('readonly', '');
            this.chiprepeat.removeAttribute('deletable');
            this.tagrepeat.removeAttribute('deletable');
        }
        else {
            this.textbox.removeAttribute('readonly');
            this.chiprepeat.setAttribute('deletable', '');
            this.tagrepeat.setAttribute('deletable', '');
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip-input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    variantChanged(newValue) {
        this.element.style.backgroundColor = newValue === 'outline' ?
            this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
            '';
    }
    get placeholderMode() {
        return typeof this.label !== 'string' || this.label.length === 0;
    }
    stopEvent(event) {
        event.stopPropagation();
    }
};
__decorate([
    bindable
], UxChipInput.prototype, "disabled", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "readonly", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "theme", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "label", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "placeholder", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "separator", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "variant", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "chipVariant", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "dense", void 0);
__decorate([
    observable
], UxChipInput.prototype, "focused", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChipInput.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChipInput.prototype, "chips", void 0);
__decorate([
    computedFrom('label')
], UxChipInput.prototype, "placeholderMode", null);
UxChipInput = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-chip-input')
], UxChipInput);
export { UxChipInput };
//# sourceMappingURL=ux-chip-input.js.map