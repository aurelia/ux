import { PLATFORM } from 'aurelia-framework';
export { UxPopup } from './ux-popup';
export { UxPopupTheme } from './ux-popup-theme';
export function configure(frameworkConfig) {
    frameworkConfig.globalResources([
        PLATFORM.moduleName('./ux-popup')
    ]);
}
//# sourceMappingURL=index.js.map