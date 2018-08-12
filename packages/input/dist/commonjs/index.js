"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_input_theme_1 = require("./ux-input-theme");
exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
var ux_input_1 = require("./ux-input");
exports.UxInput = ux_input_1.UxInput;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input/ux-input')
    ]);
}
exports.configure = configure;
var uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element) {
                return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
            }
        }
    }
};
