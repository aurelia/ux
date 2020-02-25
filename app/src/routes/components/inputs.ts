import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import { inject } from 'aurelia-dependency-injection';

@inject(ValidationControllerFactory)
export class Inputs {
    public firstName = '';
    public email = '';
    public controller: ValidationController;

    constructor(public controllerFactory: ValidationControllerFactory) {
        this.controller = controllerFactory.createForCurrentScope();
    }

    public submit() {
        this.controller.validate();
    }

}

ValidationRules
    .ensure('firstName').required()
    .ensure('email').required().email()
    .on(Inputs); 
