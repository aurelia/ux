"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var datetime_utility_1 = require("./resources/datetime-utility");
var aurelia_pal_1 = require("aurelia-pal");
var moment_rexports_1 = require("./resources/moment-rexports");
// tslint:disable-next-line: no-submodule-imports
require("@aurelia-ux/core/components/ux-input-component.css");
// tslint:disable-next-line: no-submodule-imports
require("@aurelia-ux/core/components/ux-input-component--outline.css");
// import UX_DATEPICKER_VIEW from './ux-datepicker.html';
// import { PLATFORM } from 'aurelia-pal';
var UxDatepicker = /** @class */ (function () {
    function UxDatepicker(element, resources, styleEngine) {
        this.element = element;
        this.resources = resources;
        this.styleEngine = styleEngine;
        this.display = 'month';
        this.type = 'datetime';
        this.autofocus = null;
        this.disabled = false;
        this.readonly = false;
        this.variant = 'filled';
        this.dense = false;
        this.formatters = {
            date: 'L',
            time: 'LT',
            datetime: 'L LT'
        };
        this.parsers = {
            time: ['h:m a', 'H:m']
        };
        this.focused = false;
        this.showDialog = false;
    }
    UxDatepicker.prototype.bind = function () {
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        this.dense = core_1.normalizeBooleanAttribute('dense', this.dense);
        if (this.initialDate != null) {
            var dateParse = moment_rexports_1.moment(this.initialDate);
            if (dateParse.isValid()) {
                this.initialDate = dateParse;
            }
        }
        else {
            this.initialDate = moment_rexports_1.moment();
        }
        if (this.minDate != null) {
            var dateParse = moment_rexports_1.moment(this.minDate);
            this.minDate = dateParse.isValid() ? dateParse : null;
        }
        if (this.maxDate != null) {
            var dateParse = moment_rexports_1.moment(this.maxDate);
            this.maxDate = dateParse.isValid() ? dateParse : null;
        }
        if (this.minTime != null) {
            var dateParse = moment_rexports_1.moment(this.minTime, this.parsers.time);
            this.minTime = dateParse.isValid() ? dateParse : null;
        }
        if (this.maxTime != null) {
            var dateParse = moment_rexports_1.moment(this.maxTime, this.parsers.time);
            this.maxTime = dateParse.isValid() ? dateParse : null;
        }
        this.valueChanged(this.value);
        this.themeChanged(this.theme);
    };
    UxDatepicker.prototype.attached = function () {
        this.variantChanged(this.variant);
    };
    UxDatepicker.prototype.toggleDialog = function (display) {
        if (this.showDialog) {
            this.showDialog = false;
            return;
        }
        if (this.disabled || this.readonly) {
            return;
        }
        this.display = display;
        this.showDialog = true;
    };
    UxDatepicker.prototype.blur = function () {
        if (this.showDialog) {
            // if the dialog is opened, we consider that the most accurate value
            // comes from the dialog and bring back its value
            this.valueChanged(this.value);
            return;
        }
        // if the dialog is not opened, the textbox has the most accurate value
        // and therefore we validate it and assign it to component
        this.changeTextboxValue();
    };
    UxDatepicker.prototype.changeTextboxValue = function () {
        if (!this.textboxValue) {
            this.value = null;
            return;
        }
        var parseValue;
        parseValue = this.type === 'time' ? moment_rexports_1.moment(this.textboxValue, this.parsers.time) : moment_rexports_1.moment(this.textboxValue);
        if (parseValue.isValid() &&
            datetime_utility_1.DatetimeUtility.dateOutOfRange(parseValue, this.minDate, this.maxDate, this.config) === false) {
            this.value = parseValue.toDate();
        }
        else {
            this.value = null;
            this.textboxValue = '';
        }
    };
    UxDatepicker.prototype.valueChanged = function (newValue) {
        if (newValue == null) {
            return;
        }
        if (this.type.toLowerCase() === 'datetime') {
            this.textboxValue = moment_rexports_1.moment(newValue).format(this.formatters.datetime);
        }
        if (this.type.toLowerCase() === 'date') {
            this.textboxValue = moment_rexports_1.moment(newValue).format(this.formatters.date);
        }
        if (this.type.toLowerCase() === 'time') {
            this.textboxValue = moment_rexports_1.moment(newValue).format(this.formatters.time);
        }
    };
    UxDatepicker.prototype.minDateChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment_rexports_1.moment === false) {
            var dateParse = moment_rexports_1.moment(newValue);
            this.minDate = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.maxDateChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment_rexports_1.moment === false) {
            var dateParse = moment_rexports_1.moment(newValue);
            this.maxDate = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.minTimeChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment_rexports_1.moment === false) {
            var dateParse = moment_rexports_1.moment(newValue, this.parsers.time);
            this.minTime = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.maxTimeChanged = function (newValue) {
        if (newValue != null && newValue instanceof moment_rexports_1.moment === false) {
            var dateParse = moment_rexports_1.moment(newValue, this.parsers.time);
            this.maxTime = dateParse.isValid() ? dateParse : null;
        }
    };
    UxDatepicker.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'datepicker';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxDatepicker.prototype.focusedChanged = function (focused) {
        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    UxDatepicker.prototype.focusInput = function () {
        this.textbox.focus();
    };
    UxDatepicker.prototype.variantChanged = function (newValue) {
        this.element.style.backgroundColor = newValue === 'outline' ?
            this.element.style.backgroundColor = core_1.getBackgroundColorThroughParents(this.element) :
            '';
    };
    Object.defineProperty(UxDatepicker.prototype, "placeholderMode", {
        get: function () {
            return typeof this.label !== 'string' || this.label.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "display", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "type", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "initialDate", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "minTime", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "maxTime", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "minDate", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "maxDate", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "config", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "autofocus", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "disabled", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "readonly", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "label", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "placeholder", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "variant", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "dense", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "formatters", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDatepicker.prototype, "parsers", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], UxDatepicker.prototype, "value", void 0);
    __decorate([
        aurelia_binding_1.observable
    ], UxDatepicker.prototype, "focused", void 0);
    __decorate([
        aurelia_binding_1.computedFrom('label')
    ], UxDatepicker.prototype, "placeholderMode", null);
    UxDatepicker = __decorate([
        aurelia_dependency_injection_1.inject(Element, aurelia_templating_1.ViewResources, core_1.StyleEngine),
        aurelia_templating_1.customElement('ux-datepicker')
        // @inlineView(
        //   UX_DATEPICKER_VIEW,
        //   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker.css')]
        // )
    ], UxDatepicker);
    return UxDatepicker;
}());
exports.UxDatepicker = UxDatepicker;
//# sourceMappingURL=ux-datepicker.js.map