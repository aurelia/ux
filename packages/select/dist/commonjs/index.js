'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaFramework = require('aurelia-framework');
var aureliaBinding = require('aurelia-binding');
var core = require('@aurelia-ux/core');
var aureliaLogging = require('aurelia-logging');

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

var UP = 38;
// const RIGHT = 39;
var DOWN = 40;
// const LEFT = 37;
// const ESC = 27;
var ENTER = 13;
var SPACE = 32;
var logger = aureliaLogging.getLogger('ux-select');
var invalidMultipleValueMsg = 'Only null or Array instances can be bound to a multi-select';
var selectArrayContext = 'context:ux-select';
var UxSelect = /** @class */ (function () {
    function UxSelect(element, styleEngine, observerLocator, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.observerLocator = observerLocator;
        this.taskQueue = taskQueue;
        this.selectedOption = null;
        this.ignoreSelectEvent = true;
        // Only chrome persist the element prototype when cloning with clone node
        Object.setPrototypeOf(element, UxSelectElementProto);
    }
    UxSelect.prototype.bind = function () {
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
            this.winEvents = new aureliaFramework.ElementEvents(window);
        }
        // Initially Synchronize options with value of this element
        this.taskQueue.queueMicroTask(this);
    };
    UxSelect.prototype.attached = function () {
        this.resolveDisplayValue();
    };
    UxSelect.prototype.unbind = function () {
        this.winEvents.disposeAll();
        if (this.arrayObserver) {
            this.arrayObserver.unsubscribe(selectArrayContext, this);
            this.arrayObserver = null;
        }
        this.selectedOption = null;
    };
    UxSelect.prototype.resolveDisplayValue = function () {
        var _this = this;
        var values = this.options
            .filter(function (option) {
            return Array.isArray(_this.value) ?
                _this.value.some(function (value) { return value === option.value; }) :
                option.value === _this.value;
        })
            .map(function (t) { return t.innerText; });
        this.displayValue = values.join(', ');
        if (this.displayValue.length > 0) {
            this.element.classList.add('ux-select--has-value');
        }
        else {
            this.element.classList.remove('ux-select--has-value');
        }
    };
    UxSelect.prototype.synchronizeOptions = function () {
        var value = this.value;
        var isArray = Array.isArray(value);
        var options = this.options;
        var matcher = this.element.matcher || defaultMatcher;
        var i = options.length;
        this.ignoreSelectEvent = true;
        var _loop_1 = function () {
            var option = options[i];
            var optionValue = option.value;
            if (isArray) {
                option.selected = value.findIndex(function (item) { return !!matcher(optionValue, item); }) !== -1;
                return "continue";
            }
            option.selected = !!matcher(optionValue, value);
        };
        while (i--) {
            _loop_1();
        }
        this.ignoreSelectEvent = false;
    };
    UxSelect.prototype.synchronizeValue = function () {
        var options = this.options;
        var ii = options.length;
        var count = 0;
        var optionValues = [];
        // extract value from ux-option
        for (var i = 0; i < ii; i++) {
            var option = options[i];
            if (!option.selected) {
                continue;
            }
            optionValues.push(option.value);
            count++;
        }
        if (this.isMultiple) {
            // multi-select
            if (Array.isArray(this.value)) {
                var selectValues = this.value;
                var matcher_1 = this.element.matcher || defaultMatcher;
                // remove items that are no longer selected.
                var i = 0;
                var _loop_2 = function () {
                    var a = selectValues[i];
                    if (optionValues.findIndex(function (b) { return matcher_1(a, b); }) === -1) {
                        selectValues.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                };
                while (i < selectValues.length) {
                    _loop_2();
                }
                // add items that have been selected.
                i = 0;
                var _loop_3 = function () {
                    var a = optionValues[i];
                    if (selectValues.findIndex(function (b) { return matcher_1(a, b); }) === -1) {
                        selectValues.push(a);
                    }
                    i++;
                };
                while (i < optionValues.length) {
                    _loop_3();
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
    };
    UxSelect.prototype.setupListAnchor = function () {
        var _this = this;
        this.calcAnchorPosition();
        this.winEvents.subscribe('wheel', function (e) {
            if (_this.expanded) {
                if (e.target === aureliaFramework.PLATFORM.global || !_this.optionWrapperEl.contains(e.target)) {
                    _this.collapse();
                }
            }
        }, true);
    };
    UxSelect.prototype.unsetupListAnchor = function () {
        this.listAnchor = null;
        this.winEvents.disposeAll();
    };
    UxSelect.prototype.calcAnchorPosition = function () {
        var elDim = this.element.getBoundingClientRect();
        var offsetY = (48 - elDim.height) / 2;
        this.listAnchor = { x: elDim.left, y: elDim.top - offsetY };
    };
    UxSelect.prototype.onKeyboardSelect = function () {
        if (!this.expanded) {
            return;
        }
        var focusedOption = this.focusedUxOption;
        if (this.isMultiple) {
            if (!focusedOption) {
                return;
            }
            focusedOption.selected = !focusedOption.selected;
        }
        else {
            this.collapse();
        }
    };
    UxSelect.prototype.call = function () {
        this.synchronizeOptions();
    };
    UxSelect.prototype.getValue = function () {
        return this.value;
    };
    UxSelect.prototype.setValue = function (newValue) {
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
            this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxSelect.prototype.expand = function () {
        var _this = this;
        if (this.expanded) {
            return;
        }
        if (this.isExpanding) {
            return;
        }
        this.isExpanding = true;
        this.optionWrapperEl.classList.add('ux-select__list-wrapper--open');
        setTimeout(function () {
            _this.optionCtEl.classList.add('ux-select__list-container--open');
            _this.isExpanding = false;
            _this.expanded = true;
            _this.setFocusedOption(_this.selectedOption);
        }, 0);
        this.setupListAnchor();
    };
    UxSelect.prototype.collapse = function () {
        var _this = this;
        if (this.isCollapsing) {
            return;
        }
        this.isCollapsing = true;
        this.optionCtEl.classList.remove('ux-select__list-container--open');
        setTimeout(function () {
            _this.optionWrapperEl.classList.remove('ux-select__list-wrapper--open');
            _this.isCollapsing = false;
            _this.expanded = false;
            _this.setFocusedOption(null);
            _this.unsetupListAnchor();
        }, this.theme && this.theme.listTransition || 125);
    };
    UxSelect.prototype.setFocusedOption = function (focusedOption) {
        var oldFocusedOption = this.focusedUxOption;
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
    };
    UxSelect.prototype.moveSelectedIndex = function (offset) {
        var currentIndex = 0;
        var options = this.options;
        if (this.focusedUxOption) {
            currentIndex = options.indexOf(this.focusedUxOption);
        }
        else if (this.selectedOption) {
            currentIndex = options.indexOf(this.selectedOption);
        }
        var nextIndex = currentIndex + offset;
        if (nextIndex > options.length - 1) {
            nextIndex = options.length - 1;
        }
        if (nextIndex < 0) {
            nextIndex = 0;
        }
        var focusedOption = options[nextIndex];
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
    };
    UxSelect.prototype.onTriggerClick = function () {
        if (!this.isDisabled) {
            if (this.expanded) {
                return;
            }
            this.expand();
        }
    };
    UxSelect.prototype.onBlur = function () {
        if (!this.element.contains(aureliaFramework.DOM.activeElement)) {
            this.collapse();
        }
    };
    UxSelect.prototype.onSelect = function (e) {
        e.stopPropagation();
        if (this.ignoreSelectEvent) {
            return;
        }
        var newSelection = e.detail;
        var lastSelection = this.selectedOption;
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
    };
    UxSelect.prototype.onKeyDown = function (event) {
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
    };
    UxSelect.prototype.themeChanged = function (newValue) {
        if (newValue && !newValue.themeKey) {
            newValue.themeKey = 'ux-select';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxSelect.prototype.multipleChanged = function (newValue, oldValue) {
        newValue = bool(newValue);
        oldValue = bool(oldValue);
        var hasChanged = newValue !== oldValue;
        if (hasChanged) {
            this.ignoreSelectEvent = true;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                opt.selected = false;
            }
            this.ignoreSelectEvent = false;
            this.selectedOption = null;
            this.setValue(newValue
                ? [] // Changing from single to multiple = reset value to empty array
                : null // Changing from multiple to single = reset value to null
            );
        }
    };
    Object.defineProperty(UxSelect.prototype, "options", {
        get: function () {
            if (!this.optionCtEl) {
                return [];
            }
            var result = [];
            var children = this.optionCtEl.children;
            var ii = children.length;
            for (var i = 0; ii > i; ++i) {
                var element = children[i];
                if (element.nodeName === 'UX-OPTION') {
                    result.push(element);
                }
                else if (element.nodeName === 'UX-OPTGROUP') {
                    var groupOptions = element.options;
                    var jj = groupOptions.length;
                    for (var j = 0; jj > j; ++j) {
                        result.push(groupOptions[j]);
                    }
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    UxSelect.prototype.getOptions = function () {
        return this.options;
    };
    Object.defineProperty(UxSelect.prototype, "isMultiple", {
        get: function () {
            return bool(this.multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UxSelect.prototype, "isDisabled", {
        get: function () {
            return bool(this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        aureliaFramework.bindable()
    ], UxSelect.prototype, "theme", void 0);
    __decorate([
        aureliaFramework.bindable()
    ], UxSelect.prototype, "autofocus", void 0);
    __decorate([
        aureliaFramework.bindable({ defaultValue: false })
    ], UxSelect.prototype, "disabled", void 0);
    __decorate([
        aureliaFramework.bindable({ defaultValue: false })
    ], UxSelect.prototype, "multiple", void 0);
    __decorate([
        aureliaFramework.bindable()
    ], UxSelect.prototype, "placeholder", void 0);
    __decorate([
        aureliaFramework.computedFrom('multiple')
    ], UxSelect.prototype, "isMultiple", null);
    __decorate([
        aureliaFramework.computedFrom('disabled')
    ], UxSelect.prototype, "isDisabled", null);
    UxSelect = __decorate([
        aureliaFramework.inject(Element, core.StyleEngine, aureliaFramework.ObserverLocator, aureliaFramework.TaskQueue),
        aureliaFramework.processContent(extractUxOption),
        aureliaFramework.customElement('ux-select'),
        aureliaFramework.inlineView(UX_SELECT_VIEW)
    ], UxSelect);
    return UxSelect;
}());
function extractUxOption(_, __, node) {
    if (node.hasAttribute('containerless')) {
        logger.warn('Cannot use containerless on <ux-select/>. Consider using as-element instead.');
        node.removeAttribute('containerless');
    }
    var currentChild = node.firstChild;
    while (currentChild) {
        var nextSibling = currentChild.nextSibling;
        if (currentChild.nodeName === 'UX-OPTION' || currentChild.nodeName === 'UX-OPTGROUP') {
            currentChild = nextSibling;
            continue;
        }
        node.removeChild(currentChild);
        currentChild = nextSibling;
    }
    return true;
}
var UxSelectElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get: function () {
            return getAuViewModel(this).getValue();
        },
        set: function (v) {
            return getAuViewModel(this).setValue(v);
        }
    },
    options: {
        get: function () {
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

var UxOptGroup = /** @class */ (function () {
    function UxOptGroup(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        Object.setPrototypeOf(element, UxOptGroupElementProto);
    }
    UxOptGroup.prototype.created = function () {
        var element = this.element;
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
    };
    UxOptGroup.prototype.bind = function () {
        var uxSelect = this.uxSelect = this.getUxSelect();
        this.setParentDisabled(uxSelect.isDisabled);
    };
    UxOptGroup.prototype.attached = function () {
        var be = this.bindingEngine;
        var uxSelect = this.uxSelect;
        this.subscriptions = [
            be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        ];
    };
    UxOptGroup.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var s = _a[_i];
            s.dispose();
        }
        this.subscriptions.length = 0;
    };
    UxOptGroup.prototype.getUxSelect = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option group has no "ux-select" parent');
    };
    UxOptGroup.prototype.setParentDisabled = function (disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOptGroup.prototype.getOptions = function () {
        if (!this.optionsCt) {
            return [];
        }
        return Array.from(this.optionsCt.children);
    };
    UxOptGroup.prototype.getDisabled = function () {
        return this.disabled;
    };
    UxOptGroup.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
        this.isDisabled = disabled || this.parentDisabled;
    };
    __decorate([
        aureliaFramework.bindable()
    ], UxOptGroup.prototype, "label", void 0);
    UxOptGroup = __decorate([
        aureliaFramework.inject(aureliaFramework.DOM.Element, aureliaFramework.BindingEngine),
        aureliaFramework.processContent(extractUxOptions),
        aureliaFramework.customElement('ux-optgroup'),
        aureliaFramework.inlineView(UX_OPTGROUP_VIEW)
    ], UxOptGroup);
    return UxOptGroup;
}());
function extractUxOptions(_, __, node) {
    var currentChild = node.firstChild;
    while (currentChild) {
        var nextSibling = currentChild.nextSibling;
        if (currentChild.nodeName !== 'UX-OPTION') {
            node.removeChild(currentChild);
        }
        currentChild = nextSibling;
    }
    return true;
}
var UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
    options: {
        get: function () {
            return getAuViewModel(this).getOptions();
        }
    },
    disabled: {
        get: function () {
            return getAuViewModel(this).getDisabled();
        },
        set: function (disabled) {
            return getAuViewModel(this).setDisabled(disabled);
        }
    }
});

var uxOption = "<template class=\"ux-option ripple ${selected ? 'ux-option--selected' : ''} ${focused ? 'ux-option--focused' : ''} ${isDisabled ? 'ux-option--disabled' : ''}\" click.trigger=\"onClick()\" mousedown.delegate=\"onMouseDown($event)\" disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <svg xml:space=\"preserve\" if.bind=\"isMultiple\" class=\"ux-checkbox\" viewBox=\"0 0 24 24\"> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" show.bind=\"selected\"/> </svg> <div class=\"ux-option__text\" ref=\"textEl\" textcontent.bind=\"text\"></div> </template> ";

var UX_OPTION_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxOption
});

var UxOption = /** @class */ (function () {
    function UxOption(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.selected = false;
        this.focused = false;
        Object.setPrototypeOf(element, UxOptionElementProto);
    }
    UxOption.prototype.created = function () {
        var element = this.element;
        if (element.hasAttribute('value')) {
            this.value = element.getAttribute('value');
        }
        this.setDisabled(element.hasAttribute('disabled'));
        element.removeAttribute('disabled');
        element.removeAttribute('text');
    };
    UxOption.prototype.bind = function () {
        if (this.value === undefined) {
            this.value = this.text;
        }
    };
    UxOption.prototype.attached = function () {
        var optGroup = this.optGroup = this.getOptGroup();
        var uxSelect = this.uxSelect = this.getUxSelect();
        var bindingEngine = this.bindingEngine;
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
    };
    UxOption.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var s = _a[_i];
            s.dispose();
        }
        this.subscriptions.length = 0;
    };
    UxOption.prototype.getOptGroup = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-OPTGROUP') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        return null;
    };
    UxOption.prototype.getUxSelect = function () {
        var el = this.element;
        while (el) {
            if (el.tagName === 'UX-SELECT') {
                return getAuViewModel(el);
            }
            el = el.parentElement;
        }
        throw new Error('Ux option has no "ux-select" parent');
    };
    UxOption.prototype.uxMultipleChanged = function (useSelect) {
        this.isMultiple = useSelect;
    };
    UxOption.prototype.setParentDisabled = function (disabled) {
        this.parentDisabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOption.prototype.notify = function () {
        this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('select', { bubbles: true, detail: this.element }));
    };
    UxOption.prototype.getFocused = function () {
        return this.focused;
    };
    UxOption.prototype.setFocused = function (focused) {
        this.focused = !!focused;
    };
    UxOption.prototype.getSelected = function () {
        return this.selected;
    };
    UxOption.prototype.setSelected = function (selected) {
        var oldValue = this.selected;
        var newValue = !!selected;
        if (newValue !== oldValue) {
            this.selected = newValue;
            this.notify();
        }
    };
    UxOption.prototype.getDisabled = function () {
        return this.disabled || this.parentDisabled;
    };
    UxOption.prototype.setDisabled = function (disabled) {
        this.disabled = !!disabled;
        this.isDisabled = this.disabled || this.parentDisabled;
    };
    UxOption.prototype.onClick = function () {
        if (!this.disabled) {
            if (this.isMultiple) {
                this.setSelected(!this.selected);
            }
            else {
                this.selected = true;
                this.notify();
            }
        }
    };
    UxOption.prototype.onMouseDown = function (e) {
        this.addWave(e);
        return true;
    };
    /**
     * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
     */
    UxOption.prototype.addWave = function (e, autoEnd) {
        var target = this.element;
        if (target.classList.contains('ripple')) {
            if (target.ripple === null || target.ripple === undefined) {
                target.ripple = new core.PaperRipple();
                target.appendChild(target.ripple.$);
            }
            target.ripple.downAction(e);
            if (autoEnd) {
                setTimeout(removeWave, 125, target);
            }
            else {
                new aureliaFramework.ElementEvents(aureliaFramework.PLATFORM.global).subscribeOnce('mouseup', function () {
                    target.ripple.upAction();
                }, true);
            }
        }
    };
    __decorate([
        aureliaFramework.bindable()
    ], UxOption.prototype, "text", void 0);
    __decorate([
        aureliaFramework.bindable()
    ], UxOption.prototype, "value", void 0);
    UxOption = __decorate([
        aureliaFramework.inject(aureliaFramework.DOM.Element, aureliaFramework.BindingEngine),
        aureliaFramework.customElement('ux-option'),
        aureliaFramework.processAttributes(convertTextToAttr),
        aureliaFramework.inlineView(UX_OPTION_VIEW)
    ], UxOption);
    return UxOption;
}());
function removeWave(el) {
    el.ripple.upAction();
}
function convertTextToAttr(_, __, node, attributes) {
    var ii = attributes.length;
    for (var i = 0; ii > i; ++i) {
        var attr = attributes[i];
        if (attr.nodeName === 'text') {
            return;
        }
        var parts = attr.nodeName.split('.');
        if (parts[0] === 'text') {
            return;
        }
    }
    node.setAttribute('text', node.textContent || '');
    node.textContent = '';
}
var UxOptionElementProto = Object.create(HTMLElement.prototype, {
    disabled: {
        get: function () {
            return getAuViewModel(this).getDisabled();
        },
        set: function (disabled) {
            getAuViewModel(this).setDisabled(disabled);
        }
    },
    focused: {
        get: function () {
            return getAuViewModel(this).getFocused();
        },
        set: function (focused) {
            getAuViewModel(this).setFocused(focused);
        }
    },
    selected: {
        get: function () {
            return getAuViewModel(this).getSelected();
        },
        set: function (selected) {
            getAuViewModel(this).setSelected(selected);
        }
    },
    value: {
        get: function () {
            return getAuViewModel(this).value;
        },
        set: function (value) {
            getAuViewModel(this).value = value;
        }
    },
    wave: {
        value: function () {
            getAuViewModel(this).addWave(null, true);
        }
    }
});

var UxSelectTheme = /** @class */ (function () {
    function UxSelectTheme() {
        this.themeKey = 'select';
    }
    return UxSelectTheme;
}());

/// <reference path="html.d.ts" />
function configure(config) {
    config.container.get(core.AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        UxSelect,
        UxOptGroup,
        UxOption
    ]);
}
var uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: aureliaFramework.bindingMode.twoWay,
            getObserver: function (element, _) {
                return new aureliaBinding.ValueAttributeObserver(element, 'value', new aureliaBinding.EventSubscriber(['change']));
            }
        }
    }
};

exports.UxOptGroup = UxOptGroup;
exports.UxOption = UxOption;
exports.UxSelect = UxSelect;
exports.UxSelectTheme = UxSelectTheme;
exports.configure = configure;
//# sourceMappingURL=index.js.map
