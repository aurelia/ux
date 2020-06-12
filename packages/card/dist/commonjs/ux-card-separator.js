"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxCardSeparator = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_1 = require("aurelia-templating");
var UxCardSeparator = /** @class */ (function () {
    function UxCardSeparator(element) {
        this.element = element;
    }
    UxCardSeparator.prototype.bind = function () {
        if (this.element.hasAttribute('no-margin')) {
            this.element.classList.add('ux-card__separator--no-margin');
        }
    };
    UxCardSeparator = tslib_1.__decorate([
        aurelia_framework_1.inject(Element),
        aurelia_templating_1.customElement('ux-card-separator'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-card-separator.html'))
    ], UxCardSeparator);
    return UxCardSeparator;
}());
exports.UxCardSeparator = UxCardSeparator;
//# sourceMappingURL=ux-card-separator.js.map