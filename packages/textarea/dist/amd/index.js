define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-textarea-theme", "./ux-textarea"], function (require, exports, aurelia_framework_1, AuBinding, core_1, ux_textarea_theme_1, ux_textarea_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxTextAreaTheme = ux_textarea_theme_1.UxTextAreaTheme;
    exports.UxTextArea = ux_textarea_1.UxTextArea;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
        ]);
    }
    exports.configure = configure;
    var uxTextAreaConfig = {
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
    var uxTextareaChangeHandler = {
        subscribe: function (target, callbackOrListener) {
            target.addEventListener('change', callbackOrListener, false);
            return function () {
                target.removeEventListener('change', callbackOrListener, false);
            };
        }
    };
});
