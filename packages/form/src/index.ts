import { FrameworkConfiguration } from 'aurelia-framework';
import { UxField } from './ux-field';
import { UxForm } from './ux-form';
import { UxSubmitCustomAttribute } from './ux-submit-attribute';

export { UxFormTheme } from './ux-form-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxField,
    UxForm,
    UxSubmitCustomAttribute,
  ]);
}
