import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { IOSDesign } from '../designs/ios-design';
let IOS = /** @class */ (() => {
    let IOS = class IOS {
        constructor(design) {
            this.design = design;
            this.type = 'ios';
        }
    };
    IOS = __decorate([
        inject(IOSDesign)
    ], IOS);
    return IOS;
})();
export { IOS };
//# sourceMappingURL=ios.js.map