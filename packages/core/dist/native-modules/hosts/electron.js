import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
import { Web } from './web';
import { PLATFORM } from 'aurelia-pal';
var Electron = /** @class */ (function () {
    function Electron() {
        this.type = 'electron';
    }
    Object.defineProperty(Electron.prototype, "isAvailable", {
        get: function () {
            var p = PLATFORM.global.process;
            return p && p.versions && p.versions.electron;
        },
        enumerable: false,
        configurable: true
    });
    Electron.prototype.start = function (config) {
        return Promise.resolve().then(function () { return config.container.get(Web); });
    };
    Electron = __decorate([
        inject(MaterialDesign)
    ], Electron);
    return Electron;
}());
export { Electron };
//# sourceMappingURL=electron.js.map