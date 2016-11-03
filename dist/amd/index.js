define(["require", "exports", './aurelia-ux', './colors/swatches', './button/ux-button-theme', './styles/decorators', './aurelia-ux', './ux-configuration'], function (require, exports, aurelia_ux_1, swatches_1, ux_button_theme_1, decorators_1, aurelia_ux_2, ux_configuration_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.swatches = swatches_1.swatches;
    exports.UxButtonTheme = ux_button_theme_1.UxButtonTheme;
    __export(decorators_1);
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
    exports.UXConfiguration = ux_configuration_1.UXConfiguration;
    function configure(config, callback) {
        config.globalResources([
            './button/ux-button'
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
