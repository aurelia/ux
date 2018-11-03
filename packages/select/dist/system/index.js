System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-option", "./ux-optgroup", "./ux-select", "./ux-select-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_binding_1, core_1, uxSelectConfig;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select/ux-select'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select/ux-optgroup'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select/ux-option')
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
                            return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
                        }
                    }
                }
            };
        }
    };
});
