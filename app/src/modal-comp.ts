import { UxModalService, UxModalPosition, UxModalPositioning, UxModalPlacement, UxPositioningOptions } from '@aurelia-ux/modal';
import { Hello } from './hello';
import { inject } from 'aurelia-framework';

@inject(UxModalService, UxModalPositioning)
export class ModalComp {

  public host: '' | '.modal-host' = '';
  public position: UxModalPosition = 'top';
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

  constructor(private modalService: UxModalService, private modalPositioning: UxModalPositioning) {

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

  public positionning: UxModalPositioning;

  public async openMenu() {
    const anchor = (this as any)[this.anchor];
    const modal = await this.modalService.open({
      viewModel: Hello,
      position: 'absolute',
      lock: this.lock,
      outsideDismiss: this.outsideDismiss,
      openingCallback: (contentWrapperElement: HTMLElement, _overlayElement: HTMLElement) => {
        const contentElement = contentWrapperElement.querySelector('.ux-modal__content') as HTMLElement;
        this.positionning = this.modalPositioning.getInstance(anchor, contentElement, {
          placement: this.menuPosition,
          offsetX: 0,
          offsetY: 0,
          windowMarginX: 0,
          windowMarginY: 0,
        });
        this.setScrollListener();
      },
    });
    modal.whenClosed().then(() => {
      this.unsetScrollListener();
    });
  }

  private setScrollListener() {
    const routerView = document.querySelector('router-view');
    if (routerView instanceof HTMLElement) {
      routerView.addEventListener('scroll', this);
    }
  }

  private unsetScrollListener() {
    const routerView = document.querySelector('router-view');
    if (routerView instanceof HTMLElement) {
      routerView.removeEventListener('scroll', this);
    }
  }

  public handleEvent(_event: Event) {
    console.log('handleEvent');
    if (this.positionning) {
      this.positionning.update();
    }
  }

}
