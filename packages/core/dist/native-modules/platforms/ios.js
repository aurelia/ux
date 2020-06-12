import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { IOSDesign } from '../designs/ios-design';
var IOS = /** @class */ (function () {
    function IOS(design) {
        this.design = design;
        this.type = 'ios';
    }
    IOS = __decorate([
        inject(IOSDesign)
    ], IOS);
    return IOS;
}());
export { IOS };
//# sourceMappingURL=ios.js.map