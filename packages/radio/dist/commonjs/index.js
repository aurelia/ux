"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_radio_theme_1 = require("./ux-radio-theme");
exports.UxRadioTheme = ux_radio_theme_1.UxRadioTheme;
var ux_radio_1 = require("./ux-radio");
exports.UxRadio = ux_radio_1.UxRadio;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-radio'));
}
exports.configure = configure;
var uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new aurelia_binding_1.CheckedObserver(element, new aurelia_binding_1.EventSubscriber(['change']), observerLocator);
            }
        }
    }
};
//# sourceMappingURL=index.js.map