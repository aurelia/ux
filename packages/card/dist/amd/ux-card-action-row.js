define(["require", "exports", "tslib", "aurelia-templating", "aurelia-pal"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCardActionRow = void 0;
    var UxCardActionRow = /** @class */ (function () {
        function UxCardActionRow() {
        }
        UxCardActionRow = tslib_1.__decorate([
            aurelia_templating_1.customElement('ux-card-action-row'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-card-action-row.html'))
        ], UxCardActionRow);
        return UxCardActionRow;
    }());
    exports.UxCardActionRow = UxCardActionRow;
});
//# sourceMappingURL=ux-card-action-row.js.map