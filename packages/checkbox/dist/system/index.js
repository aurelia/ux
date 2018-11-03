System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-checkbox-theme", "./ux-checkbox"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_binding_1, core_1, uxCheckBoxConfig;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
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
            function (ux_checkbox_theme_1_1) {
                exports_1({
                    "UxCheckboxTheme": ux_checkbox_theme_1_1["UxCheckboxTheme"]
                });
            },
            function (ux_checkbox_1_1) {
                exports_1({
                    "UxCheckbox": ux_checkbox_1_1["UxCheckbox"]
                });
            }
        ],
        execute: function () {
            uxCheckBoxConfig = {
                tagName: 'ux-checkbox',
                properties: {
                    checked: {
                        defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                        getObserver: function (element, _, observerLocator) {
                            return new aurelia_binding_1.CheckedObserver(element, new aurelia_binding_1.EventSubscriber(['change']), observerLocator);
                        }
                    }
                }
            };
        }
    };
});
