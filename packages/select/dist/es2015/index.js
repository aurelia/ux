import { ElementEvents, PLATFORM, DOM, bindable, computedFrom, inject, ObserverLocator, TaskQueue, processContent, customElement, inlineView, BindingEngine, processAttributes, bindingMode } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { StyleEngine, PaperRipple, AureliaUX } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function getAuViewModel(el) {
    return el.au.controller.viewModel;
}
function bool(v) {
    return !!(v || v === '');
}

var uxSelect = "<template class=\"ux-select ${multiple ? 'ux-select--multiple' : ''}\" tabindex=\"0\" disabled.bind=\"disabled & booleanAttr\" aria-multiselectable.bind=\"multiple\" aria-disabled.bind=\"isDisabled\" keydown.trigger=\"onKeyDown($event)\" blur.trigger=\"onBlur() & debounce:1\" click.trigger=\"onTriggerClick()\"> <require from=\"@aurelia-ux/core/effects/paper-ripple.css\"></require> <require from=\"@aurelia-ux/select/ux-select.css\"></require> <div class=\"ux-select__placeholder\">${placeholder}</div> <div class=\"ux-select__value\">${displayValue}</div> <div class=\"ux-select__arrow\"></div> <div class=\"ux-select__border-bottom\"></div> <div ref=\"optionWrapperEl\" class=\"ux-select__list-wrapper\" css=\"top: ${listAnchor.y}px; left: ${listAnchor.x}px;\"> <div ref=\"optionCtEl\" class=\"ux-select__list-container\" select.trigger=\"onSelect($event)\" css=\"\n        max-width: ${theme.listMaxWidth}px;\n        max-height: ${theme.listMaxHeight}\"><slot></slot></div> </div> </template> ";

var UX_SELECT_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxSelect
});

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
    customElement('ux-select'),
    inlineView(UX_SELECT_VIEW)
], UxSelect);
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

var uxOptgroup = "<template class=\"ux-optgroup\" class.bind=\"isDisabled ? 'ux-optgroup--disabled' : ''\" disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <div class=\"ux-optgroup-label\" textcontent.bind=\"label\"></div> <div class=\"ux-optgroup-options-ct\" ref=\"optionsCt\"><slot></slot></div> </template> ";

var UX_OPTGROUP_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxOptgroup
});

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

var uxOption = "<template class=\"ux-option ripple ${selected ? 'ux-option--selected' : ''} ${focused ? 'ux-option--focused' : ''} ${isDisabled ? 'ux-option--disabled' : ''}\" click.trigger=\"onClick()\" mousedown.delegate=\"onMouseDown($event)\" disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <svg xml:space=\"preserve\" if.bind=\"isMultiple\" class=\"ux-checkbox\" viewBox=\"0 0 24 24\"> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" show.bind=\"selected\"/> </svg> <div class=\"ux-option__text\" ref=\"textEl\" textcontent.bind=\"text\"></div> </template> ";

var UX_OPTION_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxOption
});

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

class UxSelectTheme {
    constructor() {
        this.themeKey = 'select';
    }
}

/// <reference path="html.d.ts" />
function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        UxSelect,
        UxOptGroup,
        UxOption
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

export { UxOptGroup, UxOption, UxSelect, UxSelectTheme, configure };
//# sourceMappingURL=index.js.map
