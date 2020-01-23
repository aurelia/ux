import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';

import { AureliaUXFormRenderer } from './forms-form-renderer';
import { inject } from 'aurelia-dependency-injection';
import listPeople from './list-people.json';
import listSettings from './list-settings.json';

@inject(ValidationControllerFactory)
export class Showcase {

  public firstName = '';
  public lastName = '';
  public email = '';
  public interests: Array<string> = [];
  public ageGroup: string = '21-30';
  public variant = 'filled';
  public controller: ValidationController;


  public listBorder: boolean = true;
  public listNbLines: 'two-line' | 'three-line' = 'two-line';
  public listPeople = listPeople;
  public listSettings = listSettings;

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
    .ensure('birthdate').required()
    .on(Showcase);
