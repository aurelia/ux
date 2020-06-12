import { OkModalAttribute } from './resources/ok-modal-attribute';
import { DismissModalAttribute } from './resources/dismiss-modal-attribute';
import { AttachFocusAttribute } from './resources/attach-focus-attribute';
import { UxDefaultModalConfiguration } from './ux-modal-configuration';
import { PLATFORM } from 'aurelia-framework';
export function configure(frameworkConfig, callback) {
    frameworkConfig.globalResources([
        AttachFocusAttribute,
        DismissModalAttribute,
        OkModalAttribute,
        PLATFORM.moduleName('./ux-modal'),
    ]);
    if (typeof callback === 'function') {
        var config = frameworkConfig.container.get(UxDefaultModalConfiguration);
        callback(config);
    }
}
export { UxModalTheme } from './ux-modal-theme';
export { UxModal } from './ux-modal';
export * from './ux-modal-service';
export * from './ux-modal-configuration';
//# sourceMappingURL=index.js.map