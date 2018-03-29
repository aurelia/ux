"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuBinding = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_checkbox_theme_1 = require("./ux-checkbox-theme");
exports.UxCheckboxTheme = ux_checkbox_theme_1.UxCheckboxTheme;
var ux_checkbox_1 = require("./ux-checkbox");
exports.UxCheckbox = ux_checkbox_1.UxCheckbox;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
    ]);
}
exports.configure = configure;
var uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
    properties: {
        checked: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new AuBinding.CheckedObserver(element, uxCheckboxChangeHandler, observerLocator);
            }
        }
    }
};
var uxCheckboxChangeHandler = {
    subscribe: function (target, callbackOrListener) {
        target.addEventListener('change', callbackOrListener, false);
        return function () {
            target.removeEventListener('change', callbackOrListener, false);
        };
    }
};
