define(["require", "exports", "aurelia-framework", "./ux-form", "./ux-field", "./ux-submit-attribute", "./ux-form-theme"], function (require, exports, aurelia_framework_1, ux_form_1, ux_field_1, ux_submit_attribute_1, ux_form_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxForm = ux_form_1.UxForm;
    exports.UxField = ux_field_1.UxField;
    exports.UxSubmitCustomAttribute = ux_submit_attribute_1.UxSubmitCustomAttribute;
    exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
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