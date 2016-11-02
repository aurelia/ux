"use strict";
var aurelia_ux_1 = require('./aurelia-ux');
function configure(config, callback) {
    config.globalResources([
        './button/ux-button'
    ]);
    var xp = config.container.get(aurelia_ux_1.AureliaUX);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(xp))
            .then(function () { return xp.start(config); });
    }
    else {
        xp.use.defaultConfiguration();
        return xp.start(config);
    }
}
exports.configure = configure;
