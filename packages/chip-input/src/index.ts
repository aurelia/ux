/// <reference path="html.d.ts" />
import { FrameworkConfiguration } from 'aurelia-framework';
import { UxChip } from './ux-chip';
import { UxChipInput } from './ux-chip-input';

export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxChipTheme } from './ux-chip-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxChipInput,
    UxChip
  ]);
}
