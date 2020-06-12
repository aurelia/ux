define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-default-input-configuration", "./ux-input-theme", "./ux-input"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_default_input_configuration_1, ux_input_theme_1, ux_input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxDefaultInputConfiguration = void 0;
    Object.defineProperty(exports, "UxDefaultInputConfiguration", { enumerable: true, get: function () { return ux_default_input_configuration_1.UxDefaultInputConfiguration; } });
    Object.defineProperty(exports, "UxInputTheme", { enumerable: true, get: function () { return ux_input_theme_1.UxInputTheme; } });
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
});
//# sourceMappingURL=index.js.map