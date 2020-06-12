import { PLATFORM } from 'aurelia-framework';
import { UxDefaultLookupConfiguration } from './ux-lookup-configuration';
export { UxLookup } from './ux-lookup';
export { UxLookupTheme } from './ux-lookup-theme';
export function configure(frameworkConfig, callback) {
    frameworkConfig.globalResources([
        PLATFORM.moduleName('./ux-lookup')
    ]);
    if (typeof callback === 'function') {
        var config = frameworkConfig.container.get(UxDefaultLookupConfiguration);
        callback(config);
    }
}
//# sourceMappingURL=index.js.map