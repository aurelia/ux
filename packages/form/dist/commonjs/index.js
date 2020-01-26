"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_form_1 = require("./ux-form");
exports.UxForm = ux_form_1.UxForm;
var ux_field_1 = require("./ux-field");
exports.UxField = ux_field_1.UxField;
var ux_submit_attribute_1 = require("./ux-submit-attribute");
exports.UxSubmitCustomAttribute = ux_submit_attribute_1.UxSubmitCustomAttribute;
var ux_form_theme_1 = require("./ux-form-theme");
exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-form'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-field'),
        ux_submit_attribute_1.UxSubmitCustomAttribute
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map