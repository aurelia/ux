var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { ElementEvents, DOM } from 'aurelia-framework';
let UxRadio = class UxRadio {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.checked = false;
        this.ripple = null;
        Object.setPrototypeOf(element, uxRadioElementProto);
    }
    get isDisabled() {
        return normalizeBooleanAttribute('disabled', this.disabled);
    }
    bind() {
        if (this.element.hasAttribute('id')) {
            const id = this.element.id;
            if (id != null) {
                this.radio.setAttribute('id', id);
                this.element.removeAttribute('id');
            }
        }
        if (this.element.hasAttribute('tabindex')) {
            const tabIndex = this.element.getAttribute('tabindex');
            if (tabIndex != null) {
                this.radio.setAttribute('tabindex', tabIndex);
                this.element.removeAttribute('tabindex');
            }
        }
        if (this.element.hasAttribute('name')) {
            const name = this.element.getAttribute('name');
            if (name != null) {
                this.radio.setAttribute('name', name);
                this.element.removeAttribute('name');
            }
        }
        if (this.element.hasAttribute('checked')) {
            this.element.checked = true;
        }
        if (this.checked) {
            this.radio.checked = true;
            this.element.classList.add('ux-radio--checked');
        }
        this.disabledChanged(this.radio.disabled);
        this.themeChanged(this.theme);
    }
    attached() {
        this.radio.addEventListener('change', stopEvent);
    }
    detached() {
        this.radio.removeEventListener('change', stopEvent);
    }
    getChecked() {
        return this.checked;
    }
    setChecked(value) {
        const oldValue = this.checked;
        const newValue = value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            if (this.radio) {
                this.radio.checked = !!newValue;
                if (this.radio.checked) {
                    this.element.classList.add('ux-radio--checked');
                }
                else {
                    this.element.classList.remove('ux-radio--checked');
                }
            }
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    disabledChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-radio--disabled');
        }
        else {
            this.element.classList.remove('ux-radio--disabled');
        }
    }
    focusedChanged(newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-radio--focused');
        }
        else {
            this.element.classList.remove('ux-radio--focused');
        }
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'radio';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    valueChanged(value) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(value);
    }
    onMouseDown(e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple')) {
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
            const winEvents = new ElementEvents(window);
            const upAction = () => {
                this.ripple.upAction();
                winEvents.disposeAll();
            };
            winEvents.subscribe('blur', upAction);
            winEvents.subscribe('mouseup', upAction, true);
        }
        e.preventDefault();
    }
};
__decorate([
    bindable
], UxRadio.prototype, "disabled", void 0);
__decorate([
    bindable
], UxRadio.prototype, "effect", void 0);
__decorate([
    bindable
], UxRadio.prototype, "id", void 0);
__decorate([
    bindable
], UxRadio.prototype, "theme", void 0);
__decorate([
    observable({ initializer: () => false })
], UxRadio.prototype, "value", void 0);
__decorate([
    observable()
], UxRadio.prototype, "focused", void 0);
__decorate([
    computedFrom('disabled')
], UxRadio.prototype, "isDisabled", null);
UxRadio = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-radio')
], UxRadio);
export { UxRadio };
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxRadioElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'radio',
    },
    checked: {
        get() {
            return getVm(this).getChecked();
        },
        set(value) {
            getVm(this).setChecked(value);
        }
    }
});
