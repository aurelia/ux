import { AureliaXP } from './aurelia-xp';
export { AureliaXP } from './aurelia-xp';
export function configure(config, callback) {
    config.globalResources([
        './button/xp-button'
    ]);
    let xp = config.container.get(AureliaXP);
    if (typeof callback === 'function') {
        return callback(xp);
    }
    else {
        xp.use.defaultConfiguration();
        return xp.start();
    }
}
