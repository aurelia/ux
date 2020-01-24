import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';

import { AureliaUXFormRenderer } from './forms-form-renderer';
import { inject } from 'aurelia-dependency-injection';
import listPeople from './list-people.json';
import listSettings from './list-settings.json';
import { computedFrom } from 'aurelia-binding';

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

  public emailsOptions = [
    {value: 'newsletter', label: 'Newsletter'},
    {value: 'feed', label: 'Feed Activity'},
    {value: 'activity', label: 'Alerts'},
  ];
  public emails: Array<string> = ['newsletter'];

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

  public toggleEmails() {
    this.emails = this.emailsChecked ? [] : this.emailsOptions.map(i => i.value);
  }

  @computedFrom('emails', 'emails.length', 'emailsOptions')
  get emailsChecked(): boolean {
    if (!this.emails === undefined || this.emailsOptions === undefined) {
      return false;
    }
    return this.emails.length === this.emailsOptions.length;
  }

  @computedFrom('emails', 'emails.length', 'emailsOptions')
  get emailsIndeterminate(): boolean {
    if (!this.emails === undefined || this.emailsOptions === undefined) {
      return false;
    }
    return this.emails.length > 0 && this.emails.length < this.emailsOptions.length;
  }

}

ValidationRules
    .ensure('firstName').required().minLength(2)
    .ensure('lastName').required().minLength(2)
    .ensure('email').required().email()
    .ensure('birthdate').required()
    .on(Showcase);
