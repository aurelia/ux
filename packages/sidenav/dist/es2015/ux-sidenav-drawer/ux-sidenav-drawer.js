import { __decorate } from "tslib";
import { useView, customElement, PLATFORM, inject, bindable } from "aurelia-framework";
import { normalizeBooleanAttribute } from "@aurelia-ux/core";
import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";
let UxSidenavDrawer = /** @class */ (() => {
    var UxSidenavDrawer_1;
    let UxSidenavDrawer = UxSidenavDrawer_1 = class UxSidenavDrawer {
        constructor(element, defaultConfig) {
            this.element = element;
            this.defaultConfig = defaultConfig;
            this.side = 'left';
            this.openBoolean = false;
            this.open = false;
            this.over = this.defaultConfig.over;
            this.backdrop = this.defaultConfig.backdrop;
        }
        openChanged() {
            this.openBoolean = normalizeBooleanAttribute('open', this.open);
            this.element.dispatchEvent(new CustomEvent(UxSidenavDrawer_1.OPEN_CHANGED_EVENT, { detail: this.openBoolean }));
        }
        isOver() {
            return normalizeBooleanAttribute('over', this.over);
        }
        isBackdrop() {
            return normalizeBooleanAttribute('backdrop', this.backdrop);
        }
        toggle() {
            this.open = !this.openBoolean;
        }
    };
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
})();
export { UxSidenavDrawer };
//# sourceMappingURL=ux-sidenav-drawer.js.map