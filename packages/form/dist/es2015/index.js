import { PLATFORM } from 'aurelia-framework';
import { UxForm } from './ux-form';
import { UxField } from './ux-field';
import { UxSubmitCustomAttribute } from './ux-submit-attribute';
export { UxFormTheme } from './ux-form-theme';
export { UxForm, UxField, UxSubmitCustomAttribute };
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-form'),
        PLATFORM.moduleName('./ux-field'),
        UxSubmitCustomAttribute
    ]);
}
//# sourceMappingURL=index.js.map