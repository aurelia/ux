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
    // console.log('Hello created');
  }

  public bind() {
    // console.log('Hello bind');
  }

  public canActivate(params: any) {
    // console.log('Hello canActivate', params);
    return params ? !params.cannotActivate : true;
  }

  public activate(params: any) {
    // console.log('Hello activate', params);
  }

  public attached() {
    // console.log('Hello attached');
  }

  public detached() {
    // console.log('Hello detached');
  }

  public canDeactivate(result: ModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    return this.controller.validate().then((value) => {
      return value.valid;
    });
  }

  public unbind() {
    // console.log('Hello unbind');
  }

  public deactivate(result: ModalServiceResult) {
    // console.log('Hello deactivate', result);
  }
}

ValidationRules
    .ensure('okToClose').equals(true)
    .ensure('drawerPrompt').required()
    .on(Hello);
