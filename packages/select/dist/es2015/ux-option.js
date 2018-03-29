var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, bindable, DOM, ElementEvents, PLATFORM, customElement, BindingEngine, inlineView, processAttributes, } from 'aurelia-framework';
import { PaperRipple } from '@aurelia-ux/core';
import { getAuViewModel } from './util';
import * as UX_OPTION_VIEW from './ux-option.html';
let UxOption = class UxOption {
    constructor(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.selected = false;
        this.focused = false;
        Object.setPrototypeOf(element, UxOptionElementProto);
    }
    created() {
        const element = this.element;
        if (element.hasAttribute('value')) {
            this.value = element.getAttribute('value');
        }
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
        element.removeAttribute('text');
    }
    bind() {
        if (this.value === undefined) {
            this.value = this.text;
        }
    }
    attached() {
        const optGroup = this.optGroup = this.getOptGroup();
        const uxSelect = this.uxSelect = this.getUxSelect();
        const bindingEngine = this.bindingEngine;
        this.setParentDisabled(optGroup ? optGroup.isDisabled : uxSelect.isDisabled);
        this.isMultiple = uxSelect.isMultiple;
        this.subscriptions = [
            bindingEngine.propertyObserver(uxSelect, 'isMultiple').subscribe(this.uxMultipleChanged.bind(this)),
            optGroup
                // ux-opt group will also subscribe to ux-select to know if it's disabled
                ? bindingEngine.propertyObserver(optGroup, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
                // If ux-option is not a member of a group, then subscribe to disabled state of ux-select
                : bindingEngine.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        ];
    }
    detached() {
        for (const s of this.subscriptions) {
            s.dispose();
        }
        this.subscriptions.length = 0;
    }
    getOptGroup() {
        let el = this.element;
        while (el) {
            if (el.tagName === 'UX-OPTGROUP') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        return null;
    }
    getUxSelect() {
        let el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option has no "ux-select" parent');
    }
    uxMultipleChanged(useSelect) {
        this.isMultiple = useSelect;
    }
    setParentDisabled(disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    }
    notify() {
        this.element.dispatchEvent(DOM.createCustomEvent('select', { bubbles: true, detail: this.element }));
    }
    getFocused() {
        return this.focused;
    }
    setFocused(focused) {
        this.focused = !!focused;
    }
    getSelected() {
        return this.selected;
    }
    setSelected(selected) {
        const oldValue = this.selected;
        const newValue = !!selected;
        if (newValue !== oldValue) {
            this.selected = newValue;
            this.notify();
        }
    }
    getDisabled() {
        return this.disabled || this.parentDisabled;
    }
    setDisabled(disabled) {
        this.disabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    }
    onClick() {
        if (!this.disabled) {
            if (this.isMultiple) {
                this.setSelected(!this.selected);
            }
            else {
                this.selected = true;
                this.notify();
            }
        }
    }
    onMouseDown(e) {
        this.addWave(e);
        return true;
    }
    /**
     * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
     */
    addWave(e, autoEnd) {
        const target = this.element;
        if (target.classList.contains('ripple')) {
            if (target.ripple === null || target.ripple === undefined) {
                target.ripple = new PaperRipple();
                target.appendChild(target.ripple.$);
            }
            target.ripple.downAction(e);
            if (autoEnd) {
                setTimeout(removeWave, 125, target);
            }
            else {
                new ElementEvents(PLATFORM.global).subscribeOnce('mouseup', () => {
                    target.ripple.upAction();
                }, true);
            }
        }
    }
};
__decorate([
    bindable()
], UxOption.prototype, "text", void 0);
__decorate([
    bindable()
], UxOption.prototype, "value", void 0);
UxOption = __decorate([
    inject(DOM.Element, BindingEngine),
    customElement('ux-option'),
    processAttributes(convertTextToAttr),
    inlineView(UX_OPTION_VIEW)
], UxOption);
export { UxOption };
function removeWave(el) {
    el.ripple.upAction();
}
function convertTextToAttr(_, __, node, attributes) {
    const ii = attributes.length;
    for (let i = 0; ii > i; ++i) {
        const attr = attributes[i];
        if (attr.nodeName === 'text') {
            return;
        }
        const parts = attr.nodeName.split('.');
        if (parts[0] === 'text') {
            return;
        }
    }
    node.setAttribute('text', node.textContent || '');
    node.textContent = '';
}
const UxOptionElementProto = Object.create(HTMLElement.prototype, {
    disabled: {
        get() {
            return getAuViewModel(this).getDisabled();
        },
        set(disabled) {
            getAuViewModel(this).setDisabled(disabled);
        }
    },
    focused: {
        get() {
            return getAuViewModel(this).getFocused();
        },
        set(focused) {
            getAuViewModel(this).setFocused(focused);
        }
    },
    selected: {
        get() {
            return getAuViewModel(this).getSelected();
        },
        set(selected) {
            getAuViewModel(this).setSelected(selected);
        }
    },
    value: {
        get() {
            return getAuViewModel(this).value;
        },
        set(value) {
            getAuViewModel(this).value = value;
        }
    },
    wave: {
        value() {
            getAuViewModel(this).addWave(null, true);
        }
    }
});
