import { PLATFORM, bindingMode, } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxOption } from './ux-option';
export { UxOptGroup } from './ux-optgroup';
export { UxSelect } from './ux-select';
export { UxSelectTheme } from './ux-select-theme';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/select/ux-select'),
        PLATFORM.moduleName('@aurelia-ux/select/ux-optgroup'),
        PLATFORM.moduleName('@aurelia-ux/select/ux-option')
    ]);
}
const uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};
