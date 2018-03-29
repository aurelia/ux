import { PLATFORM, bindingMode } from 'aurelia-framework';
import * as AuBinding from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxInputTheme } from './ux-input-theme';
export { UxInput } from './ux-input';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/input/ux-input')
    ]);
}
var uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element) {
                return new AuBinding.ValueAttributeObserver(element, 'value', uxInputChangeHandler);
            }
        }
    }
};
var uxInputChangeHandler = {
    subscribe: function (target, callbackOrListener) {
        target.addEventListener('change', callbackOrListener, false);
        return function () {
            target.removeEventListener('change', callbackOrListener, false);
        };
    }
};
