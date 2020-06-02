import { UxComponent } from './ux-component';
import { UxTheme } from '../styles/ux-theme';

export type InputVariant = 'filled' | 'outline';

export interface UxInputComponent extends UxComponent {
  theme: UxTheme;
  label: string;
  placeholder: string;

  readonly placeholderMode: boolean;

}
