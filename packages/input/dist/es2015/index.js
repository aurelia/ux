import { __decorate } from 'tslib';
import { customElement, bindable, inlineView } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, AureliaUX } from '@aurelia-ux/core';
import { bindingMode, DOM as DOM$1 } from 'aurelia-framework';

var css = "ux-input{display:flex;width:100%;height:56px;margin-top:8px;padding:0 16px;align-items:center;box-sizing:border-box;position:relative;cursor:text;color:inherit;color:var(--ux-theme--input-foreground, inherit);background-color:#00000011;background-color:var(--ux-theme--input-background, #00000011);border-radius:4px 4px 0 0;border-radius:var(--ux-theme--input-border-radius, 4px 4px 0 0)}ux-input:hover{background-color:#00000027;background-color:var(--ux-theme--input-background-hover, #00000027)}ux-input>input{width:100%;box-sizing:border-box;font-size:inherit;font-size:var(--ux-theme--input-font-size, inherit);letter-spacing:inherit;letter-spacing:var(--ux-theme--input-letter-spacing, inherit);padding:6px 0 4px 0;padding-right:0;padding-left:0;border:0;color:inherit;background-color:transparent;outline:0;padding-left:0;padding-right:0}ux-input label{position:absolute;cursor:text;font-size:13px;font-size:var(--ux-theme--input-label-font-size, 13px);letter-spacing:.5px;letter-spacing:var(--ux-theme--input-label-letter-spacing, 0.5px);transition:transform ease 150ms}ux-input.ux-input--focused label{color:#4043ff;color:var(--ux-theme--input-border-focus, var(--ux-design--primary, #4043ff))}ux-input.ux-input--has-value label,ux-input.ux-input--focused label{transform:translateY(-1.3em)}ux-input [slot=leading-icon]{margin-left:-8px;margin-right:8px}ux-input [slot=trailing-icon]{margin-left:8px;margin-right:-8px}ux-input.ux-input--has-value>[slot=leading-icon]~label,ux-input.ux-input--focused>[slot=leading-icon]~label{transform:translateX(24px) translateY(-1.3em)}ux-input [slot=leading-icon]~label{transform:translateX(24px)}ux-input :not(input){color:#555;color:var(--ux-theme--input-foreground-label, #555)}.ux-input__border-bottom{height:1px;background-color:#00000066;background-color:var(--ux-theme--input-border-bottom, #00000066);position:absolute;bottom:0;left:0;right:0}ux-input:hover .ux-input__border-bottom{background-color:#00000066;background-color:var(--ux-theme--input-border-bottom-hover, #00000066)}.ux-input__border-bottom-active{height:2px;background-color:#4043ff;background-color:var(--ux-theme--input-border-bottom-focus, var(--ux-design--primary, #4043ff));position:absolute;bottom:0;left:0;right:0;transform:scalex(0);transition:transform ease 150ms}ux-input input:focus~.ux-input__border-bottom-active{transform:scaleX(1)}ux-input.has-error input{box-shadow:none}ux-input.has-error .ux-input__border-bottom,ux-input.has-error .ux-input__border-bottom-active{background-color:#f44336;background-color:var(--ux-theme--input-error, #F44336)}ux-input.has-error>:not(input){color:#f44336;color:var(--ux-theme--input-error, #F44336)}ux-input[disabled],ux-input[readonly]{background-color:#e1e1e1;background-color:var(--ux-theme--input-disabled-background, #e1e1e1)}ux-input[disabled],ux-input[disabled] label,ux-input[disabled]:hover,ux-input[disabled]:focus,ux-input[readonly],ux-input[readonly] label,ux-input[readonly]:hover,ux-input[readonly]:focus{color:#989898;color:var(--ux-theme--input-disabled-foreground, #989898)}ux-input[disabled] .ux-input__border-bottom,ux-input[disabled]:hover .ux-input__border-bottom,ux-input[disabled]:focus .ux-input__border-bottom,ux-input[readonly] .ux-input__border-bottom,ux-input[readonly]:hover .ux-input__border-bottom,ux-input[readonly]:focus .ux-input__border-bottom{background-color:#989898;background-color:var(--ux-theme--input-disabled-border, #989898)}ux-input.outline{border:1px solid #00000066;border:1px solid var(--ux-theme--input-border, #00000066);border-radius:6px}ux-input.outline .ux-input__border-bottom,ux-input.outline .ux-input__border-bottom-active{display:none}ux-input.outline:hover{border:1px solid #00000066;border:1px solid var(--ux-theme--input-border-hover, #00000066)}ux-input.outline.ux-input--focused{border:2px solid #4043ff;border:2px solid var(--ux-theme--input-border-focus, var(--ux-design--primary, #4043ff))}ux-input.outline.ux-input--has-value label,ux-input.outline.ux-input--focused label{transform:translateX(0) translateY(-2.1em);padding-left:4px;padding-right:4px}ux-input.outline.has-error{border-color:#f44336;border-color:var(--ux-theme--input-error, #F44336)}"

var UX_INPUT_VIEW = "<template role=textbox class.bind=\"focused ? 'focused' : ''\" disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" aria-disabled.bind=\"disabled & booleanAttr\" aria-readonly.bind=\"readonly & booleanAttr\" click.trigger=focusInput()> <slot name=leading-icon></slot> <label if.bind=\"label || placeholder\">${label || placeholder}</label> <input ref=textbox value.bind=rawValue focus.bind=focused disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" required.bind=\"required & booleanAttr\"> <slot name=trailing-icon></slot> <div class=ux-input__border-bottom></div> <div class=ux-input__border-bottom-active></div> </template> ";

let UxInput = class UxInput {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.disabled = false;
        this.readonly = false;
        this.rawValue = '';
        this.focused = false;
        this.value = undefined;
        Object.setPrototypeOf(element, uxInputElementProto);
    }
    bind() {
        const element = this.element;
        const textbox = this.textbox;
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        if (element.hasAttribute('id')) {
            const attributeValue = element.getAttribute('id');
            if (attributeValue) {
                element.removeAttribute('id');
                textbox.setAttribute('id', attributeValue);
            }
        }
        if (element.hasAttribute('placeholder')) {
            const attributeValue = element.getAttribute('placeholder');
            if (attributeValue) {
                this.label = attributeValue;
            }
        }
        if (element.hasAttribute('step')) {
            const attributeValue = element.getAttribute('step');
            if (attributeValue) {
                textbox.setAttribute('step', attributeValue);
                element.removeAttribute('step');
            }
        }
        if ([
            'text',
            'password',
            'number',
            'email',
            'url',
            'tel',
            'search'
        ].includes(this.type)) {
            textbox.setAttribute('type', this.type);
        }
        if (this.min) {
            textbox.setAttribute('min', this.min.toString());
        }
        if (this.max) {
            textbox.setAttribute('max', this.max.toString());
        }
        if (this.minlength) {
            textbox.setAttribute('minlength', this.minlength.toString());
        }
        if (this.maxlength) {
            textbox.setAttribute('maxlength', this.maxlength.toString());
        }
        this.themeChanged(this.theme);
    }
    attached() {
        this.textbox.addEventListener('change', stopEvent);
        this.textbox.addEventListener('input', stopEvent);
    }
    detached() {
        this.textbox.removeEventListener('change', stopEvent);
        this.textbox.removeEventListener('input', stopEvent);
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        const oldValue = this.value;
        const newValue = this.processRawValue(value);
        if (oldValue !== newValue) {
            this.value = newValue;
            this.ignoreRawChanges = true;
            this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
            this.ignoreRawChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    processRawValue(rawValue) {
        let newValue = rawValue;
        if (this.type === 'number') {
            newValue = rawValue === '' ? NaN : Number(rawValue);
            if (isNaN(newValue)) {
                newValue = null;
            }
            else {
                if (this.min !== undefined && this.min > newValue) {
                    newValue = this.min;
                }
                if (this.max !== undefined && newValue > this.max) {
                    newValue = this.max;
                }
            }
        }
        return newValue;
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    focusedChanged(focused) {
        if (focused === true) {
            this.element.classList.add('ux-input--focused');
        }
        else {
            this.element.classList.remove('ux-input--focused');
        }
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    }
    typeChanged(newValue) {
        if (newValue !== 'text' && newValue !== 'password' && newValue !== 'number') {
            this.type = 'text';
        }
    }
    rawValueChanged(newValue) {
        if (newValue.length > 0) {
            this.element.classList.add('ux-input--has-value');
        }
        else {
            this.element.classList.remove('ux-input--has-value');
        }
        if (this.ignoreRawChanges) {
            return;
        }
        this.setValue(newValue);
    }
    focusInput() {
        this.textbox.focus();
    }
};
__decorate([
    bindable
], UxInput.prototype, "autofocus", void 0);
__decorate([
    bindable
], UxInput.prototype, "disabled", void 0);
__decorate([
    bindable
], UxInput.prototype, "maxlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "minlength", void 0);
__decorate([
    bindable
], UxInput.prototype, "min", void 0);
__decorate([
    bindable
], UxInput.prototype, "max", void 0);
__decorate([
    bindable
], UxInput.prototype, "readonly", void 0);
__decorate([
    bindable
], UxInput.prototype, "theme", void 0);
__decorate([
    bindable
], UxInput.prototype, "label", void 0);
__decorate([
    bindable
], UxInput.prototype, "type", void 0);
__decorate([
    observable
], UxInput.prototype, "rawValue", void 0);
__decorate([
    observable
], UxInput.prototype, "focused", void 0);
UxInput = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-input'),
    inlineView(UX_INPUT_VIEW)
], UxInput);
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxInputElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get() {
            return getVm(this).getValue();
        },
        set(value) {
            getVm(this).setValue(value);
        }
    }
});

class UxInputTheme {
    constructor() {
        this.themeKey = 'input';
    }
}

function configure(config) {
    DOM$1.injectStyles(css, undefined, undefined, 'ux-input-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources(UxInput);
}
const uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};

export { configure, UxInputTheme, UxInput };
