import { FrameworkConfiguration } from 'aurelia-framework';
import { UxTag } from './ux-tag';
import { UxChip } from './ux-chip';
import { UxChipInput } from './ux-chip-input';

export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxTagTheme } from './ux-tag-theme';
export { UxChipTheme } from './ux-chip-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxTag,
    UxChip,
    UxChipInput,
  ]);
}

export { UxChip, UxTag, UxChipInput };
