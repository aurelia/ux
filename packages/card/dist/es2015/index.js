import { PLATFORM } from 'aurelia-framework';
export { UxCardTheme } from './ux-card-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/card/ux-card')
    ]);
}
