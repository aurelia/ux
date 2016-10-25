define(["require", "exports", './aurelia-xp', './aurelia-xp'], function (require, exports, aurelia_xp_1, aurelia_xp_2) {
    "use strict";
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
});
