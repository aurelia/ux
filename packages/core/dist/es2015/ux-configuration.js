import { __decorate } from "tslib";
import { inject } from 'aurelia-dependency-injection';
import { Loader } from 'aurelia-loader';
import { GlobalStyleEngine } from './styles/global-style-engine';
import './styles/normalize.css';
let UXConfiguration = /** @class */ (() => {
    let UXConfiguration = class UXConfiguration {
        defaultConfiguration() {
            return this;
        }
    };
    UXConfiguration = __decorate([
        inject(Loader, GlobalStyleEngine)
    ], UXConfiguration);
    return UXConfiguration;
})();
export { UXConfiguration };
//# sourceMappingURL=ux-configuration.js.map