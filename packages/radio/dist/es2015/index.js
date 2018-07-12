import { __decorate } from 'tslib';
import { customElement, bindable, inlineView } from 'aurelia-templating';
import { computedFrom, observable, CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute, AureliaUX } from '@aurelia-ux/core';
import { ElementEvents, DOM, bindingMode } from 'aurelia-framework';

var UX_RADIO_VIEW = "<template class=\"${effect !== null ? effect : ''}\"> <input type=radio ref=radio change.trigger=\"value = $event.target.checked\" mousedown.trigger=onMouseDown($event) disabled.bind=\"disabled & booleanAttr\" aria-checked.bind=\"indeterminate ? 'mixed' : checked ? true : false\" aria-disabled.bind=\"disabled & booleanAttr\"> <div class=ripplecontainer> <span class=ripple></span> </div> <div class=radio> <div class=background-box> </div> </div> </template> ";

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
        const element = this.element;
        const radio = this.radio;
        if (element.hasAttribute('id')) {
            const id = element.id;
            if (id != null) {
                radio.setAttribute('id', id);
                element.removeAttribute('id');
            }
        }
        if (element.hasAttribute('tabindex')) {
            const tabIndex = element.getAttribute('tabindex');
            if (tabIndex != null) {
                radio.setAttribute('tabindex', tabIndex);
                element.removeAttribute('tabindex');
            }
        }
        if (element.hasAttribute('checked')) {
            element.checked = true;
        }
        if (this.checked) {
            radio.checked = true;
        }
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
            }
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
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
    computedFrom('disabled')
], UxRadio.prototype, "isDisabled", null);
UxRadio = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-radio'),
    inlineView(UX_RADIO_VIEW)
], UxRadio);
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

var css = "ux-radio{display:inline-block;outline:0;height:24px;width:24px;box-sizing:border-box;position:relative}ux-radio>input{position:absolute;top:0;bottom:0;left:0;right:0;opacity:0;width:100%;height:100%;cursor:pointer;z-index:1}ux-radio>input:disabled{cursor:default}ux-radio>.radio{width:24px;height:24px;border:solid 2px #455a64;border:var(--ux-theme--checkbox-border, solid 2px #455A64);border-radius:50%;display:inline-flex;box-sizing:border-box;cursor:pointer;align-items:center;justify-content:center}ux-radio input:hover:not(:disabled)~.radio{border:solid 2px #ff4081;border:var(--ux-theme--radio-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-radio input:checked~.radio{border:solid 2px #ff4081;border:var(--ux-theme--radio-checked-background, var(--ux-design--accent, #FF4081));border:var(--ux-theme--radio-hover-border, solid 2px var(--ux-design--accent, #FF4081))}ux-radio>.radio>.background-box{width:100%;height:100%;background-color:#ff4081;background-color:var(--ux-theme--radio-checked-background, var(--ux-design--accent, #FF4081));border-radius:50%;transform:scale3d(0,0,0);transition:150ms}ux-radio input:checked~.radio>.background-box{transform:scale3d(.75,.75,.75)}ux-radio>.radio>.background-box>svg{fill:#fff;fill:var(--ux-theme--radio-checkmark-color, #FFF)}ux-radio.disabled{pointer-events:none;cursor:default}ux-radio input:disabled~.radio:hover{border:solid 2px #9e9e9e;border:var(--ux-theme--radio-disabled-border, solid 2px #9E9E9E)}ux-radio input:disabled~.radio{border:solid 2px #9e9e9e;border:var(--ux-theme--radio-disabled-border, solid 2px #9E9E9E)}ux-radio input:checked:disabled~.radio>.background-box{background-color:#9e9e9e;background-color:var(--ux-theme--radio-disabled-background, #9E9E9E)}ux-radio input:disabled~.radio>.background-box::after{border-color:#e0e0e0;border-color:var(--ux-theme--radio-disabled-foreground, #E0E0E0)}ux-radio .ripplecontainer{position:relative;width:0;height:0}ux-radio .ripplecontainer>.paper-ripple{top:auto;left:auto;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%}ux-radio .ripplecontainer>.ripple{position:absolute;right:-36px;bottom:-36px;width:50px;height:50px;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.22);transition:transform 100ms ease-in-out;transform:scale3d(0,0,0)}ux-radio input:focus~.ripplecontainer>.ripple{transform:scale3d(1,1,1)}ux-radio input:disabled:focus~.ripplecontainer>.ripple{transform:scale3d(0,0,0)}"

class UxRadioTheme {
    constructor() {
        this.themeKey = 'radio';
    }
}

function configure(config) {
    DOM.injectStyles(css, undefined, undefined, 'ux-radio-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources(UxRadio);
}
const uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};

export { configure, UxRadioTheme, UxRadio };
