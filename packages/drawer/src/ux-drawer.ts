import { ModalService } from './ux-modal-service';
import { customElement, bindable, customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxDrawerTheme } from './ux-drawer-theme';
import { computedFrom } from 'aurelia-binding';
import { TaskQueue } from 'aurelia-framework';
import { PLATFORM, DOM } from 'aurelia-pal';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';

@inject(Element, StyleEngine, ModalService, TaskQueue)
@customElement('ux-drawer')
export class UxDrawer implements UxComponent {

  @bindable public type: 'standard' | 'modal';
  @bindable public position: DrawerPosition = 'center';
  @bindable public drawerId: 'string';
  @bindable public moveToBodyTag: boolean = true;
  @bindable public modalBreakpoint: number = 768;
  @bindable public theme: UxDrawerTheme;

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
    private taskQueue: TaskQueue) { }

  public bind() {
    this.themeChanged(this.theme);
    this.setViewportType();
    window.addEventListener('resize', this);
  }

  public attached() {
    if (this.moveToBodyTag) {
      this.moveElementToBodyTag();
    }
    this.show();
  }

  public detached() {
    if (this.moveToBodyTag) {
      this.removeElementFromBodyTag();
    }
  }

  private show() {
    if (this.showing && this.showed) {return;}
    this.showing = true;
    this.modalService.addLayer(this);
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
        resolve();
      }, duration + 10);
    });
  }

  private setZindex() {
    this.overlayElement.style.zIndex = `${this.modalService.zIndex}`;
    this.contentWrapperElement.style.zIndex = `${this.modalService.zIndex}`;
  }

  private moveElementToBodyTag() {
    let body: HTMLBodyElement = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement);
    body.appendChild(this.element);
  }

  private removeElementFromBodyTag() {
    try {
      document.getElementsByTagName('BODY')[0].removeChild(this.element);
    } catch (e) {
      // if error, it's because the child is already removed
    }
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

  public async dismiss(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    await this.hide();
    const dismissEvent = DOM.createCustomEvent('dismiss', {bubbles: true});
    this.element.dispatchEvent(dismissEvent);
  }

  public async ok(result: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    await this.hide();
    const okEvent = DOM.createCustomEvent('ok', {bubbles: true, detail: result});
    this.element.dispatchEvent(okEvent);
  }

  public stop(event: Event) {
    event.stopPropagation();
  }

  private getAnimationDuration() {
    const overlayElementDuration: string = window.getComputedStyle(this.overlayElement).transitionDuration;
    const contentDuration: string = window.getComputedStyle(this.contentElement).transitionDuration;
    // overlayElementDuration and contentDuration are string like '0.25s'
    return Math.max(parseFloat(overlayElementDuration), parseFloat(contentDuration)) * 1000;
  }
}

@inject(Element)
@customAttribute('dismiss-drawer')
export class DismissDrawerCustomAttribute {

  constructor(private element: HTMLElement) {}

  public bind() {
    this.element.addEventListener('click', this);
  }

  public unbind() {
    this.element.removeEventListener('click', this);
  }

  public handleEvent() {
    const drawer = findDrawer(this.element);
    if (drawer !== null) {
      drawer.dismiss();
    }
  }
}

@inject(Element)
@customAttribute('ok-drawer')
export class OkDrawerCustomAttribute {

  value: any;

  constructor(private element: HTMLElement) {}

  public bind() {
    this.element.addEventListener('click', this);
  }

  public unbind() {
    this.element.removeEventListener('click', this);
  }

  public handleEvent() {
    const drawer = findDrawer(this.element);
    if (drawer !== null) {
      drawer.ok(this.value);
    }
  }
}

function findDrawer(item: HTMLElement | null): UxDrawer | null {
  let element = item;
  if (element === null) return null;
  while (element.tagName !== 'BODY' && element.tagName !== 'UX-DRAWER') {
    element = element.parentElement;
    if (element === null) return null;
  }
  if (element.tagName === 'UX-DRAWER') {
    const el: any = element;
    if (
      el !== null &&
      el.au !== undefined &&
      el.au['ux-drawer'] !== undefined &&
      el.au['ux-drawer'].viewModel instanceof UxDrawer) {
      return el.au['ux-drawer'].viewModel;
    }
  }
  return null;
}
