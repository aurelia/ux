var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { PaperRipple } from '../effects/paper-ripple';
import { processDesignAttributes } from '../designs/design-attributes';
let UxCheckbox = class UxCheckbox {
    constructor(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.disabled = null;
        this.effect = null;
        this.matcher = (a, b) => a === b;
        this.tabindex = 0;
        this.theme = null;
        this.checked = false;
        this.value = null;
        this.ripple = null;
    }
    get isDisabled() {
        return this.disabled === true || this.disabled === '' || this.disabled === 'disabled';
    }
    created(_, myView) {
        this.view = myView;
    }
    bind() {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.checked) {
            this.checkedChanged();
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(this, newValue);
    }
    checkedChanged() {
        const elementValue = this.model ? this.model : this.value;
        let isChecked = this.checked;
        if (Array.isArray(this.checked)) {
            isChecked = this.checked.some(item => this.matcher(item, elementValue));
        }
        if (isChecked) {
            this.element.classList.add('checked');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('checked');
            this.element.setAttribute('aria-checked', 'false');
        }
    }
    toggleCheckbox() {
        if (this.isDisabled) {
            return;
        }
        const elementValue = this.model ? this.model : this.value;
        if (Array.isArray(this.checked)) {
            const index = this.checked.findIndex(item => this.matcher(item, elementValue));
            if (index === -1) {
                this.checked.push(elementValue);
            }
            else if (index !== -1) {
                this.checked.splice(index, 1);
            }
            this.checkedChanged();
        }
        else if (elementValue != null && typeof elementValue !== 'boolean') {
            if (this.checked) {
                this.checked = null;
            }
            else {
                this.checked = elementValue;
            }
        }
        else {
            this.checked = !this.checked;
        }
    }
    onKeyup(e) {
        const key = e.which || e.keyCode;
        if (key === 13) {
            this.toggleCheckbox();
        }
    }
    onMouseDown(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                const container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
        }
        this.toggleCheckbox();
        e.preventDefault();
    }
    onMouseUp(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.checkbox.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
    }
};
__decorate([
    bindable
], UxCheckbox.prototype, "disabled", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "effect", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "label", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "matcher", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "model", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "tabindex", void 0);
__decorate([
    bindable
], UxCheckbox.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "checked", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    bindable
], UxCheckbox.prototype, "value", void 0);
UxCheckbox = __decorate([
    inject(Element, ViewResources, StyleEngine),
    customElement('ux-checkbox'),
    processAttributes(processDesignAttributes)
], UxCheckbox);
export { UxCheckbox };
