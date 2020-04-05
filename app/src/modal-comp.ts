import { ModalService, ModalPosition } from '@aurelia-ux/modal';
import { Hello } from './hello';
import { inject } from 'aurelia-framework';

@inject(ModalService)
export class ModalComp {

  public host: '' | '.modal-host' = '';
  public position: ModalPosition = 'top';
  public hue = '';
  public duration = '';
  public modalPrompt: string = '';
  public inlinePromptResult: string = '';
  public servicePromptResult: string = '';
  public cannotActivate: boolean = false;

  public anchor: string = 'anchor1';
  public menuPosition: 'left' | 'right' | 'top' | 'bottom' = 'bottom';
  public lock: boolean = true;
  public outsideDismiss: boolean = true;
  public overlay: boolean = true;
  public anchor1: HTMLElement;
  public anchor2: HTMLElement;
  public anchor3: HTMLElement;
  public anchor4: HTMLElement;

  constructor(private modalService: ModalService) {

  }

  public closeModal() {
    // closeLastModal is a quick API usefull when used inline
    this.modalService.ok(this.modalPrompt);
  }
  
  public save(event: CustomEvent) {
    this.inlinePromptResult = event.detail;
  }

  public async openHello() {
    try {
      const modal = await this.modalService.open({
        viewModel: Hello,
        model: {hello: 'world', cannotActivate: this.cannotActivate},
        host: this.host,
        position: this.position,
        restoreFocus: (element) => {
          // console.log('restoring focus to ', element);
          element.focus();
        },
        theme: {
          themeKey: 'modal',
          overlayColor: this.hue,
          transitionDuration: this.duration
      }});
      modal.whenClosed().then((result) => {
        if (!result.wasCancelled) {
          this.servicePromptResult = result.output;
        }
      });
    } catch (error) {
      alert(error.message);
    }
  }

  public openMe() {
    this.modalService.open({
      viewModel: ModalComp,
      host: this.host,
      position: this.position,
      theme: {
        themeKey: 'modal',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
  }

  public openHelloPath() {
    this.modalService.open({
      viewModel: 'hello',
      host: this.host,
      position: this.position,
      theme: {
        themeKey: 'modal',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
  }

  public openHelloView() {
    this.modalService.open({
      view: 'hello-view.html',
      host: this.host,
      position: this.position,
      theme: {
        themeKey: 'modal',
        overlayColor: this.hue,
        transitionDuration: this.duration
      }});
  }

  public openMenu() {
    const anchor = (this as any)[this.anchor];
    this.modalService.open({
      viewModel: Hello,
      position: 'absolute',
      lock: this.lock,
      outsideDismiss: this.outsideDismiss,
      openingCallback: (contentWrapperElement: HTMLElement, _overlayElement: HTMLElement) => {
        this.modalService.positionModalWithAnchor(anchor, contentWrapperElement, {preferedPosition: this.menuPosition});
      },
    });
  }

}
