define(["require", "exports", "tslib", "aurelia-framework", "@aurelia-ux/core", "./discardable-promise", "./ux-lookup-configuration", "./ux-lookup-theme"], function (require, exports, tslib_1, aurelia_framework_1, core_1, discardable_promise_1, ux_lookup_configuration_1, ux_lookup_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxLookup = void 0;
    var UP = 38;
    var DOWN = 40;
    var ENTER = 13;
    var windowEvents = ['wheel', 'scroll', 'resize'];
    var inputEvents = ['click', 'blur', 'change', 'keydown'];
    var lookupEvents = ['blur', 'keydown'];
    var UxLookup = /** @class */ (function () {
        function UxLookup(element, taskQueue, defaultConfiguration, styleEngine) {
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
            this.getDisplay = function (option) { return option.toString(); };
            this.getValue = function (option) { return option; };
            this.debounceNumber = this.defaultConfiguration.debounce;
            this.debounce = this.defaultConfiguration.debounce;
            if (this.defaultConfiguration.theme) {
                this.theme = this.defaultConfiguration.theme;
            }
        }
        UxLookup_1 = UxLookup;
        UxLookup.prototype.displayFieldChanged = function () {
            var _this = this;
            if (this.displayField instanceof Function) {
                this.getDisplay = this.displayField;
            }
            else if (typeof this.displayField === 'string') {
                this.getDisplay = function (option) { return option[_this.displayField]; };
            }
            else {
                this.getDisplay = function (option) { return option.toString(); };
            }
        };
        UxLookup.prototype.valueFieldChanged = function () {
            var _this = this;
            if (this.valueField instanceof Function) {
                this.getValue = this.valueField;
            }
            else if (typeof this.valueField === 'string') {
                this.getValue = function (option) { return option[_this.valueField]; };
            }
            else {
                this.getValue = function (option) { return option; };
            }
        };
        UxLookup.prototype.optionsChanged = function () {
            if (this.options instanceof Function) {
                this.getOptions = this.options;
            }
            else {
                this.getOptions = this.getOptionsDefault;
            }
        };
        UxLookup.prototype.getOptionsDefault = function (filter, value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var options;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    options = this.options;
                    if (value) {
                        return [2 /*return*/, Promise.resolve([options.find(function (x) { return _this.getValue(x) === value; })])];
                    }
                    else {
                        return [2 /*return*/, Promise.resolve(options.filter(function (x) { return _this.getDisplay(x).toUpperCase().includes(filter.toUpperCase()); }))];
                    }
                    return [2 /*return*/];
                });
            });
        };
        UxLookup.prototype.valueChanged = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.suppressValueChanged) {
                                this.suppressValueChanged = false;
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.updateFilterBasedOnValue()];
                        case 1:
                            _a.sent();
                            this.element.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        UxLookup.prototype.setValue = function (value) {
            if (this.value === value) {
                return;
            }
            this.suppressValueChanged = true;
            this.value = value;
        };
        UxLookup.prototype.themeChanged = function (newValue) {
            if (newValue && newValue.themeKey == null) {
                newValue.themeKey = 'lookup';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxLookup.prototype.debounceChanged = function () {
            this.debounceNumber = core_1.normalizeNumberAttribute(this.debounce);
        };
        UxLookup.prototype.bind = function () {
            this.themeChanged(this.theme);
            this.valueFieldChanged();
            this.displayFieldChanged();
            this.optionsChanged();
        };
        UxLookup.prototype.attached = function () {
            var _this = this;
            var _a;
            this.inputElement = (_a = this.element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('ux-input,input');
            if (this.inputElement) {
                inputEvents.forEach(function (x) { return _this.inputElement.addEventListener(x, _this); });
            }
            lookupEvents.forEach(function (x) { return _this.element.addEventListener(x, _this); });
            this.valueChanged();
        };
        UxLookup.prototype.detached = function () {
            var _this = this;
            if (this.inputElement) {
                inputEvents.forEach(function (x) { return _this.inputElement.removeEventListener(x, _this); });
            }
            lookupEvents.forEach(function (x) { return _this.element.removeEventListener(x, _this); });
        };
        UxLookup.prototype.open = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    if (this.isOpen) {
                        return [2 /*return*/];
                    }
                    this.updateAnchor();
                    windowEvents.forEach(function (x) { return window.addEventListener(x, _this, true); });
                    this.isWrapperOpen = true;
                    this.isOpen = true;
                    return [2 /*return*/];
                });
            });
        };
        UxLookup.prototype.close = function () {
            var _this = this;
            this.isOpen = false;
            var transitionDurationString = getComputedStyle(this.element).getPropertyValue('--aurelia-ux--lookup-transition-duration')
                || ux_lookup_theme_1.UxLookupTheme.DEFAULT_TRANSITION_DURATION;
            var transitionDuration = parseInt(transitionDurationString.replace('ms', ''));
            setTimeout(function () { return _this.isWrapperOpen = false; }, transitionDuration);
            this.focusedOption = undefined;
            windowEvents.forEach(function (x) { return window.addEventListener(x, _this, true); });
        };
        UxLookup.prototype.updateAnchor = function () {
            if (!this.inputElement) {
                return;
            }
            var inputRect = this.inputElement.getBoundingClientRect();
            var style = getComputedStyle(this.element);
            var inputDistanceString = style.getPropertyValue('--aurelia-ux--lookup-input-distance');
            var inputDistance = parseInt(inputDistanceString ? inputDistanceString : ux_lookup_theme_1.UxLookupTheme.DEFAULT_INPUT_DISTANCE.toString());
            var windowEdgeDistanceString = style.getPropertyValue('--aurelia-ux--lookup-window-edge-distance');
            var windowEdgeDistance = parseInt(windowEdgeDistanceString ? windowEdgeDistanceString : ux_lookup_theme_1.UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE.toString());
            var bottomHeightThresholdString = style.getPropertyValue('--aurelia-ux--lookup-bottom-height-threshold');
            var bottomHeightThreshold = parseInt(bottomHeightThresholdString ? bottomHeightThresholdString : ux_lookup_theme_1.UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD.toString());
            var availableHeight = document.body.scrollTop + window.innerHeight - inputRect.bottom - inputDistance - windowEdgeDistance;
            if (availableHeight > bottomHeightThreshold) {
                this.anchor = {
                    left: inputRect.left,
                    top: inputRect.top + inputRect.height + inputDistance + "px",
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
                    bottom: window.innerHeight - availableHeight - windowEdgeDistance + "px",
                    maxHeight: availableHeight,
                    width: inputRect.width
                };
            }
        };
        UxLookup.prototype.handleEvent = function (evt) {
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
        };
        UxLookup.prototype.filterChanged = function () {
            var _a, _b, _c, _d;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var e_1, _e, e_2;
                var _this = this;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.suppressFilterChanged) {
                                this.suppressFilterChanged = false;
                                return [2 /*return*/];
                            }
                            (_a = this.debouncePromise) === null || _a === void 0 ? void 0 : _a.discard();
                            this.debouncePromise = new discardable_promise_1.DiscardablePromise(new Promise(function (r) { var _a; return setTimeout(function () { return r(); }, (_a = _this.debounceNumber) !== null && _a !== void 0 ? _a : 0); }));
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.debouncePromise];
                        case 2:
                            _f.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _f.sent();
                            return [2 /*return*/];
                        case 4:
                            this.setValue(undefined);
                            (_b = this.searchPromise) === null || _b === void 0 ? void 0 : _b.discard();
                            if (!this.isOpen) {
                                this.open();
                            }
                            this.searching = true;
                            this.errorMessage = undefined;
                            this.notFound = false;
                            this.optionsArray = [];
                            _f.label = 5;
                        case 5:
                            _f.trys.push([5, 7, 8, 9]);
                            this.searchPromise = new discardable_promise_1.DiscardablePromise(this.getOptions((_c = this.inputElement) === null || _c === void 0 ? void 0 : _c.value, undefined));
                            _e = this;
                            return [4 /*yield*/, this.searchPromise];
                        case 6:
                            _e.optionsArray = _f.sent();
                            this.notFound = !((_d = this.optionsArray) === null || _d === void 0 ? void 0 : _d.length);
                            this.updateAnchor();
                            return [3 /*break*/, 9];
                        case 7:
                            e_2 = _f.sent();
                            if (e_2 !== discardable_promise_1.DiscardablePromise.discarded) {
                                this.errorMessage = e_2.message;
                            }
                            return [3 /*break*/, 9];
                        case 8:
                            this.searching = false;
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        UxLookup.prototype.setFilter = function (filter) {
            if (!this.inputElement || this.inputElement.value === filter) {
                return;
            }
            this.suppressFilterChanged = true;
            this.inputElement.value = filter;
        };
        UxLookup.prototype.updateFilterBasedOnValue = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.value) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.getOptions(undefined, this.value)];
                        case 1:
                            _a.optionsArray = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.optionsArray = [];
                            _b.label = 3;
                        case 3:
                            if (this.optionsArray && this.optionsArray.length) {
                                this.setFilter(this.getDisplay(this.optionsArray[0]));
                            }
                            else {
                                this.setFilter(undefined);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UxLookup.prototype.select = function (option) {
            this.value = this.getValue(option);
            this.close();
            this.element.dispatchEvent(new CustomEvent(UxLookup_1.SELECTED_EVENT, { detail: { value: this.value } }));
        };
        UxLookup.prototype.onBlur = function () {
            this.close();
        };
        UxLookup.prototype.onInputKeydown = function (evt) {
            switch (evt.which) {
                case DOWN:
                    this.element.focus();
                    this.focusedOption = this.optionsArray[0];
                    evt.preventDefault();
                    break;
            }
        };
        UxLookup.prototype.onInputBlur = function () {
            if (document.activeElement !== this.element) {
                this.close();
            }
        };
        UxLookup.prototype.onWindowWheel = function (evt) {
            if (this.isOpen) {
                if (evt.target === aurelia_framework_1.PLATFORM.global || !this.element.contains(evt.target)) {
                    this.close();
                }
            }
        };
        UxLookup.prototype.onKeydown = function (evt) {
            var _this = this;
            var i;
            switch (evt.which) {
                case DOWN:
                    i = this.optionsArray.indexOf(this.focusedOption);
                    this.focusedOption = this.optionsArray[i !== this.optionsArray.length - 1 ? i + 1 : 0];
                    this.taskQueue.queueTask(function () { var _a; return (_a = _this.element.querySelector('.ux-lookup__option--focused')) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
                    break;
                case UP:
                    i = this.optionsArray.indexOf(this.focusedOption);
                    this.focusedOption = this.optionsArray[i !== 0 ? i - 1 : this.optionsArray.length - 1];
                    this.taskQueue.queueTask(function () { var _a; return (_a = _this.element.querySelector('.ux-lookup__option--focused')) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
                    break;
                case ENTER:
                    this.select(this.focusedOption);
                    this.close();
                    break;
            }
            evt.preventDefault();
        };
        UxLookup.prototype.onWindowResize = function () {
            if (this.isOpen) {
                this.updateAnchor();
            }
        };
        var UxLookup_1;
        UxLookup.SELECTED_EVENT = 'selected';
        tslib_1.__decorate([
            aurelia_framework_1.bindable
        ], UxLookup.prototype, "displayField", void 0);
        tslib_1.__decorate([
            aurelia_framework_1.bindable
        ], UxLookup.prototype, "valueField", void 0);
        tslib_1.__decorate([
            aurelia_framework_1.bindable
        ], UxLookup.prototype, "options", void 0);
        tslib_1.__decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
        ], UxLookup.prototype, "value", void 0);
        tslib_1.__decorate([
            aurelia_framework_1.bindable
        ], UxLookup.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_framework_1.bindable
        ], UxLookup.prototype, "debounce", void 0);
        UxLookup = UxLookup_1 = tslib_1.__decorate([
            aurelia_framework_1.inject(Element, aurelia_framework_1.TaskQueue, ux_lookup_configuration_1.UxDefaultLookupConfiguration, core_1.StyleEngine),
            aurelia_framework_1.customElement('ux-lookup'),
            aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-lookup.html'))
        ], UxLookup);
        return UxLookup;
    }());
    exports.UxLookup = UxLookup;
});
//# sourceMappingURL=ux-lookup.js.map