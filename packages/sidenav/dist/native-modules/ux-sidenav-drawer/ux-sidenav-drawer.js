import { __decorate } from "tslib";
import { useView, customElement, PLATFORM, inject, bindable } from "aurelia-framework";
import { normalizeBooleanAttribute } from "@aurelia-ux/core";
import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";
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
        this.openBoolean = normalizeBooleanAttribute('open', this.open);
        this.element.dispatchEvent(new CustomEvent(UxSidenavDrawer_1.OPEN_CHANGED_EVENT, { detail: this.openBoolean }));
    };
    UxSidenavDrawer.prototype.isOver = function () {
        return normalizeBooleanAttribute('over', this.over);
    };
    UxSidenavDrawer.prototype.isBackdrop = function () {
        return normalizeBooleanAttribute('backdrop', this.backdrop);
    };
    UxSidenavDrawer.prototype.toggle = function () {
        this.open = !this.openBoolean;
    };
    var UxSidenavDrawer_1;
    UxSidenavDrawer.OPEN_CHANGED_EVENT = 'open-changed';
    __decorate([
        bindable
    ], UxSidenavDrawer.prototype, "side", void 0);
    __decorate([
        bindable
    ], UxSidenavDrawer.prototype, "open", void 0);
    __decorate([
        bindable
    ], UxSidenavDrawer.prototype, "over", void 0);
    __decorate([
        bindable
    ], UxSidenavDrawer.prototype, "backdrop", void 0);
    UxSidenavDrawer = UxSidenavDrawer_1 = __decorate([
        inject(Element, UxDefaultSidenavConfiguration),
        customElement('ux-sidenav-drawer'),
        useView(PLATFORM.moduleName('./ux-sidenav-drawer.html'))
    ], UxSidenavDrawer);
    return UxSidenavDrawer;
}());
export { UxSidenavDrawer };
//# sourceMappingURL=ux-sidenav-drawer.js.map