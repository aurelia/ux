"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var tslib_1 = require("tslib");
var interfaces_1 = require("./interfaces");
function configure(frameworkConfig, callback) {
    if (typeof callback === 'function') {
        var config = frameworkConfig.container.get(interfaces_1.UxPositioningConfiguration);
        callback(config);
    }
}
exports.configure = configure;
tslib_1.__exportStar(require("./interfaces"), exports);
tslib_1.__exportStar(require("./ux-positioning"), exports);
//# sourceMappingURL=index.js.map