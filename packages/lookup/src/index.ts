import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxDefaultLookupConfiguration } from './ux-lookup-configuration';

export { UxLookup } from './ux-lookup';
export { UxLookupTheme } from './ux-lookup-theme';

export function configure(frameworkConfig: FrameworkConfiguration, callback?: (config: UxDefaultLookupConfiguration) => void) {
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./ux-lookup')
  ]);
  if (typeof callback === 'function') {
    const config = frameworkConfig.container.get(UxDefaultLookupConfiguration);
    callback(config);
  }
}
