import { bindingMode, PLATFORM } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxDefaultInputConfiguration } from './ux-default-input-configuration';
export { UxInputTheme } from './ux-input-theme';
export { UxInput } from './ux-input';
export { UxDefaultInputConfiguration };
export function configure(config, callback) {
    config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
    config.globalResources(PLATFORM.moduleName('./ux-input'));
    if (typeof callback === 'function') {
        var defaults = config.container.get(UxDefaultInputConfiguration);
        callback(defaults);
    }
}
var uxInputConfig = {
    tagName: 'ux-input',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};
//# sourceMappingURL=index.js.map