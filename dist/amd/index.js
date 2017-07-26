define(["require", "exports", "aurelia-framework", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./button/ux-button-theme", "./input/ux-input-theme", "./input-info/ux-input-info-theme", "./textarea/ux-textarea-theme", "./form/ux-form-theme", "./form/ux-field-theme", "./chip-input/ux-chip-input-theme", "./chip-input/ux-tag-theme", "./chip-input/ux-chip-theme", "./checkbox/ux-checkbox-theme", "./icons/ux-icon-theme", "./list/ux-list-theme", "./list/ux-list-item-theme", "./button/ux-button", "./input/ux-input", "./input-info/ux-input-info", "./textarea/ux-textarea", "./form/ux-form", "./form/ux-field", "./chip-input/ux-chip-input", "./chip-input/ux-tag", "./chip-input/ux-chip", "./checkbox/ux-checkbox", "./icons/ux-icon", "./form/ux-submit-attribute", "./list/ux-list", "./list/ux-list-item", "./styles/style-engine", "./styles/decorators", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_framework_1, aurelia_ux_1, swatches_1, shadows_1, ux_button_theme_1, ux_input_theme_1, ux_input_info_theme_1, ux_textarea_theme_1, ux_form_theme_1, ux_field_theme_1, ux_chip_input_theme_1, ux_tag_theme_1, ux_chip_theme_1, ux_checkbox_theme_1, ux_icon_theme_1, ux_list_theme_1, ux_list_item_theme_1, ux_button_1, ux_input_1, ux_input_info_1, ux_textarea_1, ux_form_1, ux_field_1, ux_chip_input_1, ux_tag_1, ux_chip_1, ux_checkbox_1, ux_icon_1, ux_submit_attribute_1, ux_list_1, ux_list_item_1, style_engine_1, decorators_1, aurelia_ux_2, ux_configuration_1) {
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
    exports.UxListTheme = ux_list_theme_1.UxListTheme;
    exports.UxListItemTheme = ux_list_item_theme_1.UxListItemTheme;
    exports.UxButton = ux_button_1.UxButton;
    exports.UxInput = ux_input_1.UxInput;
    exports.UxInputInfo = ux_input_info_1.UxInputInfo;
    exports.UxTextarea = ux_textarea_1.UxTextarea;
    exports.UxForm = ux_form_1.UxForm;
    exports.UxField = ux_field_1.UxField;
    exports.UxChipInput = ux_chip_input_1.UxChipInput;
    exports.UxTag = ux_tag_1.UxTag;
    exports.UxChip = ux_chip_1.UxChip;
    exports.UxCheckbox = ux_checkbox_1.UxCheckbox;
    exports.UxIcon = ux_icon_1.UxIcon;
    exports.UxSubmitCustomAttribute = ux_submit_attribute_1.UxSubmitCustomAttribute;
    exports.UxList = ux_list_1.UxList;
    exports.UxListItem = ux_list_item_1.UxListItem;
    exports.StyleEngine = style_engine_1.StyleEngine;
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
            aurelia_framework_1.PLATFORM.moduleName('./icons/ux-icon'),
            aurelia_framework_1.PLATFORM.moduleName('./list/ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('./list/ux-list-item')
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
