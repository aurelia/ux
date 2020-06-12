import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
var Web = /** @class */ (function () {
    function Web(design) {
        this.design = design;
        this.type = 'web';
        this.isAvailable = true;
    }
    Web.prototype.start = function () {
        var _this = this;
        return Promise.resolve().then(function () { return _this; });
    };
    Web = __decorate([
        inject(MaterialDesign)
    ], Web);
    return Web;
}());
export { Web };
//# sourceMappingURL=web.js.map