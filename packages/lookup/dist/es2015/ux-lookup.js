import { __awaiter, __decorate } from "tslib";
import { customElement, useView, bindable, inject, PLATFORM, TaskQueue, bindingMode } from 'aurelia-framework';
import { StyleEngine, normalizeNumberAttribute } from '@aurelia-ux/core';
import { DiscardablePromise } from './discardable-promise';
import { UxDefaultLookupConfiguration } from './ux-lookup-configuration';
import { UxLookupTheme } from './ux-lookup-theme';
const UP = 38;
const DOWN = 40;
const ENTER = 13;
const windowEvents = ['wheel', 'scroll', 'resize'];
const inputEvents = ['click', 'blur', 'change', 'keydown'];
const lookupEvents = ['blur', 'keydown'];
let UxLookup = /** @class */ (() => {
    var UxLookup_1;
    let UxLookup = UxLookup_1 = class UxLookup {
        constructor(element, taskQueue, defaultConfiguration, styleEngine) {
            this.element = element;
            this.taskQueue = taskQueue;
            this.defaultConfiguration = defaultConfiguration;
            this.styleEngine = styleEngine;
            this.isOpen = false;
            this.isWrapperOpen = false;
            this.focusedOption = undefined;
            this.searching = false;
            this.errorMessage = undefined;
            this.notFound = false;
            this.getDisplay = option => option.toString();
            this.getValue = option => option;
            this.debounceNumber = this.defaultConfiguration.debounce;
            this.debounce = this.defaultConfiguration.debounce;
            if (this.defaultConfiguration.theme) {
                this.theme = this.defaultConfiguration.theme;
            }
        }
        displayFieldChanged() {
            if (this.displayField instanceof Function) {
                this.getDisplay = this.displayField;
            }
            else if (typeof this.displayField === 'string') {
                this.getDisplay = option => option[this.displayField];
            }
            else {
                this.getDisplay = option => option.toString();
            }
        }
        valueFieldChanged() {
            if (this.valueField instanceof Function) {
                this.getValue = this.valueField;
            }
            else if (typeof this.valueField === 'string') {
                this.getValue = option => option[this.valueField];
            }
            else {
                this.getValue = option => option;
            }
        }
        optionsChanged() {
            if (this.options instanceof Function) {
                this.getOptions = this.options;
            }
            else {
                this.getOptions = this.getOptionsDefault;
            }
        }
        getOptionsDefault(filter, value) {
            return __awaiter(this, void 0, void 0, function* () {
                const options = this.options;
                if (value) {
                    return Promise.resolve([options.find(x => this.getValue(x) === value)]);
                }
                else {
                    return Promise.resolve(options.filter(x => this.getDisplay(x).toUpperCase().includes(filter.toUpperCase())));
                }
            });
        }
        valueChanged() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.suppressValueChanged) {
                    this.suppressValueChanged = false;
                    return;
                }
                yield this.updateFilterBasedOnValue();
                this.element.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
            });
        }
        setValue(value) {
            if (this.value === value) {
                return;
            }
            this.suppressValueChanged = true;
            this.value = value;
        }
        themeChanged(newValue) {
            if (newValue && newValue.themeKey == null) {
                newValue.themeKey = 'lookup';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        debounceChanged() {
            this.debounceNumber = normalizeNumberAttribute(this.debounce);
        }
        bind() {
            this.themeChanged(this.theme);
            this.valueFieldChanged();
            this.displayFieldChanged();
            this.optionsChanged();
        }
        attached() {
            var _a;
            this.inputElement = (_a = this.element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('ux-input,input');
            if (this.inputElement) {
                inputEvents.forEach(x => this.inputElement.addEventListener(x, this));
            }
            lookupEvents.forEach(x => this.element.addEventListener(x, this));
            this.valueChanged();
        }
        detached() {
            if (this.inputElement) {
                inputEvents.forEach(x => this.inputElement.removeEventListener(x, this));
            }
            lookupEvents.forEach(x => this.element.removeEventListener(x, this));
        }
        open() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isOpen) {
                    return;
                }
                this.updateAnchor();
                windowEvents.forEach(x => window.addEventListener(x, this, true));
                this.isWrapperOpen = true;
                this.isOpen = true;
            });
        }
        close() {
            this.isOpen = false;
            const transitionDurationString = getComputedStyle(this.element).getPropertyValue('--aurelia-ux--lookup-transition-duration')
                || UxLookupTheme.DEFAULT_TRANSITION_DURATION;
            const transitionDuration = parseInt(transitionDurationString.replace('ms', ''));
            setTimeout(() => this.isWrapperOpen = false, transitionDuration);
            this.focusedOption = undefined;
            windowEvents.forEach(x => window.addEventListener(x, this, true));
        }
        updateAnchor() {
            if (!this.inputElement) {
                return;
            }
            const inputRect = this.inputElement.getBoundingClientRect();
            const style = getComputedStyle(this.element);
            const inputDistanceString = style.getPropertyValue('--aurelia-ux--lookup-input-distance');
            const inputDistance = parseInt(inputDistanceString ? inputDistanceString : UxLookupTheme.DEFAULT_INPUT_DISTANCE.toString());
            const windowEdgeDistanceString = style.getPropertyValue('--aurelia-ux--lookup-window-edge-distance');
            const windowEdgeDistance = parseInt(windowEdgeDistanceString ? windowEdgeDistanceString : UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE.toString());
            const bottomHeightThresholdString = style.getPropertyValue('--aurelia-ux--lookup-bottom-height-threshold');
            const bottomHeightThreshold = parseInt(bottomHeightThresholdString ? bottomHeightThresholdString : UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD.toString());
            let availableHeight = document.body.scrollTop + window.innerHeight - inputRect.bottom - inputDistance - windowEdgeDistance;
            if (availableHeight > bottomHeightThreshold) {
                this.anchor = {
                    left: inputRect.left,
                    top: `${inputRect.top + inputRect.height + inputDistance}px`,
                    bottom: undefined,
                    maxHeight: availableHeight,
                    width: inputRect.width
                };
            }
            else {
                availableHeight = inputRect.top - document.body.scrollTop - inputDistance - windowEdgeDistance;
                this.anchor = {
                    left: inputRect.left,
                    top: undefined,
                    bottom: `${window.innerHeight - availableHeight - windowEdgeDistance}px`,
                    maxHeight: availableHeight,
                    width: inputRect.width
                };
            }
        }
        handleEvent(evt) {
            switch (evt.currentTarget) {
                case this.inputElement:
                    switch (evt.type) {
                        case 'click':
                            this.open();
                            break;
                        case 'blur':
                            this.onInputBlur();
                            break;
                        case 'change':
                            this.filterChanged();
                            break;
                        case 'keydown':
                            this.onInputKeydown(evt);
                            break;
                    }
                    break;
                case window:
                    switch (evt.type) {
                        case 'scroll':
                        case 'wheel':
                            this.onWindowWheel(evt);
                            break;
                        case 'resize':
                            this.onWindowResize();
                            break;
                    }
                    break;
                case this.element:
                    switch (evt.type) {
                        case 'blur':
                            this.onBlur();
                            break;
                        case 'keydown':
                            this.onKeydown(evt);
                            break;
                    }
                    break;
            }
        }
        filterChanged() {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                if (this.suppressFilterChanged) {
                    this.suppressFilterChanged = false;
                    return;
                }
                (_a = this.debouncePromise) === null || _a === void 0 ? void 0 : _a.discard();
                this.debouncePromise = new DiscardablePromise(new Promise(r => { var _a; return setTimeout(() => r(), (_a = this.debounceNumber) !== null && _a !== void 0 ? _a : 0); }));
                try {
                    yield this.debouncePromise;
                }
                catch (e) {
                    return;
                }
                this.setValue(undefined);
                (_b = this.searchPromise) === null || _b === void 0 ? void 0 : _b.discard();
                if (!this.isOpen) {
                    this.open();
                }
                this.searching = true;
                this.errorMessage = undefined;
                this.notFound = false;
                this.optionsArray = [];
                try {
                    this.searchPromise = new DiscardablePromise(this.getOptions((_c = this.inputElement) === null || _c === void 0 ? void 0 : _c.value, undefined));
                    this.optionsArray = yield this.searchPromise;
                    this.notFound = !((_d = this.optionsArray) === null || _d === void 0 ? void 0 : _d.length);
                    this.updateAnchor();
                }
                catch (e) {
                    if (e !== DiscardablePromise.discarded) {
                        this.errorMessage = e.message;
                    }
                }
                finally {
                    this.searching = false;
                }
            });
        }
        setFilter(filter) {
            if (!this.inputElement || this.inputElement.value === filter) {
                return;
            }
            this.suppressFilterChanged = true;
            this.inputElement.value = filter;
        }
        updateFilterBasedOnValue() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.value) {
                    this.optionsArray = yield this.getOptions(undefined, this.value);
                }
                else {
                    this.optionsArray = [];
                }
                if (this.optionsArray && this.optionsArray.length) {
                    this.setFilter(this.getDisplay(this.optionsArray[0]));
                }
                else {
                    this.setFilter(undefined);
                }
            });
        }
        select(option) {
            this.value = this.getValue(option);
            this.close();
            this.element.dispatchEvent(new CustomEvent(UxLookup_1.SELECTED_EVENT, { detail: { value: this.value } }));
        }
        onBlur() {
            this.close();
        }
        onInputKeydown(evt) {
            switch (evt.which) {
                case DOWN:
                    this.element.focus();
                    this.focusedOption = this.optionsArray[0];
                    evt.preventDefault();
                    break;
            }
        }
        onInputBlur() {
            if (document.activeElement !== this.element) {
                this.close();
            }
        }
        onWindowWheel(evt) {
            if (this.isOpen) {
                if (evt.target === PLATFORM.global || !this.element.contains(evt.target)) {
                    this.close();
                }
            }
        }
        onKeydown(evt) {
            let i;
            switch (evt.which) {
                case DOWN:
                    i = this.optionsArray.indexOf(this.focusedOption);
                    this.focusedOption = this.optionsArray[i !== this.optionsArray.length - 1 ? i + 1 : 0];
                    this.taskQueue.queueTask(() => { var _a; return (_a = this.element.querySelector('.ux-lookup__option--focused')) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
                    break;
                case UP:
                    i = this.optionsArray.indexOf(this.focusedOption);
                    this.focusedOption = this.optionsArray[i !== 0 ? i - 1 : this.optionsArray.length - 1];
                    this.taskQueue.queueTask(() => { var _a; return (_a = this.element.querySelector('.ux-lookup__option--focused')) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
                    break;
                case ENTER:
                    this.select(this.focusedOption);
                    this.close();
                    break;
            }
            evt.preventDefault();
        }
        onWindowResize() {
            if (this.isOpen) {
                this.updateAnchor();
            }
        }
    };
    UxLookup.SELECTED_EVENT = 'selected';
    __decorate([
        bindable
    ], UxLookup.prototype, "displayField", void 0);
    __decorate([
        bindable
    ], UxLookup.prototype, "valueField", void 0);
    __decorate([
        bindable
    ], UxLookup.prototype, "options", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxLookup.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxLookup.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxLookup.prototype, "debounce", void 0);
    UxLookup = UxLookup_1 = __decorate([
        inject(Element, TaskQueue, UxDefaultLookupConfiguration, StyleEngine),
        customElement('ux-lookup'),
        useView(PLATFORM.moduleName('./ux-lookup.html'))
    ], UxLookup);
    return UxLookup;
})();
export { UxLookup };
//# sourceMappingURL=ux-lookup.js.map