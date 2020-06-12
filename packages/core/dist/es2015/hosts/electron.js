import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
import { Web } from './web';
import { PLATFORM } from 'aurelia-pal';
let Electron = /** @class */ (() => {
    let Electron = class Electron {
        constructor() {
            this.type = 'electron';
        }
        get isAvailable() {
            const p = PLATFORM.global.process;
            return p && p.versions && p.versions.electron;
        }
        start(config) {
            return Promise.resolve().then(() => config.container.get(Web));
        }
    };
    Electron = __decorate([
        inject(MaterialDesign)
    ], Electron);
    return Electron;
})();
export { Electron };
//# sourceMappingURL=electron.js.map