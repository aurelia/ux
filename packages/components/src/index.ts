import { FrameworkConfiguration } from 'aurelia-framework';

import { configure as configureButtonComponent } from '@aurelia-ux/button';
import { configure as configureCheckboxComponent } from '@aurelia-ux/checkbox';
import { configure as configureChipComponent } from '@aurelia-ux/chip-input';
import { configure as configureDatepickerComponent } from '@aurelia-ux/datepicker';
import { configure as configureFormComponent } from '@aurelia-ux/form';
import { configure as configureInputComponent } from '@aurelia-ux/input';
import { configure as configureInputInfoComponent } from '@aurelia-ux/input-info';
import { configure as configureListComponent } from '@aurelia-ux/list';
import { configure as configureRadioComponent } from '@aurelia-ux/radio';
import { configure as configureTextareaComponent } from '@aurelia-ux/textarea';
import { configure as configureSwitchComponent } from '@aurelia-ux/switch';

export function configure(config: FrameworkConfiguration) {
  configureButtonComponent(config);
  configureCheckboxComponent(config);
  configureChipComponent(config);
  configureDatepickerComponent(config);
  configureFormComponent(config);
  configureInputComponent(config);
  configureInputInfoComponent(config);
  configureListComponent(config);
  configureRadioComponent(config);
  configureTextareaComponent(config);
  configureSwitchComponent(config);
}
