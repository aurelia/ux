import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var UX_TAG_VIEW = "<template role=\"textbox\"> <require from=\"./ux-tag.css\"></require> <span> <slot></slot> </span> <span class=\"close\" click.delegate=\"closeTag()\"> </span> </template> ";

let UxTag = class UxTag {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = undefined;
    }
    bind() {
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'tag';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    closeTag() {
        const closeEvent = DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    }
};
UxTag.$view = UX_TAG_VIEW;
__decorate([
    bindable
], UxTag.prototype, "theme", void 0);
__decorate([
    bindable
], UxTag.prototype, "type", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxTag.prototype, "value", void 0);
UxTag = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-tag')
], UxTag);

var UX_CHIP_VIEW = "<template role=\"textbox\"> <require from=\"./ux-chip.css\"></require> <span> <slot></slot> </span> <span class=\"close\" click.delegate=\"closeChip()\"> </span> </template> ";

let UxChip = class UxChip {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = undefined;
    }
    bind() {
        this.themeChanged(this.theme);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'chip';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    closeChip() {
        const closeEvent = DOM.createCustomEvent('close', { bubbles: false });
        this.element.dispatchEvent(closeEvent);
    }
};
UxChip.$view = UX_CHIP_VIEW;
__decorate([
    bindable
], UxChip.prototype, "theme", void 0);
__decorate([
    bindable
], UxChip.prototype, "type", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChip.prototype, "value", void 0);
UxChip = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-chip')
], UxChip);

var UX_CHIP_INPUT_VIEW = "<template role=\"textbox\"> <require from=\"./ux-chip-input.css\"></require> <template if.bind=\"type.toLowerCase() !== 'tag'\"> <ux-chip deletable ref=\"chiprepeat\" close.trigger=\"removeChip(chip)\" dblclick.trigger=\"editChip(chip)\" repeat.for=\"chip of chips\"> ${chip} </ux-chip> </template> <template if.bind=\"type.toLowerCase() === 'tag'\"> <ux-tag deletable ref=\"tagrepeat\" close.trigger=\"removeChip(chip)\" dblclick.trigger=\"editChip(chip)\" repeat.for=\"chip of chips\"> ${chip} </ux-tag> </template> <input ref=\"textbox\" keyup.delegate=\"handleKeyup($event)\"> <div class=\"bottom-border\"></div> </template> ";

let UxChipInput = class UxChipInput {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.readonly = false;
        this.separator = ', ';
        this.value = undefined;
        this.chips = new Array();
    }
    bind() {
        this.themeChanged(this.theme);
        if (this.element.hasAttribute('placeholder')) {
            const attributeValue = this.element.getAttribute('placeholder');
            if (attributeValue) {
                this.textbox.setAttribute('placeholder', attributeValue);
                this.element.removeAttribute('placeholder');
            }
        }
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
    }
    attached() {
        const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.addEventListener('focus', () => {
            this.element.classList.add('focused');
        });
        this.textbox.addEventListener('blur', () => {
            this.addChip();
            this.element.classList.remove('focused');
            this.element.dispatchEvent(blurEvent);
        });
    }
    detached() {
        const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.removeEventListener('focus', () => {
            this.element.classList.add('focused');
        });
        this.textbox.removeEventListener('blur', () => {
            this.addChip();
            this.element.classList.remove('focused');
            this.element.dispatchEvent(blurEvent);
        });
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
};
UxChipInput.$view = UX_CHIP_INPUT_VIEW;
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
], UxChipInput.prototype, "type", void 0);
__decorate([
    bindable
], UxChipInput.prototype, "separator", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChipInput.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxChipInput.prototype, "chips", void 0);
UxChipInput = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-chip-input')
], UxChipInput);

class UxChipInputTheme {
    constructor() {
        this.themeKey = 'chip-input';
    }
}

class UxTagTheme {
    constructor() {
        this.themeKey = 'tag';
    }
}

class UxChipTheme {
    constructor() {
        this.themeKey = 'chip';
    }
}

function configure(config) {
    config.globalResources([
        UxTag,
        UxChip,
        UxChipInput,
    ]);
}

export { configure, UxChip, UxTag, UxChipInput, UxChipInputTheme, UxTagTheme, UxChipTheme };
