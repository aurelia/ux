"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuBinding = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_switch_theme_1 = require("./ux-switch-theme");
exports.UxSwitchTheme = ux_switch_theme_1.UxSwitchTheme;
var ux_switch_1 = require("./ux-switch");
exports.UxSwitch = ux_switch_1.UxSwitch;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSwitchConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
    ]);
}
exports.configure = configure;
var uxSwitchConfig = {
    tagName: 'ux-switch',
    properties: {
        checked: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new AuBinding.CheckedObserver(element, uxSwitchChangeHandler, observerLocator);
            }
        }
    }
};
var uxSwitchChangeHandler = {
    subscribe: function (target, callbackOrListener) {
        target.addEventListener('change', callbackOrListener, false);
        return function () {
            target.removeEventListener('change', callbackOrListener, false);
        };
    }
};
