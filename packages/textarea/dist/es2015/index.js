import { __decorate } from 'tslib';
import { customElement, bindable, inlineView } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, AureliaUX } from '@aurelia-ux/core';
import { observable, bindingMode, DOM as DOM$1 } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

var UX_TEXTAREA_VIEW = "<template role=textbox> <textarea ref=textbox value.bind=rawValue focus.bind=focus disabled.bind=\"disabled & booleanAttr\" readonly.bind=\"readonly & booleanAttr\" require.bind=\"required & booleanAttr\" aria-disabled.bind=\"disabled & booleanAttr\" aria-readonly.bind=\"readonly & booleanAttr\" aria-required.bind=\"required & booleanAttr\">\r\n  </textarea> </template> ";

let UxTextArea = class UxTextArea {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.autoResize = false;
        this.disabled = false;
        this.focus = false;
        this.readonly = false;
        this.value = undefined;
        Object.setPrototypeOf(element, uxTextAreaElementProto);
    }
    bind() {
        const element = this.element;
        const textbox = this.textbox;
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
        if (this.autofocus || this.autofocus === '') {
            this.focus = true;
        }
        if (element.hasAttribute('placeholder')) {
            const attributeValue = element.getAttribute('placeholder');
            if (attributeValue) {
                textbox.setAttribute('placeholder', attributeValue);
                element.removeAttribute('placeholder');
            }
        }
        if (this.cols) {
            textbox.setAttribute('cols', this.cols.toString());
            element.removeAttribute('cols');
        }
        if (this.rows) {
            textbox.setAttribute('rows', this.rows.toString());
            element.removeAttribute('rows');
        }
        if (this.minlength) {
            textbox.setAttribute('minlength', this.minlength.toString());
        }
        if (this.maxlength) {
            textbox.setAttribute('maxlength', this.maxlength.toString());
        }
    }
    attached() {
        const textbox = this.textbox;
        this.isAttached = true;
        this.textbox.addEventListener('change', stopEvent);
        this.textbox.addEventListener('input', stopEvent);
        this.fitTextContent();
        textbox.addEventListener('change', stopEvent);
        textbox.addEventListener('input', stopEvent);
    }
    detached() {
        const textbox = this.textbox;
        this.isAttached = false;
        textbox.removeEventListener('change', stopEvent);
        textbox.removeEventListener('input', stopEvent);
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        const oldValue = this.value;
        const newValue = value === null || value === undefined ? null : value.toString();
        if (oldValue !== newValue) {
            this.value = newValue;
            this.ignoreRawChanges = true;
            this.rawValue = newValue === null ? '' : newValue.toString();
            this.fitTextContent();
            this.ignoreRawChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    rawValueChanged(rawValue) {
        if (this.ignoreRawChanges) {
            return;
        }
        this.setValue(rawValue);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'textarea';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    fitTextContent() {
        if (this.isAttached && (this.autoResize || this.autoResize === '')) {
            this.textbox.style.height = 'auto';
            this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
        }
    }
    focusChanged(focus) {
        focus = focus || focus === '' ? true : false;
        this.element.dispatchEvent(DOM.createCustomEvent(focus ? 'focus' : 'blur', { bubbles: true }));
    }
};
__decorate([
    bindable
], UxTextArea.prototype, "autofocus", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "autoResize", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "cols", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "disabled", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "focus", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "maxlength", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "minlength", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "readonly", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "rows", void 0);
__decorate([
    bindable
], UxTextArea.prototype, "theme", void 0);
__decorate([
    observable({ initializer: () => '' })
], UxTextArea.prototype, "rawValue", void 0);
UxTextArea = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-textarea'),
    inlineView(UX_TEXTAREA_VIEW)
], UxTextArea);
function stopEvent(e) {
    e.stopPropagation();
}
const getVm = (_) => _.au.controller.viewModel;
const uxTextAreaElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get() {
            return getVm(this).getValue();
        },
        set(value) {
            getVm(this).setValue(value);
        }
    }
});

var css = "ux-textarea{display:block;width:100%}ux-textarea>textarea{width:100%;padding:6px 0 4px 0;margin-bottom:4px;border:0;outline:0;resize:none;padding-left:0;padding-right:0;transition:border-color 250ms ease;color:inherit;color:var(--ux-theme--textarea-foreground, inherit);background-color:transparent;background-color:var(--ux-theme--textarea-background, transparent);border-bottom:1px solid #9e9e9e;border-bottom:var(--ux-theme--textarea-border-bottom, 1px solid #9E9E9E)}ux-textarea>textarea:hover,ux-textarea>textarea:focus{border-bottom:1px solid #ff4081;border-bottom:var(--ux-theme--textarea-border-bottom-focus, 1px solid var(--ux-design--accent, #FF4081))}ux-textarea>textarea:focus{border-bottom-width:2px;padding-bottom:3px}ux-textarea>textarea[disabled],ux-textarea>textarea[disabled]:hover,ux-textarea>textarea[disabled]:focus,ux-textarea>textarea[readonly],ux-textarea>textarea[readonly]:hover,ux-textarea>textarea[readonly]:focus{color:#a4a4a4;color:var(--ux-theme--textarea-disabled-foreground, #A4A4A4);border-bottom:1px dashed #a4a4a4;border-bottom:var(--ux-theme--textarea-disabled-border-bottom, 1px dashed #A4A4A4)}ux-textarea.show-grip>ux-textarea>textarea{resize:both}ux-textarea.full-width>ux-textarea>textarea{padding:20px 8px;margin-bottom:0;font-size:16px;color:#232323;color:var(--ux-theme--textarea-full-width-foreground, #232323);border:1px solid #eee;border:var(--ux-theme--textarea-full-width-border, 1px solid #EEEEEE);background-color:#fff;background-color:var(--ux-theme--textarea-full-width-background, #FFF)}ux-textarea.full-width>ux-textarea>textarea[disabled] ux-textarea.full-width>ux-textarea>textarea[disabled]:hover,ux-textarea.full-width>ux-textarea>textarea[disabled]:focus,ux-textarea.full-width>ux-textarea>textarea[readonly],ux-textarea.full-width>ux-textarea>textarea[readonly]:hover,ux-textarea.full-width>ux-textarea>textarea[readonly]:focus{background-color:#eee;background-color:var(--ux-theme--textarea-full-width-background-disabled, #EEEEEE);border:1px dashed #e0e0e0;border:var(--ux-theme--textarea-disabled-border-bottom, 1px dashed #E0E0E0);color:#e0e0e0;color:var(--ux-theme--textarea-disabled-foreground, #E0E0E0)}ux-textarea.has-error ux-textarea>textarea{border-bottom-color:#f44336;border-bottom-color:var(--ux-theme--textarea-error, #F44336)}ux-textarea.full-width.has-error ux-textarea>textarea{border-color:#f44336;border-color:var(--ux-theme--textarea-error, #F44336)}"

class UxTextAreaTheme {
    constructor() {
        this.themeKey = 'textarea';
    }
}

function configure(config) {
    DOM$1.injectStyles(css, undefined, undefined, 'ux-textarea-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxTextAreaConfig);
    config.globalResources(UxTextArea);
}
const uxTextAreaConfig = {
    tagName: 'ux-textarea',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};

export { configure, UxTextAreaTheme, UxTextArea };
