import { ModalServiceResult } from './../../packages/drawer/src/ux-modal-service';
import { ModalService } from '@aurelia-ux/drawer';
import { inject } from 'aurelia-framework';

import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { AureliaUXFormRenderer } from './forms-form-renderer';

@inject(ModalService, ValidationControllerFactory)
export class Hello {

  public drawerPrompt: string = '';
  public okToClose: boolean = true;
  public controller: ValidationController;

  constructor(public modalService: ModalService, public controllerFactory: ValidationControllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new AureliaUXFormRenderer());
  }

  public created() {
    console.log('created called when opening the drawer');
  }

  public bind() {
    console.log('bind called when opening the drawer');
  }

  public canActivate(params: any) {
    console.log('canActivate', params);
    return params ? !params.cannotActivate : true;
  }

  public activate(params: any) {
    console.log('activate called when opening the drawer', params);
  }

  public attached() {
    console.log('attached called when opening the drawer');
  }

  public detached() {
    console.log('detached called when closing the drawer');
  }

  public canDeactivate(result: ModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    return this.controller.validate().then((value) => {
      console.log('validation value', value);
      return value.valid;
    });
  }

  public unbind() {
    console.log('unbind called when closing the drawer');
  }

  public deactivate(result: ModalServiceResult) {
    console.log('deactivate called when closing the drawer', result);
    console.log('this', this);
  }
}

ValidationRules
    .ensure('okToClose').equals(true)
    .ensure('drawerPrompt').required()
    .on(Hello);
