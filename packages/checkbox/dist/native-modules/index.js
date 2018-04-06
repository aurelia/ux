import { PLATFORM, bindingMode } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxCheckboxTheme } from './ux-checkbox-theme';
export { UxCheckbox } from './ux-checkbox';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/checkbox/ux-checkbox')
    ]);
}
var uxCheckBoxConfig = {
    tagName: 'ux-checkbox',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};
