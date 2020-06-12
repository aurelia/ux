define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-radio-theme", "./ux-radio"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_radio_theme_1, ux_radio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxRadioTheme", { enumerable: true, get: function () { return ux_radio_theme_1.UxRadioTheme; } });
    Object.defineProperty(exports, "UxRadio", { enumerable: true, get: function () { return ux_radio_1.UxRadio; } });
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxRadioConfig);
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-radio'));
    }
    exports.configure = configure;
    var uxRadioConfig = {
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
});
//# sourceMappingURL=index.js.map