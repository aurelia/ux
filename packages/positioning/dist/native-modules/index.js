import { UxPositioningConfiguration } from './interfaces';
export function configure(frameworkConfig, callback) {
    if (typeof callback === 'function') {
        var config = frameworkConfig.container.get(UxPositioningConfiguration);
        callback(config);
    }
}
export * from './interfaces';
export * from './ux-positioning';
//# sourceMappingURL=index.js.map