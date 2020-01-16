import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxCardTheme } from '@aurelia-ux/card';
export { UxButtonTheme } from '@aurelia-ux/button';
export { UxCheckboxTheme, UxCheckbox, UxCheckboxElement } from '@aurelia-ux/checkbox';
export { UxChipInputTheme, UxChipTheme } from '@aurelia-ux/chip-input';
export { UxGridTheme, UxResponsiveUtilities } from '@aurelia-ux/grid';
export { UxDatepickerTheme } from '@aurelia-ux/datepicker';
export { UxFormTheme } from '@aurelia-ux/form';
export { UxInputTheme, UxInput, UxInputElement } from '@aurelia-ux/input';
export { UxInputInfoTheme } from '@aurelia-ux/input-info';
export { UxListTheme } from '@aurelia-ux/list';
export { UxRadioTheme, UxRadio, UxRadioElement } from '@aurelia-ux/radio';
export { UxTextAreaTheme, UxTextArea, UxTextAreaElement } from '@aurelia-ux/textarea';
export { UxSwitchTheme, UxSwitch, UxSwitchElement } from '@aurelia-ux/switch';
export {
  UxOption,
  UxOptionElement,
  UxOptGroup,
  UxOptGroupElement,
  UxSelect,
  UxSelectElement,
  UxSelectTheme
} from '@aurelia-ux/select';
export { UxSliderTheme, UxSlider, UxSliderElement } from '@aurelia-ux/slider';

export function configure(config: FrameworkConfiguration) {
  config.plugin(PLATFORM.moduleName('@aurelia-ux/button'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/card'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/checkbox'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/chip-input'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/datepicker'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/grid'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/form'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/input'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/input-info'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/list'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/radio'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/textarea'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/switch'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/select'));
  config.plugin(PLATFORM.moduleName('@aurelia-ux/slider'));
}
