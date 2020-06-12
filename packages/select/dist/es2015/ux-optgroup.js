import { __decorate } from "tslib";
import { customElement, bindable, processContent, DOM, inject, BindingEngine, useView, PLATFORM, } from 'aurelia-framework';
import { getAuViewModel } from './util';
let UxOptGroup = /** @class */ (() => {
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
        processContent(ensureOnlyUxOption),
        customElement('ux-optgroup'),
        useView(PLATFORM.moduleName('./ux-optgroup.html'))
    ], UxOptGroup);
    return UxOptGroup;
})();
export { UxOptGroup };
/**
 * A View-compiler hook that will remove any element that is not `<ux-option>` as child of `<ux-optgroup/>`
 */
function ensureOnlyUxOption(_, __, node) {
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
//# sourceMappingURL=ux-optgroup.js.map