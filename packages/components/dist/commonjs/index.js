"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
tslib_1.__exportStar(require("@aurelia-ux/card"), exports);
tslib_1.__exportStar(require("@aurelia-ux/button"), exports);
tslib_1.__exportStar(require("@aurelia-ux/checkbox"), exports);
tslib_1.__exportStar(require("@aurelia-ux/chip-input"), exports);
tslib_1.__exportStar(require("@aurelia-ux/grid"), exports);
tslib_1.__exportStar(require("@aurelia-ux/datepicker"), exports);
tslib_1.__exportStar(require("@aurelia-ux/expandable"), exports);
tslib_1.__exportStar(require("@aurelia-ux/form"), exports);
tslib_1.__exportStar(require("@aurelia-ux/icons"), exports);
tslib_1.__exportStar(require("@aurelia-ux/input"), exports);
tslib_1.__exportStar(require("@aurelia-ux/input-info"), exports);
tslib_1.__exportStar(require("@aurelia-ux/list"), exports);
tslib_1.__exportStar(require("@aurelia-ux/modal"), exports);
tslib_1.__exportStar(require("@aurelia-ux/popup"), exports);
tslib_1.__exportStar(require("@aurelia-ux/positioning"), exports);
tslib_1.__exportStar(require("@aurelia-ux/progress"), exports);
tslib_1.__exportStar(require("@aurelia-ux/radio"), exports);
tslib_1.__exportStar(require("@aurelia-ux/switch"), exports);
tslib_1.__exportStar(require("@aurelia-ux/select"), exports);
tslib_1.__exportStar(require("@aurelia-ux/slider"), exports);
tslib_1.__exportStar(require("@aurelia-ux/textarea"), exports);
tslib_1.__exportStar(require("@aurelia-ux/tree-view"), exports);
function configure(config) {
    config
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/expandable'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/icons'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/modal'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/popup'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/positioning'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/progress'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea'))
        .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/tree-view'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map