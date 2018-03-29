define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-radio-theme", "./ux-radio"], function (require, exports, aurelia_framework_1, AuBinding, core_1, ux_radio_theme_1, ux_radio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxRadioTheme = ux_radio_theme_1.UxRadioTheme;
    exports.UxRadio = ux_radio_1.UxRadio;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxRadioConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
        ]);
    }
    exports.configure = configure;
    var uxRadioConfig = {
        tagName: 'ux-radio',
        properties: {
            checked: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element, _, observerLocator) {
                    return new AuBinding.CheckedObserver(element, uxRadioChangeHandler, observerLocator);
                }
            }
        }
    };
    var uxRadioChangeHandler = {
        subscribe: function (target, callbackOrListener) {
            target.addEventListener('change', callbackOrListener, false);
            return function () {
                target.removeEventListener('change', callbackOrListener, false);
            };
        }
    };
});
