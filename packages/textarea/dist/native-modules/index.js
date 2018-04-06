import { PLATFORM, bindingMode } from 'aurelia-framework';
import { ValueAttributeObserver, EventSubscriber } from 'aurelia-binding';
import { AureliaUX } from '@aurelia-ux/core';
export { UxTextAreaTheme } from './ux-textarea-theme';
export { UxTextArea } from './ux-textarea';
export function configure(config) {
    config.container.get(AureliaUX).registerUxElementConfig(uxTextAreaConfig);
    config.globalResources([
        PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
    ]);
}
var uxTextAreaConfig = {
    tagName: 'ux-textarea',
    properties: {
        value: {
            defaultBindingMode: bindingMode.twoWay,
            getObserver: function (element) {
                return new ValueAttributeObserver(element, 'value', new EventSubscriber(['change']));
            }
        }
    }
};
