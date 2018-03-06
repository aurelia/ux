import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxTagTheme } from './ux-tag-theme';
export { UxChipTheme } from './ux-chip-theme';
export { UxChipInput } from './ux-chip-input';
export { UxChip } from './ux-chip';
export { UxTag } from './ux-tag';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip-input'),
    PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip'),
    PLATFORM.moduleName('@aurelia-ux/chip-input/ux-tag')
  ]);
}
