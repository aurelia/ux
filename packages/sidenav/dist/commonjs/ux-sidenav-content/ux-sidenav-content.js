"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxSidenavContent = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var UxSidenavContent = /** @class */ (function () {
    function UxSidenavContent(element) {
        this.element = element;
    }
    UxSidenavContent = tslib_1.__decorate([
        aurelia_framework_1.inject(Element),
        aurelia_framework_1.customElement('ux-sidenav-content'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav-content.html'))
    ], UxSidenavContent);
    return UxSidenavContent;
}());
exports.UxSidenavContent = UxSidenavContent;
//# sourceMappingURL=ux-sidenav-content.js.map