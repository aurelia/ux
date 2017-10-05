import { UxChipTheme } from './ux-chip-theme';
import { UxTagTheme } from './ux-tag-theme';

export interface UxChipInputTheme {
  background?: string;
  foreground?: string;

  backgroundDisabled?: string;
  foregroundDisabled?: string;

  errorAccent?: string;

  chipTheme?: UxChipTheme;
  tagTheme?: UxTagTheme;
}
