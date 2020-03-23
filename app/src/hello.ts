import { ModalService } from '@aurelia-ux/drawer';
import { inject } from 'aurelia-framework';

@inject(ModalService)
export class Hello {

  public drawerPrompt: string = '';

  constructor(private modalService: ModalService) {

  }

}
