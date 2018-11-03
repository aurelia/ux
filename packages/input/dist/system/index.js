System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-input-theme", "./ux-input"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_binding_1, core_1, uxInputConfig;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxInputConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input/ux-input')
        ]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ux_input_theme_1_1) {
                exports_1({
                    "UxInputTheme": ux_input_theme_1_1["UxInputTheme"]
                });
            },
            function (ux_input_1_1) {
                exports_1({
                    "UxInput": ux_input_1_1["UxInput"]
                });
            }
        ],
        execute: function () {
            uxInputConfig = {
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
        }
    };
});
