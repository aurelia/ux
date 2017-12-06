import { configure as configureButtonComponent } from '@aurelia-ux/button';
import { configure as configureCheckboxComponent } from '@aurelia-ux/checkbox';
import { configure as configureChipComponent } from '@aurelia-ux/chip-input';
import { configure as configureDatepickerComponent } from '@aurelia-ux/datepicker';
import { configure as configureFormComponent } from '@aurelia-ux/form';
import { configure as configureInputComponent } from '@aurelia-ux/input';
import { configure as configureInputInfoComponent } from '@aurelia-ux/input-info';
import { configure as configureListComponent } from '@aurelia-ux/list';
import { configure as configureTextareaComponent } from '@aurelia-ux/textarea';
export function configure(config) {
    configureButtonComponent(config);
    configureCheckboxComponent(config);
    configureChipComponent(config);
    configureDatepickerComponent(config);
    configureFormComponent(config);
    configureInputComponent(config);
    configureInputInfoComponent(config);
    configureListComponent(config);
    configureTextareaComponent(config);
}
