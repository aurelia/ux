import { AureliaUX } from './aurelia-ux';
export { swatches } from './colors/swatches';
export { shadows } from './colors/shadows';
export { UxButtonTheme } from './button/ux-button-theme';
export { UxInputTheme } from './input/ux-input-theme';
export { UxInputInfoTheme } from './input-info/ux-input-info-theme';
export { UxTextareaTheme } from './textarea/ux-textarea-theme';
export { UxFormTheme } from './form/ux-form-theme';
export { UxFieldTheme } from './form/ux-field-theme';
export * from './styles/decorators';
export { AureliaUX } from './aurelia-ux';
export { UXConfiguration } from './ux-configuration';
export function configure(config, callback) {
    config.globalResources([
        './button/ux-button',
        './input/ux-input',
        './input-info/ux-input-info',
        './textarea/ux-textarea',
        './form/ux-form',
        './form/ux-field',
        './form/ux-submit-attribute'
    ]);
    const ux = config.container.get(AureliaUX);
    if (typeof callback === 'function') {
        return Promise.resolve(callback(ux))
            .then(() => ux.start(config));
    }
    else {
        ux.use.defaultConfiguration();
        return ux.start(config);
    }
}
