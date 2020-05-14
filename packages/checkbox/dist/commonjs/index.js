"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_checkbox_theme_1 = require("./ux-checkbox-theme");
exports.UxCheckboxTheme = ux_checkbox_theme_1.UxCheckboxTheme;
var ux_checkbox_1 = require("./ux-checkbox");
exports.UxCheckbox = ux_checkbox_1.UxCheckbox;
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-checkbox'));
}
exports.configure = configure;
var uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
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