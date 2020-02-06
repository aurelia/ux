import { UxComponent } from './ux-component';
import { UxTheme } from '../styles/ux-theme';
import { computedFrom } from 'aurelia-binding';

export interface UxInputComponent extends UxComponent {
  theme: UxTheme;
  label: string;
  placeholder: string;

  readonly placeholderMode: boolean;

}
