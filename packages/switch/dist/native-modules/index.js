import { PLATFORM, bindingMode } from 'aurelia-framework';
import { CheckedObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxSwitchTheme } from './ux-switch-theme';
export { UxSwitch } from './ux-switch';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxSwitchConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
    ]);
}
var uxSwitchConfig = {
    tagName: 'ux-switch',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _, observerLocator) {
                return new CheckedObserver(element, new EventSubscriber(['change']), observerLocator);
            }
        }
    }
};
