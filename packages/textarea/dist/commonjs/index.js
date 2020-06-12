"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_binding_1 = require("aurelia-binding");
var core_1 = require("@aurelia-ux/core");
var ux_textarea_theme_1 = require("./ux-textarea-theme");
Object.defineProperty(exports, "UxTextAreaTheme", { enumerable: true, get: function () { return ux_textarea_theme_1.UxTextAreaTheme; } });
var ux_textarea_1 = require("./ux-textarea");
Object.defineProperty(exports, "UxTextArea", { enumerable: true, get: function () { return ux_textarea_1.UxTextArea; } });
function configure(config) {
    config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-textarea'));
}
exports.configure = configure;
var uxTextAreaConfig = {
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
//# sourceMappingURL=index.js.map