import { __decorate } from 'tslib';
import { customElement, bindable, computedFrom, DOM, processContent, ElementEvents, inject, PLATFORM, ObserverLocator, TaskQueue, inlineView, BindingEngine, processAttributes, bindingMode } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { StyleEngine, PaperRipple, swatches, AureliaUX } from '@aurelia-ux/core';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';

function getAuViewModel(el) {
    return el.au.controller.viewModel;
}
function bool(v) {
    return !!(v || v === '');
}

var UX_SELECT_VIEW = "<template class=\"ux-select ${multiple ? 'multiple' : ''}\" tabindex=-1 disabled.bind=\"disabled & booleanAttr\" aria-multiselectable.bind=multiple aria-disabled.bind=isDisabled keydown.trigger=onKeyDown($event.which) blur.trigger=\"onBlur() & debounce:1\"> <div class=ux-select-container ref=container click.trigger=onTriggerClick()> <div class=ux-select-trigger> <div class=ux-select-value>${displayValue}</div> <div class=ux-select-arrow></div> </div> </div> <div ref=optionWrapperEl class=ux-select-list-wrapper css=\"top: ${listAnchor.y}px; left: ${listAnchor.x}px;\"> <div ref=optionCtEl class=ux-select-list-ct select.trigger=onSelect($event) css=\"\r\n        max-width: ${theme.listMaxWidth}px;\r\n        max-height: ${theme.listMaxHeight}\"><slot></slot></div> </div> </template> ";

const UP = 38;
// const RIGHT = 39;
const DOWN = 40;
// const LEFT = 37;
// const ESC = 27;
const ENTER = 13;
const SPACE = 32;
const logger = getLogger('ux-select');
const invalidMultipleValueMsg = 'Only null or Array instances can be bound to a multi-select';
const selectArrayContext = 'context:ux-select';
let UxSelect = class UxSelect {
    constructor(element, styleEngine, observerLocator, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.observerLocator = observerLocator;
        this.taskQueue = taskQueue;
        this.selectedOption = null;
        this.ignoreSelectEvent = true;
        // Only chrome persist the element prototype when cloning with clone node
        Object.setPrototypeOf(element, UxSelectElementProto);
    }
    bind() {
        if (bool(this.autofocus)) ;
        if (this.isMultiple) {
            if (!this.value) {
                this.value = [];
            }
            else if (!Array.isArray(this.value)) {
                throw new Error(invalidMultipleValueMsg);
            }
        }
        if (!this.winEvents) {
            this.winEvents = new ElementEvents(window);
        }
        // Initially Synchronize options with value of this element
        this.taskQueue.queueMicroTask(this);
    }
    unbind() {
        this.winEvents.disposeAll();
        if (this.arrayObserver) {
            this.arrayObserver.unsubscribe(selectArrayContext, this);
            this.arrayObserver = null;
        }
        this.selectedOption = null;
    }
    resolveDisplayValue() {
        const value = this.value;
        this.displayValue = Array.isArray(value) ? value.slice().sort().join(', ') : value;
    }
    synchronizeOptions() {
        const value = this.value;
        const isArray = Array.isArray(value);
        const options = this.options;
        const matcher = this.element.matcher || defaultMatcher;
        let i = options.length;
        this.ignoreSelectEvent = true;
        while (i--) {
            const option = options[i];
            const optionValue = option.value;
            if (isArray) {
                option.selected = value.findIndex((item) => !!matcher(optionValue, item)) !== -1;
                continue;
            }
            option.selected = !!matcher(optionValue, value);
        }
        this.ignoreSelectEvent = false;
    }
    synchronizeValue() {
        const options = this.options;
        const ii = options.length;
        let count = 0;
        let optionValues = [];
        // extract value from ux-option
        for (let i = 0; i < ii; i++) {
            const option = options[i];
            if (!option.selected) {
                continue;
            }
            optionValues.push(option.value);
            count++;
        }
        if (this.isMultiple) {
            // multi-select
            if (Array.isArray(this.value)) {
                const selectValues = this.value;
                const matcher = this.element.matcher || defaultMatcher;
                // remove items that are no longer selected.
                let i = 0;
                while (i < selectValues.length) {
                    const a = selectValues[i];
                    if (optionValues.findIndex(b => matcher(a, b)) === -1) {
                        selectValues.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
                // add items that have been selected.
                i = 0;
                while (i < optionValues.length) {
                    const a = optionValues[i];
                    if (selectValues.findIndex(b => matcher(a, b)) === -1) {
                        selectValues.push(a);
                    }
                    i++;
                }
                this.resolveDisplayValue();
                return; // don't notify.
            }
        }
        else {
            // single-select
            // tslint:disable-next-line:prefer-conditional-expression
            if (count === 0) {
                optionValues = null;
            }
            else {
                optionValues = optionValues[0];
            }
            this.setValue(optionValues);
        }
    }
    setupListAnchor() {
        this.calcAnchorPosition();
        this.winEvents.subscribe('wheel', (e) => {
            if (this.expanded) {
                if (e.target === PLATFORM.global || !this.optionWrapperEl.contains(e.target)) {
                    this.collapse();
                }
            }
        }, true);
    }
    unsetupListAnchor() {
        this.listAnchor = null;
        this.winEvents.disposeAll();
    }
    calcAnchorPosition() {
        const elDim = this.container.getBoundingClientRect();
        const offsetY = (48 - elDim.height) / 2;
        this.listAnchor = { x: elDim.left, y: elDim.top - offsetY };
    }
    onKeyboardSelect() {
        if (!this.expanded) {
            return;
        }
        const focusedOption = this.focusedUxOption;
        if (this.isMultiple) {
            if (!focusedOption) {
                return;
            }
            focusedOption.selected = !focusedOption.selected;
        }
        else {
            this.collapse();
        }
    }
    call() {
        this.synchronizeOptions();
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        if (newValue !== null && newValue !== undefined && this.isMultiple && !Array.isArray(newValue)) {
            throw new Error('Only null, undenfined or Array instances can be bound to a multi-select.');
        }
        if (this.value === newValue) {
            return;
        }
        // unsubscribe from old array.
        if (this.arrayObserver) {
            this.arrayObserver.unsubscribe(selectArrayContext, this);
            this.arrayObserver = null;
        }
        if (this.isMultiple) {
            // subscribe to new array.
            if (Array.isArray(newValue)) {
                this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
                this.arrayObserver.subscribe(selectArrayContext, this);
            }
        }
        if (newValue !== this.value) {
            this.value = newValue;
            this.resolveDisplayValue();
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    }
    expand() {
        if (this.expanded) {
            return;
        }
        if (this.isExpanding) {
            return;
        }
        this.isExpanding = true;
        this.optionWrapperEl.classList.add('open');
        setTimeout(() => {
            this.optionCtEl.classList.add('open');
            this.isExpanding = false;
            this.expanded = true;
            this.setFocusedOption(this.selectedOption);
        }, this.theme.listTransition);
        this.setupListAnchor();
    }
    collapse() {
        if (this.isCollapsing) {
            return;
        }
        this.isCollapsing = true;
        this.optionCtEl.classList.remove('open');
        setTimeout(() => {
            this.optionWrapperEl.classList.remove('open');
            this.isCollapsing = false;
            this.expanded = false;
            this.setFocusedOption(null);
            this.unsetupListAnchor();
        }, this.theme.listTransition);
    }
    setFocusedOption(focusedOption) {
        const oldFocusedOption = this.focusedUxOption;
        if (focusedOption !== oldFocusedOption) {
            if (oldFocusedOption) {
                oldFocusedOption.focused = false;
            }
            if (focusedOption) {
                focusedOption.focused = true;
                focusedOption.wave();
                focusedOption.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
            this.focusedUxOption = focusedOption;
        }
    }
    moveSelectedIndex(offset) {
        let currentIndex = 0;
        const options = this.options;
        if (this.focusedUxOption) {
            currentIndex = options.indexOf(this.focusedUxOption);
        }
        else if (this.selectedOption) {
            currentIndex = options.indexOf(this.selectedOption);
        }
        let nextIndex = currentIndex + offset;
        if (nextIndex > options.length - 1) {
            nextIndex = options.length - 1;
        }
        if (nextIndex < 0) {
            nextIndex = 0;
        }
        const focusedOption = options[nextIndex];
        if (focusedOption.disabled) {
            if (offset > 0) {
                if (nextIndex === options.length - 1) {
                    return;
                }
                this.moveSelectedIndex(offset + 1);
            }
            else {
                if (nextIndex < 0) {
                    return;
                }
                this.moveSelectedIndex(offset - 1);
            }
            return;
        }
        this.setFocusedOption(focusedOption);
        focusedOption.focused = true;
        if (this.isMultiple) ;
        else {
            this.ignoreSelectEvent = true;
            if (this.selectedOption) {
                this.selectedOption.selected = false;
            }
            this.selectedOption = focusedOption;
            this.selectedOption.selected = true;
            this.ignoreSelectEvent = false;
            this.setValue(this.selectedOption.value);
        }
    }
    onTriggerClick() {
        if (!this.isDisabled) {
            if (this.expanded) {
                return;
            }
            this.expand();
        }
    }
    onBlur() {
        if (!this.element.contains(DOM.activeElement)) {
            this.collapse();
        }
    }
    onSelect(e) {
        e.stopPropagation();
        if (this.ignoreSelectEvent) {
            return;
        }
        const newSelection = e.detail;
        const lastSelection = this.selectedOption;
        if (this.isMultiple) {
            this.synchronizeValue();
        }
        else {
            this.ignoreSelectEvent = true;
            if (lastSelection) {
                lastSelection.selected = false;
            }
            this.ignoreSelectEvent = false;
            this.selectedOption = newSelection;
            this.setValue(newSelection.value);
            if (this.expanded) {
                this.collapse();
            }
        }
    }
    onKeyDown(key) {
        if (this.isDisabled) {
            return;
        }
        // tslint:disable-next-line:switch-default
        switch (key) {
            case UP:
            case DOWN:
                this.moveSelectedIndex(key === UP ? -1 : 1);
                break;
            case ENTER:
            case SPACE:
                this.onKeyboardSelect();
                break;
        }
        return true;
    }
    themeChanged(newValue) {
        if (newValue && !newValue.themeKey) {
            newValue.themeKey = 'ux-select';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    multipleChanged(newValue, oldValue) {
        newValue = bool(newValue);
        oldValue = bool(oldValue);
        const hasChanged = newValue !== oldValue;
        if (hasChanged) {
            this.ignoreSelectEvent = true;
            for (const opt of this.options) {
                opt.selected = false;
            }
            this.ignoreSelectEvent = false;
            this.selectedOption = null;
            this.setValue(newValue
                ? [] // Changing from single to multiple = reset value to empty array
                : null // Changing from multiple to single = reset value to null
            );
        }
    }
    get options() {
        if (!this.optionCtEl) {
            return [];
        }
        const result = [];
        const children = this.optionCtEl.children;
        const ii = children.length;
        for (let i = 0; ii > i; ++i) {
            const element = children[i];
            if (element.nodeName === 'UX-OPTION') {
                result.push(element);
            }
            else if (element.nodeName === 'UX-OPTGROUP') {
                const groupOptions = element.options;
                const jj = groupOptions.length;
                for (let j = 0; jj > j; ++j) {
                    result.push(groupOptions[j]);
                }
            }
        }
        return result;
    }
    getOptions() {
        return this.options;
    }
    get isMultiple() {
        return bool(this.multiple);
    }
    get isDisabled() {
        return bool(this.disabled);
    }
};
__decorate([
    bindable()
], UxSelect.prototype, "theme", void 0);
__decorate([
    bindable()
], UxSelect.prototype, "autofocus", void 0);
__decorate([
    bindable({ defaultValue: false })
], UxSelect.prototype, "disabled", void 0);
__decorate([
    bindable({ defaultValue: false })
], UxSelect.prototype, "multiple", void 0);
__decorate([
    bindable()
], UxSelect.prototype, "placeholder", void 0);
__decorate([
    computedFrom('multiple')
], UxSelect.prototype, "isMultiple", null);
__decorate([
    computedFrom('disabled')
], UxSelect.prototype, "isDisabled", null);
UxSelect = __decorate([
    inject(Element, StyleEngine, ObserverLocator, TaskQueue),
    processContent(extractUxOption),
    customElement('ux-select'),
    inlineView(UX_SELECT_VIEW)
], UxSelect);
function extractUxOption(_, __, node) {
    if (node.hasAttribute('containerless')) {
        logger.warn('cannot use containerless on <ux-select/>. Consider using as-element instead.');
        node.removeAttribute('containerless');
    }
    let currentChild = node.firstChild;
    while (currentChild) {
        const nextSibling = currentChild.nextSibling;
        if (currentChild.nodeName === 'UX-OPTION' || currentChild.nodeName === 'UX-OPTGROUP') {
            currentChild = nextSibling;
            continue;
        }
        node.removeChild(currentChild);
        currentChild = nextSibling;
    }
    return true;
}
const UxSelectElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get() {
            return getAuViewModel(this).getValue();
        },
        set(v) {
            return getAuViewModel(this).setValue(v);
        }
    },
    options: {
        get() {
            return getAuViewModel(this).getOptions();
        }
    }
});
function defaultMatcher(a, b) {
    return a === b;
}

var UX_OPTGROUP_VIEW = "<template class=ux-optgroup class.bind=\"isDisabled ? 'disabled' : ''\" disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <div class=ux-optgroup-label textcontent.bind=label></div> <div class=ux-optgroup-options-ct ref=optionsCt><slot></slot></div> </template> ";

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

var UX_OPTION_VIEW = "<template class=\"ux-option ripple ${selected ? 'selected' : ''} ${focused ? 'focused' : ''} ${isDisabled ? 'disabled' : ''}\" click.trigger=onClick() mousedown.delegate=onMouseDown($event) disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <svg xml:space=preserve if.bind=isMultiple class=ux-checkbox viewBox=\"0 0 24 24\"> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" show.bind=selected /> </svg> <div class=ux-option-text ref=textEl textcontent.bind=text></div> </template> ";

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

var css = ".ux-select{display:inline-block;min-width:50px;max-width:100%;color:var(--ux-theme--select-foreground);box-sizing:border-box;outline:0}.ux-select *{box-sizing:border-box}.ux-select .ux-select-container{display:block;padding:8px 0 7px;border-bottom:1px solid #d3d3d3;outline:0;cursor:pointer}.ux-select:focus .ux-select-container,.ux-select-container:focus{border-bottom-color:red}.ux-select .ux-select-trigger{display:block;width:100%;height:18px;line-height:18px}.ux-select .ux-select-value{float:left;width:calc(100% - 18px);height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ux-select .ux-select-arrow{float:left;width:18px;height:18px;text-align:center}.ux-select .ux-select-arrow:before{content:'';display:inline-block;margin-top:6px;border-top:5px solid #d3d3d3;border-left:5px solid transparent;border-right:5px solid transparent}.ux-select .ux-select-list-wrapper{position:fixed;display:none;min-width:180px;z-index:9999;user-select:none}.ux-select .ux-select-list-wrapper.open{display:block}.ux-select .ux-select-list-ct{max-height:400px;overflow-y:auto;background-color:transparent;opacity:0;transform:scale(.7,.7);transition:.125s cubic-bezier(.25,.8,.25,1)}.ux-select .ux-select-list-ct.open{opacity:1;background-color:#f2f2f2;transform:scale(1,1);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.ux-optgroup{display:block}.ux-optgroup .ux-optgroup-label{height:48px;line-height:48px;padding-left:16px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}.ux-optgroup.disabled{color:silver;pointer-events:none!important}.ux-option{position:relative;display:flex;flex-direction:row;align-items:center;max-width:100%;height:48px;padding:0 16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box;text-align:left;cursor:pointer}.ux-option:hover{background-color:var(--ux-theme--select-option-hover)}.ux-option.focused{background-color:var(--ux-theme--select-option-focused)}.ux-option.selected{background-color:var(--ux-theme--select-option-selected)}.ux-option.disabled{color:silver;pointer-events:none}.ux-option .ux-checkbox{width:20px;height:20px;flex-basis:20px;flex-shrink:0;margin-right:8px;border:2px solid rgba(0,0,0,.5)}.ux-option .ux-option-text{display:inline-block;flex-grow:1;align-self:stretch;line-height:48px;overflow:hidden;text-overflow:ellipsis}.ux-select:not(.multiple) .ux-optgroup .ux-option{padding-left:32px}.ux-select.multiple .ux-option.selected{background-color:transparent;color:#00f}";

class UxSelectTheme {
    constructor() {
        this.themeKey = 'select';
        this.foreground = swatches.grey.p500;
        this.background = 'transparent';
        this.triggerBorder = `1px solid ${swatches.grey.p500}`;
        this.triggerBorderDisabled = `1px solid ${swatches.grey.p400}`;
        this.triggerBorderFocused = `1px solid ${swatches.grey.p600}`;
        this.listMaxWidth = 250;
        this.listMaxWidthPx = '250px';
        this.listMaxHeight = 400;
        this.listMaxHeightPx = '400px';
        this.listBackground = swatches.white;
        this.listTransition = 125;
        this.listTransitionS = '0.125s';
        this.optionHover = swatches.grey.p300;
        this.optionFocused = swatches.grey.p300;
        this.optionSelected = swatches.grey.p400;
        this.borderBottom = `1px solid ${swatches.grey.p500}`;
        this.borderBottomHover = '1px solid var(--ux-design--accent)';
        this.borderBottomSelected = '';
        this.listboxShadow = 'rgba(0, 0, 0, 0.12)';
        this.error = swatches.red.p500;
    }
}

function configure(config) {
    DOM.injectStyles(css, undefined, undefined, 'ux-select-css');
    config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        UxSelect,
        UxOptGroup,
        UxOption,
    ]);
}
const uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};

export { configure, UxOption, UxOptGroup, UxSelect, UxSelectTheme };
