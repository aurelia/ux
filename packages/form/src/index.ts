import { FrameworkConfiguration, DOM } from 'aurelia-framework';
import { UxField } from './ux-field';
import { UxForm } from './ux-form';
import { UxSubmitCustomAttribute } from './ux-submit-attribute';
import css from './ux-form.css';

export { UxFormTheme } from './ux-form-theme';

export function configure(config: FrameworkConfiguration) {
  DOM.injectStyles(css, undefined, undefined, 'ux-form-css');
  config.globalResources([
    UxField,
    UxForm,
    UxSubmitCustomAttribute,
  ]);
}
