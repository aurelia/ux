System.register(["./resources/ok-modal-attribute", "./resources/dismiss-modal-attribute", "./resources/attach-focus-attribute", "./modal-configuration", "aurelia-framework", "./ux-modal-theme", "./ux-modal", "./ux-modal-service"], function (exports_1, context_1) {
    "use strict";
    var ok_modal_attribute_1, dismiss_modal_attribute_1, attach_focus_attribute_1, modal_configuration_1, aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(frameworkConfig, callback) {
        frameworkConfig.globalResources([
            attach_focus_attribute_1.AttachFocusAttribute,
            dismiss_modal_attribute_1.DismissModalAttribute,
            ok_modal_attribute_1.OkModalAttribute,
            aurelia_framework_1.PLATFORM.moduleName('./ux-modal'),
        ]);
        var config = frameworkConfig.container.get(modal_configuration_1.DefaultModalConfiguration);
        if (typeof callback === 'function') {
            callback(config);
        }
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true,
        "UxModalTheme": true,
        "UxModal": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (ok_modal_attribute_1_1) {
                ok_modal_attribute_1 = ok_modal_attribute_1_1;
            },
            function (dismiss_modal_attribute_1_1) {
                dismiss_modal_attribute_1 = dismiss_modal_attribute_1_1;
            },
            function (attach_focus_attribute_1_1) {
                attach_focus_attribute_1 = attach_focus_attribute_1_1;
            },
            function (modal_configuration_1_1) {
                modal_configuration_1 = modal_configuration_1_1;
                exportStar_1(modal_configuration_1_1);
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_modal_theme_1_1) {
                exports_1({
                    "UxModalTheme": ux_modal_theme_1_1["UxModalTheme"]
                });
            },
            function (ux_modal_1_1) {
                exports_1({
                    "UxModal": ux_modal_1_1["UxModal"]
                });
            },
            function (ux_modal_service_1_1) {
                exportStar_1(ux_modal_service_1_1);
            }
        ],
        execute: function () {
        }
    };
});
