define(["require", "exports", "tslib", "./resources/ok-modal-attribute", "./resources/dismiss-modal-attribute", "./resources/attach-focus-attribute", "./ux-modal-configuration", "aurelia-framework", "./ux-modal-theme", "./ux-modal", "./ux-modal-service", "./ux-modal-configuration"], function (require, exports, tslib_1, ok_modal_attribute_1, dismiss_modal_attribute_1, attach_focus_attribute_1, ux_modal_configuration_1, aurelia_framework_1, ux_modal_theme_1, ux_modal_1, ux_modal_service_1, ux_modal_configuration_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    function configure(frameworkConfig, callback) {
        frameworkConfig.globalResources([
            attach_focus_attribute_1.AttachFocusAttribute,
            dismiss_modal_attribute_1.DismissModalAttribute,
            ok_modal_attribute_1.OkModalAttribute,
            aurelia_framework_1.PLATFORM.moduleName('./ux-modal'),
        ]);
        if (typeof callback === 'function') {
            var config = frameworkConfig.container.get(ux_modal_configuration_1.UxDefaultModalConfiguration);
            callback(config);
        }
    }
    exports.configure = configure;
    Object.defineProperty(exports, "UxModalTheme", { enumerable: true, get: function () { return ux_modal_theme_1.UxModalTheme; } });
    Object.defineProperty(exports, "UxModal", { enumerable: true, get: function () { return ux_modal_1.UxModal; } });
    tslib_1.__exportStar(ux_modal_service_1, exports);
    tslib_1.__exportStar(ux_modal_configuration_2, exports);
});
//# sourceMappingURL=index.js.map