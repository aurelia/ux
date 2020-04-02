"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ok_modal_attribute_1 = require("./resources/ok-modal-attribute");
var dismiss_modal_attribute_1 = require("./resources/dismiss-modal-attribute");
var attach_focus_attribute_1 = require("./resources/attach-focus-attribute");
var modal_configuration_1 = require("./modal-configuration");
var aurelia_framework_1 = require("aurelia-framework");
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
exports.configure = configure;
var ux_modal_theme_1 = require("./ux-modal-theme");
exports.UxModalTheme = ux_modal_theme_1.UxModalTheme;
var ux_modal_1 = require("./ux-modal");
exports.UxModal = ux_modal_1.UxModal;
__export(require("./ux-modal-service"));
__export(require("./modal-configuration"));
