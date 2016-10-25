"use strict";
var aurelia_xp_1 = require('./aurelia-xp');
var aurelia_xp_2 = require('./aurelia-xp');
exports.AureliaXP = aurelia_xp_2.AureliaXP;
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
