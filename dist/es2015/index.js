import { AureliaUX } from './aurelia-ux';
export function configure(config, callback) {
    config.globalResources([
        './button/ux-button'
    ]);
    var ux = config.container.get(AureliaUX);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(ux))
            .then(function () { return ux.start(config); });
    }
    else {
        ux.use.defaultConfiguration();
        return ux.start(config);
    }
}
