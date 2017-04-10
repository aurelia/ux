define(["require", "exports", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./button/ux-button-theme", "./input/ux-input-theme", "./input-info/ux-input-info-theme", "./textarea/ux-textarea-theme", "./form/ux-form-theme", "./form/ux-field-theme", "./chip-input/ux-chip-input-theme", "./chip-input/ux-tag-theme", "./chip-input/ux-chip-theme", "./styles/decorators", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_ux_1, swatches_1, shadows_1, ux_button_theme_1, ux_input_theme_1, ux_input_info_theme_1, ux_textarea_theme_1, ux_form_theme_1, ux_field_theme_1, ux_chip_input_theme_1, ux_tag_theme_1, ux_chip_theme_1, decorators_1, aurelia_ux_2, ux_configuration_1) {
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
    __export(decorators_1);
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
    exports.UXConfiguration = ux_configuration_1.UXConfiguration;
    function configure(config, callback) {
        config.globalResources([
            './button/ux-button',
            './input/ux-input',
            './input-info/ux-input-info',
            './textarea/ux-textarea',
            './form/ux-form',
            './form/ux-field',
            './form/ux-submit-attribute',
            './chip-input/ux-chip-input',
            './chip-input/ux-chip',
            './chip-input/ux-tag'
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
