define(["require", "exports", "tslib", "aurelia-templating", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCardContent = void 0;
    var UxCardContent = /** @class */ (function () {
        function UxCardContent() {
        }
        UxCardContent = tslib_1.__decorate([
            aurelia_templating_1.customElement('ux-card-content'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-card-content.html'))
        ], UxCardContent);
        return UxCardContent;
    }());
    exports.UxCardContent = UxCardContent;
});
//# sourceMappingURL=ux-card-content.js.map