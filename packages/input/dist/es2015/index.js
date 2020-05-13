import { bindingMode, PLATFORM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxInputTheme } from './ux-input-theme';
export { UxInput } from './ux-input';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources(PLATFORM.moduleName('./ux-input'));
}
const uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};
//# sourceMappingURL=index.js.map