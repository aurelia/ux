var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { processDesignAttributes } from '../designs/design-attributes';
let UxTextarea = class UxTextarea {
    constructor(element, styleEngine, resources) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.resources = resources;
        this.autofocus = null;
        this.autoResize = null;
        this.disabled = false;
        this.readonly = false;
        this.theme = null;
        this.value = undefined;
    }
    created(_, myView) {
        this.view = myView;
    }
    bind() {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
        if (this.autofocus || this.autofocus === '') {
            setTimeout(() => {
                this.textbox.focus();
            }, 0);
        }
        if (this.element.hasAttribute('placeholder')) {
            const attributeValue = this.element.getAttribute('placeholder');
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
        if (this.disabled || this.disabled === '') {
            this.textbox.setAttribute('disabled', '');
        }
        if (this.readonly || this.readonly === '') {
            this.textbox.setAttribute('readonly', '');
        }
    }
    attached() {
        const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });
        this.textbox.addEventListener('focus', () => {
            this.element.classList.add('focused');
        });
        this.textbox.addEventListener('blur', () => {
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
            this.element.classList.remove('focused');
            this.element.dispatchEvent(blurEvent);
        });
    }
    disabledChanged(newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('disabled', 'true');
        }
        else {
            this.textbox.removeAttribute('disabled');
        }
    }
    readonlyChanged(newValue) {
        if (newValue === true || newValue === '') {
            this.textbox.setAttribute('readonly', 'true');
        }
        else {
            this.textbox.removeAttribute('readonly');
        }
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(this, newValue);
    }
    valueChanged() {
        if (this.autoResize !== null) {
            this.textbox.style.height = 'auto';
            this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
        }
    }
};
__decorate([
    bindable
], UxTextarea.prototype, "autofocus", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "autoResize", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "cols", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "disabled", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "maxlength", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "minlength", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "readonly", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "rows", void 0);
__decorate([
    bindable
], UxTextarea.prototype, "theme", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], UxTextarea.prototype, "value", void 0);
UxTextarea = __decorate([
    inject(Element, StyleEngine, ViewResources),
    customElement('ux-textarea'),
    processAttributes(processDesignAttributes)
], UxTextarea);
export { UxTextarea };
