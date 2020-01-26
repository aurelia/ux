import { PLATFORM } from 'aurelia-framework';
import { UxChip } from './ux-chip';
import { UxChipInput } from './ux-chip-input';
export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxChipTheme } from './ux-chip-theme';
export { UxChip, UxChipInput };
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-chip-input'),
        PLATFORM.moduleName('./ux-chip')
    ]);
}
//# sourceMappingURL=index.js.map