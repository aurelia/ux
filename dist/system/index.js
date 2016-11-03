System.register(['./aurelia-ux'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_ux_1;
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
    exports_1("configure", configure);
    return {
        setters:[
            function (aurelia_ux_1_1) {
                aurelia_ux_1 = aurelia_ux_1_1;
            }],
        execute: function() {
        }
    }
});
