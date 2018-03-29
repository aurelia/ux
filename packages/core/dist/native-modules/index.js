import { PLATFORM } from 'aurelia-framework';
import { AureliaUX } from './aurelia-ux';
export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';
export { PaperRipple } from './effects/paper-ripple';
export { normalizeBooleanAttribute } from './components/html-attributes';
export { StyleEngine } from './styles/style-engine';
export { GlobalStyleEngine } from './styles/global-style-engine';
export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';
export function configure(config, callback) {
    var ux = config.container.get(AureliaUX);
    config.globalResources([
        PLATFORM.moduleName('./components/boolean-attr-binding-behavior')
    ]);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(ux))
            .then(function () { return ux.start(config); });
    }
    else {
        ux.use.defaultConfiguration();
        return ux.start(config);
    }
}
