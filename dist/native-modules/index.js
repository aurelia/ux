import { AureliaUX } from './aurelia-ux';
export function configure(config, callback) {
    config.globalResources([
        './button/ux-button'
    ]);
    var xp = config.container.get(AureliaUX);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(xp))
            .then(function () { return xp.start(config); });
    }
    else {
        xp.use.defaultConfiguration();
        return xp.start(config);
    }
}
