var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, computedFrom, DOM, processContent, ElementEvents, inject, PLATFORM, ObserverLocator, TaskQueue, } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { StyleEngine } from '@aurelia-ux/core';
import { getAuViewModel, bool } from './util';
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
let UxSelect = 
// @inlineView(UX_SELECT_VIEW)
class UxSelect {
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
        if (bool(this.autofocus)) {
            // setTimeout(focusEl, 0, this.button);
        }
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
    attached() {
        this.resolveDisplayValue();
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
        const values = this.options
            .filter(option => Array.isArray(this.value) ?
            this.value.some(value => value === option.value) :
            option.value === this.value)
            .map(t => t.innerText);
        this.displayValue = values.join(', ');
        if (this.displayValue.length > 0) {
            this.element.classList.add('ux-select--has-value');
        }
        else {
            this.element.classList.remove('ux-select--has-value');
        }
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
        const elDim = this.element.getBoundingClientRect();
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
        this.optionWrapperEl.classList.add('ux-select__list-wrapper--open');
        setTimeout(() => {
            this.optionCtEl.classList.add('ux-select__list-container--open');
            this.isExpanding = false;
            this.expanded = true;
            this.setFocusedOption(this.selectedOption);
        }, 0);
        this.setupListAnchor();
    }
    collapse() {
        if (this.isCollapsing) {
            return;
        }
        this.isCollapsing = true;
        this.optionCtEl.classList.remove('ux-select__list-container--open');
        setTimeout(() => {
            this.optionWrapperEl.classList.remove('ux-select__list-wrapper--open');
            this.isCollapsing = false;
            this.expanded = false;
            this.setFocusedOption(null);
            this.unsetupListAnchor();
        }, this.theme && this.theme.listTransition || 125);
    }
    setFocusedOption(focusedOption) {
        const oldFocusedOption = this.focusedUxOption;
        if (focusedOption !== oldFocusedOption) {
            if (oldFocusedOption) {
                oldFocusedOption.focused = false;
            }
            if (focusedOption) {
                focusedOption.focused = true;
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
        if (this.isMultiple) {
            // empty
        }
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
    onKeyDown(event) {
        if (this.isDisabled) {
            return;
        }
        // tslint:disable-next-line:switch-default
        switch (event.which) {
            case UP:
            case DOWN:
                this.moveSelectedIndex(event.which === UP ? -1 : 1);
                event.preventDefault();
                break;
            case ENTER:
            case SPACE:
                this.onKeyboardSelect();
                event.preventDefault();
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
    customElement('ux-select')
    // @inlineView(UX_SELECT_VIEW)
], UxSelect);
export { UxSelect };
function extractUxOption(_, __, node) {
    if (node.hasAttribute('containerless')) {
        logger.warn('Cannot use containerless on <ux-select/>. Consider using as-element instead.');
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
