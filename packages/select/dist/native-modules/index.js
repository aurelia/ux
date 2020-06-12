import { bindingMode, PLATFORM, } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
import { UxDefaultSelectConfiguration } from './ux-default-select-configuration';
export { UxOption } from './ux-option';
export { UxOptGroup } from './ux-optgroup';
export { UxSelect } from './ux-select';
export { UxSelectTheme } from './ux-select-theme';
export { UxDefaultSelectConfiguration };
export function configure(config, callback) {
    config.container.get(AureliaUX).registerUxElementConfig(uxSelectConfig);
    config.globalResources([
        PLATFORM.moduleName('./ux-select'),
        PLATFORM.moduleName('./ux-optgroup'),
        PLATFORM.moduleName('./ux-option')
    ]);
    if (typeof callback === 'function') {
        var defaults = config.container.get(UxDefaultSelectConfiguration);
        callback(defaults);
    }
}
var uxSelectConfig = {
    tagName: 'ux-select',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element, _) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};
//# sourceMappingURL=index.js.map