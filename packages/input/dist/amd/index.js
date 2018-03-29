define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-input-theme", "./ux-input"], function (require, exports, aurelia_framework_1, AuBinding, core_1, ux_input_theme_1, ux_input_1) {
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
                    return new AuBinding.ValueAttributeObserver(element, 'value', uxInputChangeHandler);
                }
            }
        }
    };
    var uxInputChangeHandler = {
        subscribe: function (target, callbackOrListener) {
            target.addEventListener('change', callbackOrListener, false);
            return function () {
                target.removeEventListener('change', callbackOrListener, false);
            };
        }
    };
});
