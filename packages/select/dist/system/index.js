System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-option", "./ux-optgroup", "./ux-select", "./ux-select-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-select'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-optgroup'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-option')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1, AuBinding, core_1, uxSelectConfig, uxSelectChangeHandler;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (AuBinding_1) {
                AuBinding = AuBinding_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_option_1_1) {
                exports_1({
                    "UxOption": ux_option_1_1["UxOption"]
                });
            },
            function (ux_optgroup_1_1) {
                exports_1({
                    "UxOptGroup": ux_optgroup_1_1["UxOptGroup"]
                });
            },
            function (ux_select_1_1) {
                exports_1({
                    "UxSelect": ux_select_1_1["UxSelect"]
                });
            },
            function (ux_select_theme_1_1) {
                exports_1({
                    "UxSelectTheme": ux_select_theme_1_1["UxSelectTheme"]
                });
            }
        ],
        execute: function () {
            uxSelectConfig = {
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
            uxSelectChangeHandler = {
                subscribe: function (target, callbackOrListener) {
                    target.addEventListener('change', callbackOrListener, false);
                    return function () {
                        target.removeEventListener('change', callbackOrListener, false);
                    };
                }
            };
        }
    };
});
