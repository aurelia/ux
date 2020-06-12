"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxDefaultSelectConfiguration = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_default_select_configuration_1 = require("./ux-default-select-configuration");
Object.defineProperty(exports, "UxDefaultSelectConfiguration", { enumerable: true, get: function () { return ux_default_select_configuration_1.UxDefaultSelectConfiguration; } });
var ux_option_1 = require("./ux-option");
Object.defineProperty(exports, "UxOption", { enumerable: true, get: function () { return ux_option_1.UxOption; } });
var ux_optgroup_1 = require("./ux-optgroup");
Object.defineProperty(exports, "UxOptGroup", { enumerable: true, get: function () { return ux_optgroup_1.UxOptGroup; } });
var ux_select_1 = require("./ux-select");
Object.defineProperty(exports, "UxSelect", { enumerable: true, get: function () { return ux_select_1.UxSelect; } });
var ux_select_theme_1 = require("./ux-select-theme");
Object.defineProperty(exports, "UxSelectTheme", { enumerable: true, get: function () { return ux_select_theme_1.UxSelectTheme; } });
function configure(config, callback) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-select'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-optgroup'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-option')
    ]);
    if (typeof callback === 'function') {
        var defaults = config.container.get(ux_default_select_configuration_1.UxDefaultSelectConfiguration);
        callback(defaults);
    }
}
exports.configure = configure;
var uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            getObserver: function (element, _) {
                return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
            }
        }
    }
};
//# sourceMappingURL=index.js.map