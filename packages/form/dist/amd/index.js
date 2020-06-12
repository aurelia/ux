define(["require", "exports", "aurelia-framework", "./ux-form", "./ux-field", "./ux-submit-attribute", "./ux-form-theme"], function (require, exports, aurelia_framework_1, ux_form_1, ux_field_1, ux_submit_attribute_1, ux_form_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxSubmitCustomAttribute = exports.UxField = exports.UxForm = void 0;
    Object.defineProperty(exports, "UxForm", { enumerable: true, get: function () { return ux_form_1.UxForm; } });
    Object.defineProperty(exports, "UxField", { enumerable: true, get: function () { return ux_field_1.UxField; } });
    Object.defineProperty(exports, "UxSubmitCustomAttribute", { enumerable: true, get: function () { return ux_submit_attribute_1.UxSubmitCustomAttribute; } });
    Object.defineProperty(exports, "UxFormTheme", { enumerable: true, get: function () { return ux_form_theme_1.UxFormTheme; } });
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-form'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-field'),
            ux_submit_attribute_1.UxSubmitCustomAttribute
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map