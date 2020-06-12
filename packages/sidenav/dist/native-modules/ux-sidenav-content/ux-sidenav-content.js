import { __decorate } from "tslib";
import { useView, customElement, PLATFORM, inject } from "aurelia-framework";
var UxSidenavContent = /** @class */ (function () {
    function UxSidenavContent(element) {
        this.element = element;
    }
    UxSidenavContent = __decorate([
        inject(Element),
        customElement('ux-sidenav-content'),
        useView(PLATFORM.moduleName('./ux-sidenav-content.html'))
    ], UxSidenavContent);
    return UxSidenavContent;
}());
export { UxSidenavContent };
//# sourceMappingURL=ux-sidenav-content.js.map