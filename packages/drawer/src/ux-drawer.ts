import { ModalService, ModalServiceResult } from './ux-modal-service';
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxDrawerTheme } from './ux-drawer-theme';
import { computedFrom } from 'aurelia-binding';
import { TaskQueue } from 'aurelia-framework';
import { PLATFORM, DOM } from 'aurelia-pal';
import { getLogger } from 'aurelia-logging';
import { DrawerPosition, DrawerKeybord, DefaultDrawerConfiguration } from './drawer-configuration';

const log = getLogger('ux-drawer');

@inject(Element, StyleEngine, ModalService, TaskQueue, DefaultDrawerConfiguration)
@customElement('ux-drawer')
export class UxDrawer implements UxComponent {

  @bindable public type: 'standard' | 'modal';
  @bindable public position: DrawerPosition = 'center';
  @bindable public host: 'body' | HTMLElement | false | string = 'body';
  @bindable public modalBreakpoint: number = 768;
  @bindable public theme: UxDrawerTheme;
  @bindable public overlayDismiss: boolean = true;
  @bindable public keyboard: DrawerKeybord = ['Escape'];
  @bindable public restoreFocus?: (lastActiveElement: HTMLElement) => void= (lastActiveElement: HTMLElement) => {
    lastActiveElement.focus();
  }

  // Aria attributes
  @bindable public role: 'dialog' | 'alertdialog' = 'dialog';
  @bindable public ariaLabelledby: string = '';
  @bindable public ariaDescribedby: string = '';

  public lastActiveElement?: HTMLElement;

  private handlingEvent: boolean = false;
  private viewportType: 'mobile' | 'desktop' = 'desktop';
  private overlayElement: HTMLElement;
  private contentWrapperElement: HTMLElement;
  private contentElement: HTMLElement;
  private showed: boolean = false;
  private showing: boolean = false;
  private hiding: boolean = false;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine,
    private modalService: ModalService,
    private taskQueue: TaskQueue,
    private defaultConfig: DefaultDrawerConfiguration) {
      if (this.defaultConfig.modalBreakpoint !== undefined) {
        this.modalBreakpoint = this.defaultConfig.modalBreakpoint
      }
      if (this.defaultConfig.host !== undefined) {
        this.host = this.defaultConfig.host
      }
      if (this.defaultConfig.overlayDismiss !== undefined) {
        this.overlayDismiss = this.defaultConfig.overlayDismiss
      }
      if (this.defaultConfig.position !== undefined) {
        this.position = this.defaultConfig.position
      }
      if (this.defaultConfig.keyboard !== undefined) {
        this.keyboard = this.defaultConfig.keyboard
      }
      if (this.defaultConfig.theme !== undefined) {
        this.theme = this.defaultConfig.theme
      }
    }
  private bindingContext: any;
  public bind(bindingContext: any) {
    this.bindingContext = bindingContext;
    this.themeChanged(this.theme);
    this.setViewportType();
    window.addEventListener('resize', this);
    this.positionChanged();
    this.modalBreakpointChanged();
    this.hostChanged();
    this.overlayDismissChanged();
    this.keyboardChanged();
  }

  public positionChanged() {
    if (!this.position && this.defaultConfig.position) {
      this.position = this.defaultConfig.position;
    }
  }

  public modalBreakpointChanged() {
    if (typeof this.modalBreakpoint !== 'number' && this.defaultConfig.modalBreakpoint) {
      this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
    }
  }

  public hostChanged() {
    if (this.host === false || this.host === 'body' || this.host instanceof HTMLElement) {
      return;
    }
    if (this.defaultConfig.host !== undefined) {
      this.host = this.defaultConfig.host;
      return;
    }
    if (this.host === '') {
      this.host = 'body';
    }
  }

  public overlayDismissChanged() {
    if (!this.overlayDismiss && this.defaultConfig.overlayDismiss) {
      this.overlayDismiss = this.defaultConfig.overlayDismiss;
    }
  }

  public keyboardChanged() {
    if (!this.keyboard && this.defaultConfig.keyboard) {
      this.keyboard = this.defaultConfig.keyboard;
    }
  }

  public attached() {
    if (this.host) {
      this.moveToHost();
    }
    this.show();
  }

  public detached() {
    if (this.host) {
      this.removeFromHost();
    }
  }

  private show() {
    if (this.showing && this.showed) {return;}
    if(DOM.activeElement instanceof HTMLElement) {
      this.lastActiveElement = DOM.activeElement;
    }
    this.showing = true;
    this.modalService.addLayer(this, this.bindingContext);
    this.setZindex();
    this.taskQueue.queueTask(() => {
      this.showed = true;
    });
  }

  private async hide() {
    if (this.hiding || !this.showed) {return;}
    this.hiding = true;
    const duration = this.getAnimationDuration();
    this.showed = false;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.modalService.removeLayer(this);
        this.hiding = false;
        if (this.lastActiveElement && typeof this.restoreFocus === 'function') {
          this.restoreFocus(this.lastActiveElement);
        }
        resolve();
      }, duration + 10);
    });
  }

  private setZindex() {
    this.overlayElement.style.zIndex = `${this.modalService.zIndex}`;
    this.contentWrapperElement.style.zIndex = `${this.modalService.zIndex}`;
  }

  private moveToHost() {
    const host = this.getHost();
    if (!host) { return };
    host.appendChild(this.element);
  }

  private removeFromHost() {
    const host = this.getHost();
    if (!host) { return };
    try {
      host.removeChild(this.element);
    } catch (e) {
      // if error, it's because the child is already removed
    }
  }

  private getHost(): Element | undefined {
    if (this.host === 'body') {
      return document.body;
    } else if (this.host instanceof HTMLElement) {
      return this.host;
    } else if (typeof this.host === 'string') {
      return document.querySelector(this.host) || undefined;
    }
    return undefined;
  }

  public unbind() {
    window.removeEventListener('resize', this);
  }

  public handleEvent() {
    if (this.handlingEvent) {
      return;
    }
    this.handlingEvent = true;
    if (PLATFORM.global.requestAnimationFrame) {
      PLATFORM.global.requestAnimationFrame(() => {
        this.setViewportType();
        this.handlingEvent = false;
      });
    } else {
      setTimeout(() => {
        this.setViewportType();
        this.handlingEvent = false;
      }, 100);
    }
    this.setViewportType();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'drawer';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public setViewportType() {
    this.viewportType = window.innerWidth < this.modalBreakpoint ? 'mobile' : 'desktop';
  }

  @computedFrom('type', 'viewportType')
  public get computedType(): 'standard' | 'modal' {
    return this.viewportType === 'mobile' ? 'modal' : this.type;
  }

  public overlayClick(event: Event): any {
    for (let element of event.composedPath() ) {
      if (element === this.contentElement) {
        return true; // this allow normal behvior when clicking on elements inside the drawer
      }
    }
    if (!this.overlayDismiss) {
      event.stopPropagation();
      return;
    }
    this.dismiss();
  }

  public async dismiss(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!await this.prepareClosing(true)) {
      return;
    }
    await this.hide();
    const dismissEvent = DOM.createCustomEvent('dismiss', {bubbles: true});
    this.element.dispatchEvent(dismissEvent);
  }

  public async ok(result?: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!await this.prepareClosing(false, result)) {
      return;
    }
    await this.hide();
    const okEvent = DOM.createCustomEvent('ok', {bubbles: true, detail: result});
    this.element.dispatchEvent(okEvent);
  }

  private async prepareClosing(wasCancelled: boolean, output?: any): Promise<boolean> {
    const layer = this.modalService.getLayer(this);
    const result: ModalServiceResult = {
      wasCancelled,
      output
    };
    if (layer) {
      if (!await this.modalService.callCanDeactivate(layer, result)) {
        return false;
      }
      try {
        await this.modalService.callDetached(layer);
        await this.modalService.callDeactivate(layer, result);
      } catch (error) {
        log.error(error);
      } 
    }
    return true;
  }

  public stop(event: Event) {
    event.stopPropagation();
  }

  private getAnimationDuration() {
    const overlayElementDuration: string = window.getComputedStyle(this.overlayElement).transitionDuration || '';
    const contentDuration: string = window.getComputedStyle(this.contentElement).transitionDuration || '';
    // overlayElementDuration and contentDuration are string like '0.25s'
    return Math.max(parseFloat(overlayElementDuration), parseFloat(contentDuration)) * 1000;
  }
}
