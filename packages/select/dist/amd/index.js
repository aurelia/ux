define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-option", "./ux-optgroup", "./ux-select", "./ux-select-theme"], function (require, exports, aurelia_framework_1, AuBinding, core_1, ux_option_1, ux_optgroup_1, ux_select_1, ux_select_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxOption = ux_option_1.UxOption;
    exports.UxOptGroup = ux_optgroup_1.UxOptGroup;
    exports.UxSelect = ux_select_1.UxSelect;
    exports.UxSelectTheme = ux_select_theme_1.UxSelectTheme;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-select'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-optgroup'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-option')
        ]);
    }
    exports.configure = configure;
    var uxSelectConfig = {
        tagName: 'ux-select',
        properties: {
            value: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element, _) {
                    return new AuBinding.ValueAttributeObserver(element, 'value', uxSelectChangeHandler);
                }
            }
        }
    };
    var uxSelectChangeHandler = {
        subscribe: function (target, callbackOrListener) {
            target.addEventListener('change', callbackOrListener, false);
            return function () {
                target.removeEventListener('change', callbackOrListener, false);
            };
        }
    };
});
