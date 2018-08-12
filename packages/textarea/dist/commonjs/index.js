"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_textarea_theme_1 = require("./ux-textarea-theme");
exports.UxTextAreaTheme = ux_textarea_theme_1.UxTextAreaTheme;
var ux_textarea_1 = require("./ux-textarea");
exports.UxTextArea = ux_textarea_1.UxTextArea;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
    ]);
}
exports.configure = configure;
var uxTextAreaConfig = {
    tagName: 'ux-textarea',
    properties: {
        value: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element) {
                return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
            }
        }
    }
};
