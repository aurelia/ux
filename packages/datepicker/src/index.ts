import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

import { configure as buttonConfig } from '@aurelia-ux-components/button';

export { DatepickerSettings } from './resources/datepicker-settings';

export function configure(config: FrameworkConfiguration) {
  buttonConfig(config);

  config.globalResources([
    PLATFORM.moduleName('./ux-calendar'),
    PLATFORM.moduleName('./ux-datepicker'),
    PLATFORM.moduleName('./ux-picker-dialog'),
    PLATFORM.moduleName('./ux-year-list')
  ]);
}
