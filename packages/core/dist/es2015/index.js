import { BindingBehaviorResource } from 'aurelia-framework';
import { AureliaUX } from './aurelia-ux';
import { BooleanBB } from './components/boolean-attr-binding-behavior';
export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { processDesignAttributes } from './designs/design-attributes';
export { PaperRipple } from './effects/paper-ripple';
export { normalizeBooleanAttribute } from './components/html-attributes';
export { StyleEngine } from './styles/style-engine';
export { GlobalStyleEngine } from './styles/global-style-engine';
export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';
let uxCorePromise;
export function configure(config, callback) {
    if (uxCorePromise) {
        return uxCorePromise;
    }
    const ux = config.container.get(AureliaUX);
    const boolAttr = new BindingBehaviorResource('');
    boolAttr.initialize(config.container, BooleanBB);
    boolAttr.register(config.aurelia.resources, 'booleanAttr');
    if (typeof callback === 'function') {
        return uxCorePromise = Promise.resolve(callback(ux))
            .then(() => ux.start(config));
    }
    else {
        ux.use.defaultConfiguration();
        return uxCorePromise = ux.start(config);
    }
}
//# sourceMappingURL=index.js.map