"use strict";
var aurelia_xp_1 = require('./aurelia-xp');
function configure(config, callback) {
    config.globalResources([
        './button/xp-button'
    ]);
    var xp = config.container.get(aurelia_xp_1.AureliaXP);
    if (typeof callback === 'function') {
        return callback(xp);
    }
    else {
        xp.use.defaultConfiguration();
        return xp.start();
    }
}
exports.configure = configure;
