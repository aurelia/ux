import { PLATFORM } from 'aurelia-framework';
export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxTagTheme } from './ux-tag-theme';
export { UxChipTheme } from './ux-chip-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip-input'),
        PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip')
    ]);
}
