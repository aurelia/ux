"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var aurelia_ux_1 = require('./aurelia-ux');
var swatches_1 = require('./colors/swatches');
exports.swatches = swatches_1.swatches;
var shadows_1 = require('./colors/shadows');
exports.shadows = shadows_1.shadows;
var ux_button_theme_1 = require('./button/ux-button-theme');
exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
var ux_input_theme_1 = require('./input/ux-input-theme');
exports.UxInputTheme = ux_input_theme_1.UxInputTheme;
var ux_input_info_theme_1 = require('./input-info/ux-input-info-theme');
exports.UxInputInfoTheme = ux_input_info_theme_1.UxInputInfoTheme;
var ux_textarea_theme_1 = require('./textarea/ux-textarea-theme');
exports.UxTextareaTheme = ux_textarea_theme_1.UxTextareaTheme;
__export(require('./styles/decorators'));
var aurelia_ux_2 = require('./aurelia-ux');
exports.AureliaUX = aurelia_ux_2.AureliaUX;
var ux_configuration_1 = require('./ux-configuration');
exports.UXConfiguration = ux_configuration_1.UXConfiguration;
function configure(config, callback) {
    config.globalResources([
        './button/ux-button',
        './input/ux-input',
        './input-info/ux-input-info',
        './textarea/ux-textarea'
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
