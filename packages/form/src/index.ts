import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UxForm } from './ux-form';
import { UxField } from './ux-field';
import { UxSubmitCustomAttribute } from './ux-submit-attribute';

export { UxFormTheme } from './ux-form-theme';
export { UxForm, UxField, UxSubmitCustomAttribute };

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./ux-form'),
    PLATFORM.moduleName('./ux-field'),
    UxSubmitCustomAttribute
  ]);
}
