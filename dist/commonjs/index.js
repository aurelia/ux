"use strict";
var aurelia_ux_1 = require('./aurelia-ux');
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
