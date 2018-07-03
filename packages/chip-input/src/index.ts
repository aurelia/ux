import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxTag } from './ux-tag';
import { UxChip } from './ux-chip';
import { UxChipInput } from './ux-chip-input';
import chipCss from './ux-chip.css';
import chipInputCss from './ux-chip-input.css';
import tagCss from './ux-tag.css';

export { UxChipInputTheme } from './ux-chip-input-theme';
export { UxTagTheme } from './ux-tag-theme';
export { UxChipTheme } from './ux-chip-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(tagCss + chipCss + chipInputCss, undefined, undefined, 'ux-chip-input-css');
  config.globalResources([
    UxTag,
    UxChip,
    UxChipInput,
  ]);
}

export { UxChip, UxTag, UxChipInput };
