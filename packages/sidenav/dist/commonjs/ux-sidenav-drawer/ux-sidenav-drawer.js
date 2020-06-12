"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxSidenavDrawer = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var core_1 = require("@aurelia-ux/core");
var ux_default_sidenav_configuration_1 = require("../ux-default-sidenav-configuration");
var UxSidenavDrawer = /** @class */ (function () {
    function UxSidenavDrawer(element, defaultConfig) {
        this.element = element;
        this.defaultConfig = defaultConfig;
        this.side = 'left';
        this.openBoolean = false;
        this.open = false;
        this.over = this.defaultConfig.over;
        this.backdrop = this.defaultConfig.backdrop;
    }
    UxSidenavDrawer_1 = UxSidenavDrawer;
    UxSidenavDrawer.prototype.openChanged = function () {
        this.openBoolean = core_1.normalizeBooleanAttribute('open', this.open);
        this.element.dispatchEvent(new CustomEvent(UxSidenavDrawer_1.OPEN_CHANGED_EVENT, { detail: this.openBoolean }));
    };
    UxSidenavDrawer.prototype.isOver = function () {
        return core_1.normalizeBooleanAttribute('over', this.over);
    };
    UxSidenavDrawer.prototype.isBackdrop = function () {
        return core_1.normalizeBooleanAttribute('backdrop', this.backdrop);
    };
    UxSidenavDrawer.prototype.toggle = function () {
        this.open = !this.openBoolean;
    };
    var UxSidenavDrawer_1;
    UxSidenavDrawer.OPEN_CHANGED_EVENT = 'open-changed';
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenavDrawer.prototype, "side", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenavDrawer.prototype, "open", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenavDrawer.prototype, "over", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenavDrawer.prototype, "backdrop", void 0);
    UxSidenavDrawer = UxSidenavDrawer_1 = tslib_1.__decorate([
        aurelia_framework_1.inject(Element, ux_default_sidenav_configuration_1.UxDefaultSidenavConfiguration),
        aurelia_framework_1.customElement('ux-sidenav-drawer'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav-drawer.html'))
    ], UxSidenavDrawer);
    return UxSidenavDrawer;
}());
exports.UxSidenavDrawer = UxSidenavDrawer;
//# sourceMappingURL=ux-sidenav-drawer.js.map