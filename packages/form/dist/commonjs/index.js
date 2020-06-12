"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxSubmitCustomAttribute = exports.UxField = exports.UxForm = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_form_1 = require("./ux-form");
Object.defineProperty(exports, "UxForm", { enumerable: true, get: function () { return ux_form_1.UxForm; } });
var ux_field_1 = require("./ux-field");
Object.defineProperty(exports, "UxField", { enumerable: true, get: function () { return ux_field_1.UxField; } });
var ux_submit_attribute_1 = require("./ux-submit-attribute");
Object.defineProperty(exports, "UxSubmitCustomAttribute", { enumerable: true, get: function () { return ux_submit_attribute_1.UxSubmitCustomAttribute; } });
var ux_form_theme_1 = require("./ux-form-theme");
Object.defineProperty(exports, "UxFormTheme", { enumerable: true, get: function () { return ux_form_theme_1.UxFormTheme; } });
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-form'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-field'),
        ux_submit_attribute_1.UxSubmitCustomAttribute
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map