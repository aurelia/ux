import { PLATFORM } from 'aurelia-framework';
export { UxCardTheme } from './ux-card-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/card/ux-card'),
        PLATFORM.moduleName('@aurelia-ux/card/ux-card-header'),
        PLATFORM.moduleName('@aurelia-ux/card/ux-card-action-row'),
        PLATFORM.moduleName('@aurelia-ux/card/ux-card-content'),
        PLATFORM.moduleName('@aurelia-ux/card/ux-card-footer')
    ]);
}
