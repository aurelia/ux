System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-textarea-theme", "./ux-textarea"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_binding_1, core_1, uxTextAreaConfig;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
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
            function (ux_textarea_theme_1_1) {
                exports_1({
                    "UxTextAreaTheme": ux_textarea_theme_1_1["UxTextAreaTheme"]
                });
            },
            function (ux_textarea_1_1) {
                exports_1({
                    "UxTextArea": ux_textarea_1_1["UxTextArea"]
                });
            }
        ],
        execute: function () {
            uxTextAreaConfig = {
                tagName: 'ux-textarea',
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
