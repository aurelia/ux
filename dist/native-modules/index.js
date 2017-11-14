import { AureliaUX } from './aurelia-ux';
export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';
export { PaperRipple } from './effects/paper-ripple';
export { normalizeBooleanAttribute } from './components/html-attributes';
export { StyleEngine } from './styles/style-engine';
export { AureliaUX } from './aurelia-ux';
export function configure(config, callback) {
    var ux = config.container.get(AureliaUX);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(ux))
            .then(function () { return ux.start(config); });
    }
    else {
        return ux.start(config);
    }
}
