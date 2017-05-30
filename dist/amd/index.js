define(["require", "exports", "aurelia-framework", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./button/ux-button-theme", "./input/ux-input-theme", "./input-info/ux-input-info-theme", "./textarea/ux-textarea-theme", "./form/ux-form-theme", "./form/ux-field-theme", "./chip-input/ux-chip-input-theme", "./chip-input/ux-tag-theme", "./chip-input/ux-chip-theme", "./checkbox/ux-checkbox-theme", "./icons/ux-icon-theme", "./styles/decorators", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_framework_1, aurelia_ux_1, swatches_1, shadows_1, ux_button_theme_1, ux_input_theme_1, ux_input_info_theme_1, ux_textarea_theme_1, ux_form_theme_1, ux_field_theme_1, ux_chip_input_theme_1, ux_tag_theme_1, ux_chip_theme_1, ux_checkbox_theme_1, ux_icon_theme_1, decorators_1, aurelia_ux_2, ux_configuration_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.swatches = swatches_1.swatches;
    exports.shadows = shadows_1.shadows;
    exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
    exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
    exports.UxInputInfoTheme = ux_input_info_theme_1.UxInputInfoTheme;
    exports.UxTextareaTheme = ux_textarea_theme_1.UxTextareaTheme;
    exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
    exports.UxFieldTheme = ux_field_theme_1.UxFieldTheme;
    exports.UxChipInputTheme = ux_chip_input_theme_1.UxChipInputTheme;
    exports.UxTagTheme = ux_tag_theme_1.UxTagTheme;
    exports.UxChipTheme = ux_chip_theme_1.UxChipTheme;
    exports.UxCheckboxTheme = ux_checkbox_theme_1.UxCheckboxTheme;
    exports.UxIconTheme = ux_icon_theme_1.UxIconTheme;
    __export(decorators_1);
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
    exports.UXConfiguration = ux_configuration_1.UXConfiguration;
    function configure(config, callback) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./button/ux-button'),
            aurelia_framework_1.PLATFORM.moduleName('./input/ux-input'),
            aurelia_framework_1.PLATFORM.moduleName('./input-info/ux-input-info'),
            aurelia_framework_1.PLATFORM.moduleName('./textarea/ux-textarea'),
            aurelia_framework_1.PLATFORM.moduleName('./form/ux-form'),
            aurelia_framework_1.PLATFORM.moduleName('./form/ux-field'),
            aurelia_framework_1.PLATFORM.moduleName('./form/ux-submit-attribute'),
            aurelia_framework_1.PLATFORM.moduleName('./chip-input/ux-chip-input'),
            aurelia_framework_1.PLATFORM.moduleName('./chip-input/ux-chip'),
            aurelia_framework_1.PLATFORM.moduleName('./chip-input/ux-tag'),
            aurelia_framework_1.PLATFORM.moduleName('./checkbox/ux-checkbox'),
            aurelia_framework_1.PLATFORM.moduleName('./icons/ux-icon')
        ]);
        var ux = config.container.get(aurelia_ux_1.AureliaUX);
        if (typeof callback === 'function') {
            return Promise.resolve(callback(ux))
                .then(function () { return ux.start(config); });
        }
        else {
            ux.use.defaultConfiguration();
            return ux.start(config);
        }
    }
    exports.configure = configure;
});
