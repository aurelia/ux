import { UxComponent } from './ux-component';
import { UxTheme } from '../styles/ux-theme';
export interface UxInputComponent extends UxComponent {
    theme: UxTheme;
    label: string;
    placeholder: string;
    readonly placeholderMode: boolean;
}
