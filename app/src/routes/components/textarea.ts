import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
import { inject } from 'aurelia-dependency-injection';

@inject(ValidationControllerFactory)
export class TextArea {
    public firstName = '';
    public description = '';
    public controller: ValidationController;;

    constructor(public controllerFactory: ValidationControllerFactory) {
        this.controller = controllerFactory.createForCurrentScope();
    }

    public submit() {
        this.controller.validate();
    }

}

ValidationRules
    .ensure('firstName')
        .required()
    .ensure('description')
        .required()
        .minLength(20)
        .maxLength(500)
    .on(TextArea);
