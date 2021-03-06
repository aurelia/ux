"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_switch_theme_1 = require("./ux-switch-theme");
Object.defineProperty(exports, "UxSwitchTheme", { enumerable: true, get: function () { return ux_switch_theme_1.UxSwitchTheme; } });
var ux_switch_1 = require("./ux-switch");
Object.defineProperty(exports, "UxSwitch", { enumerable: true, get: function () { return ux_switch_1.UxSwitch; } });
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSwitchConfig);
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-switch'));
}
exports.configure = configure;
var uxSwitchConfig = {
    tagName: 'ux-switch',
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