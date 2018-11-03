System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-radio-theme", "./ux-radio"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_binding_1, core_1, uxRadioConfig;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxRadioConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
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
            function (ux_radio_theme_1_1) {
                exports_1({
                    "UxRadioTheme": ux_radio_theme_1_1["UxRadioTheme"]
                });
            },
            function (ux_radio_1_1) {
                exports_1({
                    "UxRadio": ux_radio_1_1["UxRadio"]
                });
            }
        ],
        execute: function () {
            uxRadioConfig = {
                tagName: 'ux-radio',
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
