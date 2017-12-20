import { PLATFORM } from 'aurelia-framework';
export { UxRadioTheme } from './ux-radio-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
    ]);
}
