import { OkModalAttribute } from './resources/ok-modal-attribute';
import { DismissModalAttribute } from './resources/dismiss-modal-attribute';
import { AttachFocusAttribute } from './resources/attach-focus-attribute';
import { DefaultModalConfiguration } from './modal-configuration';
import { PLATFORM } from 'aurelia-framework';
export function configure(frameworkConfig, callback) {
    frameworkConfig.globalResources([
        AttachFocusAttribute,
        DismissModalAttribute,
        OkModalAttribute,
        PLATFORM.moduleName('./ux-modal'),
    ]);
    var config = frameworkConfig.container.get(DefaultModalConfiguration);
    if (typeof callback === 'function') {
        callback(config);
    }
}
export { UxModalTheme } from './ux-modal-theme';
export { UxModal } from './ux-modal';
export * from './ux-modal-service';
export * from './modal-configuration';
