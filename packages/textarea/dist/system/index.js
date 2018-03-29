System.register(["aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-textarea-theme", "./ux-textarea"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1, AuBinding, core_1, uxTextAreaConfig, uxTextareaChangeHandler;
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
                            return new AuBinding.ValueAttributeObserver(element, 'value', uxTextareaChangeHandler);
                        }
                    }
                }
            };
            uxTextareaChangeHandler = {
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
