define(["require", "exports", "tslib", "aurelia-templating", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCardFooter = void 0;
    var UxCardFooter = /** @class */ (function () {
        function UxCardFooter() {
        }
        UxCardFooter = tslib_1.__decorate([
            aurelia_templating_1.customElement('ux-card-footer'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-card-footer.html'))
        ], UxCardFooter);
        return UxCardFooter;
    }());
    exports.UxCardFooter = UxCardFooter;
});
//# sourceMappingURL=ux-card-footer.js.map