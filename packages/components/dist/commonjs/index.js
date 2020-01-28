"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("@aurelia-ux/card"));
__export(require("@aurelia-ux/button"));
__export(require("@aurelia-ux/checkbox"));
__export(require("@aurelia-ux/chip-input"));
__export(require("@aurelia-ux/grid"));
__export(require("@aurelia-ux/datepicker"));
__export(require("@aurelia-ux/form"));
__export(require("@aurelia-ux/input"));
__export(require("@aurelia-ux/input-info"));
__export(require("@aurelia-ux/list"));
__export(require("@aurelia-ux/radio"));
__export(require("@aurelia-ux/textarea"));
__export(require("@aurelia-ux/switch"));
__export(require("@aurelia-ux/select"));
__export(require("@aurelia-ux/slider"));
function configure(config) {
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select'));
    config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider'));
}
exports.configure = configure;
//# sourceMappingURL=index.js.map