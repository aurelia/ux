define(["require", "exports", "tslib", "aurelia-framework"], function (require, exports, tslib_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxSidenavContent = void 0;
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
});
//# sourceMappingURL=ux-sidenav-content.js.map