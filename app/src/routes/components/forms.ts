import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import { inject } from 'aurelia-dependency-injection';
import { AureliaUXFormRenderer } from './forms-form-renderer';

@inject(ValidationControllerFactory)
export class Forms {
    public firstName = '';
    public lastName = '';
    public email = '';
    public controller: ValidationController;

    constructor(public controllerFactory: ValidationControllerFactory) {
      this.controller = controllerFactory.createForCurrentScope();
      this.controller.addRenderer(new AureliaUXFormRenderer());
    }

    public submit() {
      this.controller.validate().then((value) => {
        if (value.valid) {
          alert('Form submitted!');
        }
      });
    }

}

ValidationRules
    .ensure('firstName').required().minLength(2)
    .ensure('lastName').required().minLength(2)
    .ensure('email').required().email()
    .on(Forms); 
