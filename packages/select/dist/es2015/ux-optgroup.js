var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, processContent, DOM, inject, inlineView, BindingEngine, } from 'aurelia-framework';
import { getAuViewModel } from './util';
import * as UX_OPTGROUP_VIEW from './ux-optgroup.html';
let UxOptGroup = class UxOptGroup {
    constructor(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        Object.setPrototypeOf(element, UxOptGroupElementProto);
    }
    created() {
        const element = this.element;
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
    }
    bind() {
        const uxSelect = this.uxSelect = this.getUxSelect();
        this.setParentDisabled(uxSelect.isDisabled);
    }
    attached() {
        const be = this.bindingEngine;
        const uxSelect = this.uxSelect;
        this.subscriptions = [
            be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        ];
    }
    detached() {
        for (const s of this.subscriptions) {
            s.dispose();
        }
        this.subscriptions.length = 0;
    }
    getUxSelect() {
        let el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option group has no "ux-select" parent');
    }
    setParentDisabled(disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    }
    getOptions() {
        if (!this.optionsCt) {
            return [];
        }
        return Array.from(this.optionsCt.children);
    }
    getDisabled() {
        return this.disabled;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        this.isDisabled = disabled || this.parentDisabled;
    }
};
__decorate([
    bindable()
], UxOptGroup.prototype, "label", void 0);
UxOptGroup = __decorate([
    inject(DOM.Element, BindingEngine),
    processContent(extractUxOptions),
    customElement('ux-optgroup'),
    inlineView(UX_OPTGROUP_VIEW)
], UxOptGroup);
export { UxOptGroup };
function extractUxOptions(_, __, node) {
    let currentChild = node.firstChild;
    while (currentChild) {
        const nextSibling = currentChild.nextSibling;
        if (currentChild.nodeName !== 'UX-OPTION') {
            node.removeChild(currentChild);
        }
        currentChild = nextSibling;
    }
    return true;
}
const UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
    options: {
        get() {
            return getAuViewModel(this).getOptions();
        }
    },
    disabled: {
        get() {
            return getAuViewModel(this).getDisabled();
        },
        set(disabled) {
            return getAuViewModel(this).setDisabled(disabled);
        }
    }
});
