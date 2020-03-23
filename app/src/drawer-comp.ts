import { DrawerPosition } from './../../packages/drawer/src/ux-drawer';
import { ModalService } from '@aurelia-ux/drawer';
import { Hello } from './hello';
import { inject } from 'aurelia-framework';

@inject(ModalService)
export class DrawerComp {

  public position: DrawerPosition = 'bottom';
  public hue = 'black';
  public duration = '250ms';
  public drawerPrompt: string = '';
  public inlinePromptResult: string = '';
  public servicePromptResult: string = '';

  constructor(private modalService: ModalService) {

  }

  public closeDrawer() {
    // closeLastDrawer is a quick API usefull when used inline
    this.modalService.closeLastDrawer(this.drawerPrompt);
  }
  
  public save(event: CustomEvent) {
    this.inlinePromptResult = event.detail;
  }

  public openDrawer() {
    const drawer = this.modalService.open({
      viewModel: Hello,
      position: this.position,
      theme: {
        themeKey: 'drawer',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
    drawer.whenClosed().then((result) => {
      if (!result.wasCancelled) {
        this.servicePromptResult = result.output;
      }
    });
  }

  public openDrawer2() {
    this.modalService.open({
      viewModel: this,
      position: this.position,
      theme: {
        themeKey: 'drawer',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
  }

}
