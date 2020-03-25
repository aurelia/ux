import { ModalService, DrawerPosition } from '@aurelia-ux/drawer';
import { Hello } from './hello';
import { inject } from 'aurelia-framework';

@inject(ModalService)
export class DrawerComp {

  public host: '' | '.drawer-host' = '';
  public position: DrawerPosition = 'top';
  public hue = '';
  public duration = '';
  public drawerPrompt: string = '';
  public inlinePromptResult: string = '';
  public servicePromptResult: string = '';

  constructor(private modalService: ModalService) {

  }

  public closeDrawer() {
    // closeLastDrawer is a quick API usefull when used inline
    this.modalService.ok(this.drawerPrompt);
  }
  
  public save(event: CustomEvent) {
    this.inlinePromptResult = event.detail;
  }

  public openDrawer() {
    const drawer = this.modalService.open({
      viewModel: Hello,
      model: {hello: 'world'},
      host: this.host,
      position: this.position,
      restoreFocus: (element) => {
        console.log('restoring focus to ', element);
        element.focus();
      },
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
      host: this.host,
      position: this.position,
      theme: {
        themeKey: 'drawer',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
  }

}
