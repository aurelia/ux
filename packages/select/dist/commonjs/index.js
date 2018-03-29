"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuBinding = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_option_1 = require("./ux-option");
exports.UxOption = ux_option_1.UxOption;
var ux_optgroup_1 = require("./ux-optgroup");
exports.UxOptGroup = ux_optgroup_1.UxOptGroup;
var ux_select_1 = require("./ux-select");
exports.UxSelect = ux_select_1.UxSelect;
var ux_select_theme_1 = require("./ux-select-theme");
exports.UxSelectTheme = ux_select_theme_1.UxSelectTheme;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-select'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-optgroup'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-option')
    ]);
}
exports.configure = configure;
var uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element, _) {
                return new AuBinding.ValueAttributeObserver(element, 'value', uxSelectChangeHandler);
            }
        }
    }
};
var uxSelectChangeHandler = {
    subscribe: function (target, callbackOrListener) {
        target.addEventListener('change', callbackOrListener, false);
        return function () {
            target.removeEventListener('change', callbackOrListener, false);
        };
    }
};
