import { AureliaXP } from './aurelia-xp';
export function configure(config, callback) {
    config.globalResources([
        './button/xp-button'
    ]);
    var xp = config.container.get(AureliaXP);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(xp))
            .then(function () { return xp.start(config); });
    }
    else {
        xp.use.defaultConfiguration();
        return xp.start(config);
    }
}
