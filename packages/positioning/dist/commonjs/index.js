"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
function configure(frameworkConfig, callback) {
    // config.globalResources([
    //   PLATFORM.moduleName('@aurelia-ux/boilerplate/ux-boilerplate')
    // ]);
    if (typeof callback === 'function') {
        var config = frameworkConfig.container.get(interfaces_1.UxPositioningConfiguration);
        callback(config);
    }
}
exports.configure = configure;
__export(require("./interfaces"));
__export(require("./ux-positioning"));
