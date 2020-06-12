"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxDefaultInputConfiguration = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_default_input_configuration_1 = require("./ux-default-input-configuration");
Object.defineProperty(exports, "UxDefaultInputConfiguration", { enumerable: true, get: function () { return ux_default_input_configuration_1.UxDefaultInputConfiguration; } });
var ux_input_theme_1 = require("./ux-input-theme");
Object.defineProperty(exports, "UxInputTheme", { enumerable: true, get: function () { return ux_input_theme_1.UxInputTheme; } });
var ux_input_1 = require("./ux-input");
Object.defineProperty(exports, "UxInput", { enumerable: true, get: function () { return ux_input_1.UxInput; } });
function configure(config, callback) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-input'));
    if (typeof callback === 'function') {
        var defaults = config.container.get(ux_default_input_configuration_1.UxDefaultInputConfiguration);
        callback(defaults);
    }
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
//# sourceMappingURL=index.js.map