var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { Loader } from 'aurelia-loader';
import { PLATFORM } from 'aurelia-pal';
import { GlobalStyleEngine } from './styles/global-style-engine';
let UXConfiguration = class UXConfiguration {
    constructor(loader, globalStyleEngine) {
        this.loader = loader;
        this.globalStyleEngine = globalStyleEngine;
        this.logger = getLogger('aurelia-ux');
    }
    defaultConfiguration() {
        this.cssNormalize();
        return this;
    }
    cssNormalize() {
        PLATFORM.moduleName('./styles/normalize.css');
        const fullCssPath = '@aurelia-ux/core/styles/normalize.css';
        this
            .loader
            .loadText(fullCssPath)
            .catch(err => {
            this.logger.warn('Aurelia-UX Core failed to load normalize.css, some visual errors may appear.', err);
        })
            .then(text => {
            if (text) {
                this.globalStyleEngine.addOrUpdateGlobalStyle(fullCssPath, text);
            }
        });
        return this;
    }
};
UXConfiguration = __decorate([
    inject(Loader, GlobalStyleEngine)
], UXConfiguration);
export { UXConfiguration };
//# sourceMappingURL=ux-configuration.js.map