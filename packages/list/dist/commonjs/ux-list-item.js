"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxListItem = void 0;
var tslib_1 = require("tslib");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var UxListItem = /** @class */ (function () {
    function UxListItem() {
        this.theme = null;
    }
    tslib_1.__decorate([
        aurelia_templating_1.bindable
    ], UxListItem.prototype, "theme", void 0);
    UxListItem = tslib_1.__decorate([
        aurelia_templating_1.customElement('ux-list-item'),
        aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-list-item.html'))
    ], UxListItem);
    return UxListItem;
}());
exports.UxListItem = UxListItem;
//# sourceMappingURL=ux-list-item.js.map