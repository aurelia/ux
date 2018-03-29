import { PLATFORM, bindingMode } from 'aurelia-framework';
import * as AuBinding from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxRadioTheme } from './ux-radio-theme';
export { UxRadio } from './ux-radio';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxRadioConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/radio/ux-radio')
    ]);
}
const uxRadioConfig = {
    tagName: 'ux-radio',
    properties: {
        checked: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver(element, _, observerLocator) {
                return new AuBinding.CheckedObserver(element, uxRadioChangeHandler, observerLocator);
            }
        }
    }
};
const uxRadioChangeHandler = {
    subscribe(target, callbackOrListener) {
        target.addEventListener('change', callbackOrListener, false);
        return function () {
            target.removeEventListener('change', callbackOrListener, false);
        };
    }
};
