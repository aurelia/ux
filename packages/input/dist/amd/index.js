define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-input-theme", "./ux-input"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_input_theme_1, ux_input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
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
});
